import { type ICacheService } from './cache';
import { type IDatabaseService } from './database';

export interface Invoice {
  date: string;
  amount: number;
  category: 'DONATE' | 'OPENSOURCE';
  type: 'IN' | 'OUT';
  desc: string;
}

export interface IInvoiceService {
  getInvoices(): Promise<Invoice[]>;
}

export class InvoiceService implements IInvoiceService {
  #db: IDatabaseService;
  #cache: ICacheService;

  constructor(env: RemixServer.Env, db: IDatabaseService, cache: ICacheService) {
    this.#db = db;
    this.#cache = cache;
  }

  async getInvoices(): Promise<Invoice[]> {
    const key = 'invoices';
    const cached = await this.#cache.get<Invoice[]>(key);
    if (cached) return cached;
    const invoices = await this.#db.query<Invoice>(
      `SELECT * FROM invoices WHERE category in ('DONATE','OPENSOURCE') ORDER BY date DESC`
    );
    await this.#cache.put(key, invoices, 3600);
    return invoices;
  }
}
