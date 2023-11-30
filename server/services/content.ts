import type { Env } from '../env';
import type { ICacheService } from './cache';

export enum ContentType {
  BLOG = 'blog',
  PAGE = 'page',
  TIMELINE = 'timeline'
}

export type ContentMeta = {
  type: ContentType;
  title: string;
  date: string;
  slug: string;
  readtime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
  image?: string;
  description?: string;
  category?: string;
  tags?: string[];
  follow?: boolean;
  vip?: boolean;
  excerpt?: string;
};

export type Content = ContentMeta & {
  code?: string;
  html: string;
};

export type MetaIndex = {
  [key: string]: {
    words: number;
    readtime: number;
    contents: ContentMeta[];
    [key: ContentType]: {
      tags: [string, number][];
      categories: [string, number][];
    };
  };
};

export interface IContentService {
  getMeta(): Promise<ContentMeta>;
  getContent({ locale, type, slug }: { locale: string; type: ContentType; slug: string }): Promise<Content>;
}

export class ContentService implements IContentService {
  #cache: ICacheService;
  #baseUrl: string;

  constructor(env: Env, url: URL, cache: ICacheService) {
    this.#cache = cache;
    this.#baseUrl = `${url.protocol}//${url.hostname}${
      ['80', '443', ''].includes(url.port) ? '' : `:${url.port}`
    }/_content`;
  }

  async getMeta(): Promise<ContentMeta> {
    const key = 'meta';
    const cached = await this.#cache.get<ContentMeta>(key);
    if (cached) return cached;
    const meta: ContentMeta = await fetch(`${this.#baseUrl}/meta.json`).then((res) => res.json());
    await this.#cache.put(key, meta, 86400);
    return meta;
  }

  async getContent({ locale, type, slug }: { locale: string; type: ContentType; slug: string }): Promise<Content> {
    const key = `content:${locale}:${type}:${slug}`;
    const cached = await this.#cache.get<Content>(key);
    if (cached) return cached;
    const content: Content = await fetch(`${this.#baseUrl}/${type}/${locale}/${slug}.json`).then((res) => res.json());
    await this.#cache.put(key, content, 86400);
    return content;
  }
}
