import { ContentType, type Content } from '~/server/services/content';
import { LocaleLink } from '../link';
import { useI18n } from 'remix-i18n';

export function PostCard({
  post,
  views = 0,
  type = ContentType.BLOG
}: {
  post: Content;
  views: number;
  type: ContentType;
}) {
  const { t } = useI18n();

  return (
    <LocaleLink to={`/${type}/${post.slug}`} className='grid gap-4 h-auto'>
      <div className='card bg-base-100 shadow-xl image-full relative mb-4'>
        <figure>
          <img src={post.image || '/images/bg.jpg'} alt='Cover' />
        </figure>
        <div className='card-body'>
          <h2 className='card-title text-lg text-secondary break-words'>{post.title}</h2>
          <p className='text-sm break-words'>{post.description}&nbsp;</p>
          <div className='card-actions justify-end'>
            <div className='join'>
              <button className='btn btn-outline btn-xs btn-disabled join-item'>
                {views} {t('common.views')}
              </button>
              <button className='btn btn-outline btn-xs btn-disabled join-item'>{post.date}</button>
              <button className='btn btn-outline btn-xs btn-disabled join-item'>{post.category}</button>
            </div>
          </div>
        </div>
      </div>
    </LocaleLink>
  );
}
