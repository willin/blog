import { queryBuilder } from '@/lib/mysql';
import { NextResponse } from 'next/server';

async function handler(
  req: Request,
  {
    params
  }: {
    params: { slug: string };
  }
) {
  try {
    const slug = params.slug;
    if (!slug) {
      return NextResponse.json({ message: 'Slug is required.' }, { status: 500 });
    }

    const data = await queryBuilder.selectFrom('views').where('slug', '=', slug).select(['count']).execute();

    const views = !data.length ? 0 : Number(data[0].count);

    if (req.method === 'POST') {
      await queryBuilder
        .insertInto('views')
        .values({ slug, count: 1 })
        .onDuplicateKeyUpdate({ count: views + 1 })
        .execute();

      return NextResponse.json({
        total: views + 1
      });
    }

    if (req.method === 'GET') {
      return NextResponse.json({ total: views });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: (e as Error).message }, { status: 500 });
  }
}

export { handler as GET, handler as POST };
export const revalidate = 600;
export const runtime = 'edge';
