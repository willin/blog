import { Blog } from 'contentlayer/generated';
import Link from 'next/link';
import ViewCounter from './view-counter';
import { translation } from '@/lib/i18n';

export function PostCard({ post, lang }: { post: Blog; lang: string }) {
  const t = translation(lang);

  return (
    <Link href={`/${lang}/blog/${post.slug}`} className='grid row-span-1 col-span-1'>
      <div className='card bg-base-100 shadow-xl image-full'>
        <figure>
          <img src={post.image || '/images/bg.jpg'} alt='Cover' />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>{post.title}</h2>
          <p>{post.description}&nbsp;</p>
          <div className='card-actions justify-end'>
            <div className='btn-group'>
              <button className='btn btn-outline btn-xs'>
                <ViewCounter slug={post.slug} trackView={false} label={t('common.views')} />
              </button>
              <button className='btn btn-outline btn-xs'>{post.date}</button>
              <button className='btn btn-outline btn-xs'>{post.category}</button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
