import { ContentType, type Content } from '~/server/services/content';
import { LocaleLink } from '../link';
import { useI18n } from 'remix-i18n';
import { useEffect, useRef } from 'react';
import { useLocation } from '@remix-run/react';

export function PostGrid({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    function resizeGridItem(item: Element) {
      const grid = ref.current;
      const rowHeight = 20;
      const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
      const rowSpan = Math.ceil(
        (item.querySelector('.card').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap)
      );
      console.log(item);
      item.style.gridRowEnd = 'span ' + rowSpan;
    }

    function resizeAllGridItems() {
      const allItems = ref.current?.getElementsByClassName('post-card');
      for (let x = 0; x < allItems.length; x++) {
        resizeGridItem(allItems[x]);
      }
    }
    window.addEventListener('resize', resizeAllGridItems);
    resizeAllGridItems();
    return () => window.removeEventListener('resize', resizeAllGridItems);
  }, [pathname]);

  return (
    <div
      ref={ref}
      className='grid gap-4 auto-rows-max mt-4'
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px,1fr))'
      }}>
      {children}
    </div>
  );
}

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
    <LocaleLink to={`/${type}/${post.slug}`} className='post-card'>
      <div className='card bg-base-100 shadow-xl image-full relative mb-4'>
        <figure>
          <img src={post.image || '/images/bg.jpg'} alt='Cover' />
        </figure>
        <div className='card-body'>
          <h2 className='card-title text-lg text-secondary break-words'>{post.title}</h2>
          <p className='text-sm break-words'>{post.description}&nbsp;</p>
          <div className='card-actions justify-end'>
            <div className='join'>
              <button className='btn btn-outline btn-xs join-item'>
                {views} {t('common.views')}
              </button>
              <button className='btn btn-outline btn-xs join-item'>{post.date}</button>
              <button className='btn btn-outline btn-xs join-item'>{post.category}</button>
            </div>
          </div>
        </div>
      </div>
    </LocaleLink>
  );
}
