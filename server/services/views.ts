import { z } from 'zod';
import { type IDatabaseService } from './database';

const ViewsSchema = z.object({
  slug: z.string(),
  views: z.number().int().positive().default(0)
});

export type Views = z.infer<typeof ViewsSchema>;

export interface IViewsService {
  getTotalViews(): Promise<number>;
  getViews(): Promise<Views[]>;
  view(slug: string): Promise<number>;
}

export class ViewService implements IViewsService {
  #db: IDatabaseService;

  constructor(env: RemixServer.Env, db: IDatabaseService) {
    this.#db = db;
  }

  getTotalViews(): Promise<number> {
    return this.#db.query<{ total: number }>('SELECT SUM(views) as total FROM counter').then((rows) => rows[0].total);
  }

  getViews(): Promise<Views[]> {
    return this.#db.query<Views>('SELECT * FROM counter');
  }

  async view(slug: string): Promise<number> {
    const views = await this.#db
      .query<{ views: number }>('SELECT views FROM counter WHERE slug = ?1', [slug])
      .then((rows) => rows[0]?.views ?? 0);
    if (views === 0) {
      await this.#db.execute('INSERT INTO counter (slug, views) VALUES (?1, 1)', [slug]);
    } else {
      await this.#db.execute('UPDATE counter SET views = ?2 WHERE slug = ?1', [slug, views + 1]);
    }
    return views + 1;
  }
}
