// import 'server-only' not working with API routes yet
import { Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

export interface ViewsTable {
  slug: string;
  count: number;
}

export interface InvoicesTable {
  date: string;
  amount: number;
  category: 'DONATE' | 'OPENSOURCE';
  type: 'IN' | 'OUT';
  desc: string;
}

interface Database {
  invoices: InvoicesTable;
  views: ViewsTable;
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL
  })
});
