import { z } from 'zod';
import type { Locale } from '~/i18n';
import type { ICacheService } from './cache';
import type { Env } from '../env';
import type { GithubFile, GithubProvider } from '../provider/github';
import { compileMdx } from '../provider/mdx';

export enum ContentType {
  BLOG = 'blog',
  PAGE = 'page',
  TIMELINE = 'timeline'
}

export const ContentSchema = z.object({
  type: z.nativeEnum(ContentType),
  title: z.string(),
  slug: z.string(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  readingtime: z.object({
    minutes: z.number(),
    words: z.number()
  }),
  source: z.string(),
  code: z.string().optional(),
  html: z.string().optional(),
  date: z.date().optional(),
  meta: z.object().optional()
});

export type Content = z.infer<typeof ContentSchema>;

export interface IContentService {
  getContents(type: ContentType, lang: Locale): Promise<Content[]>;
}

export class ContentService implements IContentService {
  #github: GithubProvider;
  #cache: ICacheService;

  constructor(env: Env, cache: ICacheService, github: GithubProvider) {
    this.#cache = cache;
    this.#github = github;
  }

  async #getCachedDir(type: ContentType, lang: Locale) {
    const key = `dir:${type}:${lang}`;
    const cached = await this.#cache.get<{ name: string }[]>(key);
    if (cached) {
      return cached;
    }
    const dirList = await this.#github.downloadDirList(`${type}/${lang}`);
    // await this.#cache.put(key, dirList, 86400);
    return dirList;
  }

  async #getCachedFile(type: ContentType, lang: Locale, item: ReturnType<GithubProvider['downloadDirList']>) {
    const slug = item.name.replace('.mdx', '');
    const key = `file:${type}:${lang}:${slug}`;
    const cached = await this.#cache.get<{ entry: string; files: GithubFile[] }>(key);
    if (cached) {
      return cached;
    }
    const file = await this.#github.downloadMdxFileOrDirectory(`${type}/${lang}/${slug}`);
    // await this.#cache.put(key, file, 86400);
    return file;
  }

  #getSlugFromEntry(input: string): string {
    const slug = input.split('/').pop() ?? input;
    return slug?.replace('.mdx', '');
  }

  async getContents(type: ContentType, lang: Locale): Promise<Content[]> {
    const list = await this.#getCachedDir(type, lang);
    const data = await Promise.all(list.map((item) => this.#getCachedFile(type, lang, item)));
    // const mdxFiles = await Promise.all(data.map((item) => compileMdx(this.#getSlugFromEntry(item.entry), item.files)));
    // return mdxFiles;
    return data;
  }
}
