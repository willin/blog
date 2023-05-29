import { Blog, Page } from 'contentlayer/generated';
import { translation } from '@/lib/i18n';
import { Locale } from '@/i18n-config';
import ViewCounter from '../view-counter';
import Link from 'next/link';
import { ReadTimeResults } from 'reading-time';
import { BaseURL } from '@/lib/config';
import { PostContent } from './authenticate';

function PostCategory({ post, lang }: { post: Blog; lang: Locale }) {
  if (!post.category) return null;
  const t = translation(lang);

  return (
    <span className='badge mr-4'>
      {t('common.category_by')}
      <Link className='link-accent decoration-transparent' href={`/${lang}/category/${post.category}`}>
        {post.category}
      </Link>
    </span>
  );
}

function PostTags({ post, lang }: { post: Blog; lang: Locale }) {
  if (!post.tags) return null;
  const t = translation(lang);

  return (
    <span className='badge mr-4'>
      {t('common.tags_by')}
      {(post.tags as string[]).map((tag) => (
        <Link key={tag} className='link-accent decoration-transparent mr-2' href={`/${lang}/tag/${tag}`}>
          {tag}
        </Link>
      ))}
    </span>
  );
}

function PostCopyright({ lang, post, type }: { lang: Locale; post: Blog | Page; type: string }) {
  if (lang !== 'zh') return null;

  return (
    <div className='alert alert-info text-info-content my-10'>
      <div className='flex-1'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          className='w-6 h-6 stroke-current mx-2 flex-shrink-0'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
        </svg>
        <label>
          <h4 className='mb-2'>版权信息</h4>
          <p className='text-sm mb-1'>文章标题： {post.title}</p>
          <p className='text-sm mb-1'>
            文章作者： <a href={BaseURL}>Willin Wang</a>
          </p>
          <p className='text-sm mb-1'>
            本文链接：{' '}
            <a href={`${BaseURL}/${lang}/${type}/${post.slug}`}>{`${BaseURL}/${lang}/${type}/${post.slug}`}</a>
          </p>
          <p className='text-sm  mt-1'>
            本博客所有文章除特别声明外，均为原创，采用{' '}
            <a rel='license' href='http://creativecommons.org/licenses/by-nc/4.0/' target='_blank'>
              知识共享署名-非商业性使用 4.0 国际许可协议
            </a>
            进行许可。
          </p>
        </label>
      </div>
    </div>
  );
}

export function PostDetail({ post, lang, type }: { post: Blog | Page; lang: Locale; type: string }) {
  const t = translation(lang);
  const readingTime = post.readingTime as ReadTimeResults;

  return (
    <article>
      <h1 className='text-5xl text-secondary text-center my-4 break-words'>{post.title}</h1>
      <aside className='text-center mb-8'>
        <span className='badge'>
          <ViewCounter slug={post.slug} trackView label={t('common.views')} />
        </span>
        <span className='badge mx-4'>{t('common.wordcount', { wordcount: readingTime.words.toLocaleString() })}</span>
        <span className='badge'>
          {t('common.reading_time', { time: lang === 'zh' ? Math.ceil(readingTime.minutes) : readingTime.text })}
        </span>
      </aside>
      <div className='ads mx-auto text-center'>
        <ins
          className='adsbygoogle'
          style={{ display: 'block' }}
          data-ad-client='ca-pub-5059418763237956'
          data-ad-slot='9518721243'
          data-ad-format='auto'
          data-full-width-responsive='true'></ins>
      </div>
      <div className='break-words'>
        <PostContent post={post} />
      </div>
      <div className='divider'>The End</div>
      <aside className='my-4'>
        <div className='text-center'>
          <div className='tooltip' data-tip={t('common.donate_tip')}>
            <a
              target='_blank'
              className='btn btn-secondary btn-lg my-2 hover:glass'
              href={lang === 'zh' ? 'https://afdian.net/a/willin' : 'https://github.com/sponsors/willin'}>
              {t('common.donate')}
            </a>
          </div>
        </div>
        <div className='text-center'>
          <span className='badge mr-4'>
            {t('common.publish_at')} {post.date}
          </span>
          {type === 'post' && (
            <>
              <PostCategory post={post as Blog} lang={lang} />
              <PostTags post={post as Blog} lang={lang} />
            </>
          )}
        </div>
        <PostCopyright post={post} lang={lang} type={type} />
      </aside>
      <script type='application/ld+json'>{JSON.stringify(post.structuredData)}</script>
    </article>
  );
}
