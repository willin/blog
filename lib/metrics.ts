import 'server-only';
import { cache } from 'react';
import { InvoicesTable, ViewsTable, queryBuilder } from './mysql';

export const getBlogViews = cache(async () => {
  const data = await queryBuilder
    .selectFrom('views')
    .select(['slug', 'count'])
    .execute()
    .catch(() => [] as ViewsTable[]);

  return data.reduce((acc, curr) => acc + Number(curr.count), 0);
});

export const getInvoices = cache(async () => {
  const data = await queryBuilder
    .selectFrom('invoices')
    .select(['type', 'amount', 'date', 'desc'])
    .where('category', 'in', ['DONATE', 'OPENSOURCE'])
    .orderBy('date', 'desc')
    .execute()
    .catch(() => [] as Partial<InvoicesTable>[]);
  return data;
});
