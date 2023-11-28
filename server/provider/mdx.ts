import calculateReadingTime from 'reading-time';
import { bundleMDX } from 'mdx-bundler';
import type { GithubFile } from './github';

function arrayToObj<ItemType extends Record<string, unknown>>(
  array: Array<ItemType>,
  { keyName, valueName }: { keyName: keyof ItemType; valueName: keyof ItemType }
) {
  const obj: Record<string, ItemType[keyof ItemType]> = {};
  for (const item of array) {
    const key = item[keyName];
    if (typeof key !== 'string') {
      throw new Error(`${String(keyName)} of item must be a string`);
    }
    const value = item[valueName];
    obj[key] = value;
  }
  return obj;
}

export async function compileMdx<FrontmatterType extends Record<string, unknown>>(
  slug: string,
  githubFiles: GithubFile[]
) {
  const indexRegex = new RegExp(`${slug}\\/index.mdx?$`);
  const indexFile = githubFiles.find(({ path }) => indexRegex.test(path));
  if (!indexFile) return null;

  const rootDir = indexFile.path.replace(/index.mdx?$/, '');
  const relativeFiles: Array<GitHubFile> = githubFiles.map(({ path, content }) => ({
    path: path.replace(rootDir, './'),
    content
  }));
  const files = arrayToObj(relativeFiles, {
    keyName: 'path',
    valueName: 'content'
  });

  try {
    const { frontmatter, code } = await bundleMDX({
      source: indexFile.content,
      files,
      mdxOptions(options) {
        // options.remarkPlugins = [
        //   ...(options.remarkPlugins ?? []),
        //   remarkSlug,
        //   [remarkAutolinkHeadings, { behavior: 'wrap' }],
        //   gfm,
        //   ...remarkPlugins
        // ];
        // options.rehypePlugins = [...(options.rehypePlugins ?? []), ...rehypePlugins];
        return options;
      }
    });
    const readingtime = calculateReadingTime(indexFile.content);

    return {
      code,
      readingtime,
      frontmatter: frontmatter as FrontmatterType
    };
  } catch (error: unknown) {
    console.error(`Compilation error for slug: `, slug);
    throw error;
  }
}
