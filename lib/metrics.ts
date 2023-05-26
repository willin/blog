import 'server-only';
import { cache } from 'react';
import { queryBuilder } from './planetscale';

export const getBlogViews = cache(async () => {
  const data = await queryBuilder.selectFrom('views').select(['count']).execute();

  return data.reduce((acc, curr) => acc + Number(curr.count), 0);
});
