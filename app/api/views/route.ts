import { queryBuilder } from '@/lib/planetscale';
import { NextResponse } from 'next/server';

async function handler() {
  try {
    const data = await queryBuilder.selectFrom('views').select(['slug', 'count']).execute();
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: (e as Error).message }, { status: 500 });
  }
}

export { handler as POST };
