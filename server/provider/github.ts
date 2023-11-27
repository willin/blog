import path from 'node:path';
import { Buffer } from 'node:buffer';
import { throttling } from '@octokit/plugin-throttling';
import { Octokit as createOctokit } from '@octokit/rest';
import { type Env } from '../env';

type GithubFile = { path: string; content: string };

const safePath = (s: string) => s.replace(/\\/g, '/');

export class GithubProvider {
  #octokit: ReturnType<typeof createOctokit>;
  #ref: string;
  #repo: string;
  #owner: string;

  constructor(env: Env) {
    this.#repo = env.GITHUB_REPO;
    this.#ref = env.GITHUB_REF ?? 'main';
    this.#owner = env.GITHUB_OWNER ?? 'willin';

    const Octokit = createOctokit.plugin(throttling);

    this.#octokit = new Octokit({
      auth: env.GITHUB_TOKEN,
      throttle: {
        onRateLimit: (retryAfter, options) => {
          const method = 'method' in options ? options.method : 'METHOD_UNKNOWN';
          const url = 'url' in options ? options.url : 'URL_UNKNOWN';
          console.warn(`Request quota exhausted for request ${method} ${url}. Retrying after ${retryAfter} seconds.`);

          return true;
        },
        onSecondaryRateLimit: (retryAfter, options) => {
          const method = 'method' in options ? options.method : 'METHOD_UNKNOWN';
          const url = 'url' in options ? options.url : 'URL_UNKNOWN';
          // does not retry, only logs a warning
          octokit.log.warn(`Abuse detected for request ${method} ${url}`);
        }
      }
    });
  }

  async downloadMdxFileOrDirectory(
    relativeMdxFileOrDirectory: string
  ): Promise<{ entry: string; files: GithubFile[] }> {
    const mdxFileOrDirectory = relativeMdxFileOrDirectory;
    const parentDir = path.dirname(mdxFileOrDirectory);
    const dirList = await this.downloadDirList(parentDir);
    const basename = path.basename(mdxFileOrDirectory);
    const mdxFileWithoutExt = path.parse(mdxFileOrDirectory).name;
    const potentials = dirList.filter(({ name }) => name.startsWith(basename));
    const exactMatch = potentials.find(({ name }) => path.parse(name).name === mdxFileWithoutExt);
    const dirPotential = potentials.find(({ type }) => type === 'dir');

    const content = await this.#downloadFirstMdxFile(exactMatch ? [exactMatch] : potentials);
    let files: GithubFile[] = [];
    let entry = mdxFileOrDirectory;
    if (content) {
      // technically you can get the blog post by adding .mdx at the end... Weird
      // but may as well handle it since that's easy...
      entry = mdxFileOrDirectory.endsWith('.mdx') ? mdxFileOrDirectory : `${mdxFileOrDirectory}.mdx`;
      // /content/about.mdx => entry is about.mdx, but compileMdx needs
      // the entry to be called "/content/index.mdx" so we'll set it to that
      // because this is the entry for this path
      files = [{ path: safePath(path.join(mdxFileOrDirectory, 'index.mdx')), content }];
    } else if (dirPotential) {
      entry = dirPotential.path;
      files = await this.#downloadDirectory(mdxFileOrDirectory);
    }

    return { entry, files };
  }

  async downloadDirList(path: string) {
    const resp = await this.#octokit.repos.getContent({
      owner: this.#owner,
      repo: this.#repo,
      path,
      ref: this.#ref
    });
    const data = resp.data;

    if (!Array.isArray(data)) {
      throw new Error(
        `Tried to download content from ${path}. Github did not return an array of files. This should never happen...`
      );
    }

    return data;
  }

  async downloadFile(path: string) {
    const { data } = await this.#octokit.repos.getContent({
      owner: this.#owner,
      repo: this.#repo,
      path,
      ref: this.#ref
    });

    if ('content' in data && 'encoding' in data) {
      const encoding = data.encoding as Parameters<typeof Buffer.from>['1'];
      return Buffer.from(data.content, encoding).toString();
    }

    console.error(data);
    throw new Error(
      `Tried to get ${path} but got back something that was unexpected. It doesn't have a content or encoding property`
    );
  }

  async #downloadFileBySha(sha: string) {
    const { data } = await this.#octokit.git.getBlob({
      owner: this.#owner,
      repo: this.#repo,
      file_sha: sha
    });
    const encoding = data.encoding as Parameters<typeof Buffer.from>['1'];
    return Buffer.from(data.content, encoding).toString();
  }

  async #downloadFirstMdxFile(list: Array<{ name: string; type: string; path: string; sha: string }>) {
    const filesOnly = list.filter(({ type }) => type === 'file');
    for (const extension of ['.mdx', '.md']) {
      const file = filesOnly.find(({ name }) => name.endsWith(extension));
      if (file) return this.#downloadFileBySha(file.sha);
    }
    return null;
  }

  async #downloadDirectory(dir: string): Promise<Array<GitHubFile>> {
    const dirList = await this.downloadDirList(dir);

    const result = await Promise.all(
      dirList.map(async ({ path: fileDir, type, sha }) => {
        switch (type) {
          case 'file': {
            const content = await this.#downloadFileBySha(sha);
            return { path: safePath(fileDir), content };
          }
          case 'dir': {
            return this.#downloadDirectory(fileDir);
          }
          default: {
            throw new Error(`Unexpected repo file type: ${type}`);
          }
        }
      })
    );

    return result.flat();
  }
}
