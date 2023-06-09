import clsx from 'classnames';
import { Blog } from 'contentlayer/generated';
import Link from 'next/link';
import ViewCounter from './view-counter';
import { translation } from '@/lib/i18n';
import { Locale } from '@/i18n-config';

export function PostCard({ post, lang }: { post: Blog; lang: Locale }) {
  const t = translation(lang);

  return (
    <Link
      href={`/${lang}/blog/${post.slug}`}
      className={clsx({
        'row-span-6': !!post.image,
        'row-span-4': !post.image
      })}>
      <div className='card bg-base-100 shadow-xl image-full max-h-max'>
        <figure>
          <img src={post.image || '/images/bg.jpg'} alt='Cover' />
        </figure>
        <div className='card-body'>
          <h2 className='card-title text-lg text-secondary break-words'>{post.title}</h2>
          <p className='text-sm break-words'>{post.description}&nbsp;</p>
          <div className='card-actions justify-end'>
            <div className='btn-group'>
              <button className='btn btn-outline btn-xs btn-disabled'>
                <ViewCounter slug={post.slug} trackView={false} label={t('common.views')} />
              </button>
              <button className='btn btn-outline btn-xs btn-disabled'>{post.date}</button>
              <button className='btn btn-outline btn-xs btn-disabled'>{post.category}</button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
