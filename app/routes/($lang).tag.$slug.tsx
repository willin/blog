import clsx from 'classnames';
import { json, type LoaderFunction } from '@remix-run/cloudflare';
import { useLoaderData, useParams, useRouteLoaderData } from '@remix-run/react';
import { useI18n } from 'remix-i18n';
import { PostCard } from '~/components/atom/post-card';
import { TagList } from '~/components/atom/tag-list';
import { ContentType, type MetaIndex } from '~/server/services/content';
import { tagMeta } from '~/utils/meta';

export const loader: LoaderFunction = async ({ request, context, params }) => {
  const totalViews = await context.services.view.getTotalViews();
  const views = await context.services.view.getViews();
  return json({ totalViews, views });
};

export const meta = tagMeta;

export default function BlogTagPage() {
  const { t, locale } = useI18n();
  const { slug } = useParams();
  const { totalViews, views } = useLoaderData<typeof loader>();
  const { meta } = useRouteLoaderData<{ meta: MetaIndex }>('root');
  const data = meta[locale()];
  const tag = decodeURIComponent(slug);
  const posts = data?.contents.filter((c) => c.type === ContentType.BLOG && c.tags?.includes(tag)) ?? [];

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
          <TagList type='tag' items={data[ContentType.BLOG].tags} current={tag} />
        </section>
      )}
      <div
        className={clsx({
          'columns-2 lg:columns-3 xl::columns-4 my-10': posts?.length > 4,
          'grid grid-cols-2 md:grid-cols-4 gap-4 my-10': posts?.length <= 4
        })}>
        {posts.length > 0 &&
          posts.map((post) => (
            <PostCard post={post} key={post.slug} views={views.find((p) => p.slug === post.slug)?.views} />
          ))}
      </div>
      <div className='text-center'>
        <a
          href='https://2022.willin.wang/blog'
          className='link link-accent no-underline'
          target='_blank'
          rel='noreferrer'>
          {t('site.old_blog')}
        </a>
      </div>
    </article>
  );
}
