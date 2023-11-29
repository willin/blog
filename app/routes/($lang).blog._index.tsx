import { json, type LoaderFunction } from '@remix-run/cloudflare';
import { useLoaderData, useRouteLoaderData } from '@remix-run/react';
import { useI18n } from 'remix-i18n';
import { TagList } from '~/components/atom/tag-list';
import { ContentType, type MetaIndex } from '~/server/services/content';

export const loader: LoaderFunction = async ({ request, context, params }) => {
  const totalViews = await context.services.view.getTotalViews();
  const views = await context.services.view.getViews();
  return json({ totalViews, views });
};

export default function BlogIndexPage() {
  const { t, locale } = useI18n();
  const { totalViews } = useLoaderData<typeof loader>();
  const { meta } = useRouteLoaderData<{ meta: MetaIndex }>('root');
  const data = meta[locale()];

  return (
    <article>
      <section>
        <h3
          className='text-xl my-4 text-center'
          dangerouslySetInnerHTML={{
            __html: t('site.total_wordcount', {
              wordcount: (data.words ?? 0).toLocaleString(),
              readtime: (data.readtime / 60 ?? 0).toFixed(1),
              posts: data?.contents.filter((c) => c.type === ContentType.BLOG).length ?? 0,
              views: (totalViews ?? 0).toLocaleString()
            })
          }}
        />
      </section>
      {data[ContentType.BLOG]?.categories.length > 0 && (
        <section>
          <h2 className='text-lg text-center'>{t('site.view_by_category')}</h2>
          <TagList type='category' items={data[ContentType.BLOG].categories} />
        </section>
      )}
      {data[ContentType.BLOG]?.tags.length > 0 && (
        <section>
          <h2 className='text-lg text-center'>{t('site.view_by_tag')}</h2>
          <TagList type='tag' items={data[ContentType.BLOG].tags} />
        </section>
      )}
      {/* <section className='my-10 grid grid-flow-row-dense auto-rows-min sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {posts.length > 0 && posts.map((post) => <PostCard post={post} key={post.slug} lang={lang} />)}
      </section> */}
    </article>
  );
}
