import type { Blog, Page } from 'contentlayer/generated';
import type { ReadTimeResults } from 'reading-time';
import { LocaleLink } from '../link';
import { useI18n } from 'remix-i18n';
import AdSlot from '../adsense';
import { Donate } from './donate';
import { Form, useLoaderData, useRouteLoaderData } from '@remix-run/react';
import { useLoginInfo } from './use-login';
import { i18nConfig } from '~/i18n';
import { Mdx } from './mdx';

function getUrl(type: string, slug: string, lang: string) {
  let url = `https://willin.wang/`;
  if (lang !== i18nConfig.fallbackLng || type === 'page') {
    url += `${lang}/`;
  }
  if (type !== 'page') {
    url += `${type}/`;
  }
  url += slug;
  return url;
}

function PostCategory({ post }: { post: Blog }) {
  const { t } = useI18n();

  return (
    <span className='badge mr-4'>
      {t('common.category_by')}
      <LocaleLink className='link-accent decoration-transparent' href={`/category/${post.category}`}>
        {post.category}
      </LocaleLink>
    </span>
  );
}

function PostTags({ post, lang }: { post: Blog; lang: Locale }) {
  const { t } = useI18n();

  return (
    <span className='badge mr-4'>
      {t('common.tags_by')}
      {(post.tags as string[]).map((tag) => (
        <LocaleLink key={tag} className='link-accent decoration-transparent mr-2' href={`/tag/${tag}`}>
          {tag}
        </LocaleLink>
      ))}
    </span>
  );
}

function PostCopyright({ post, type }: { post: Blog | Page; type: string }) {
  const { locale } = useI18n();

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
            文章作者： <a href='https://willin.wang'>Willin Wang</a>
          </p>
          <p className='text-sm mb-1'>
            本文链接： <a href={getUrl(type, post.slug, locale())}>{getUrl(type, post.slug, locale())}</a>
          </p>
          <p className='text-sm  mt-1'>
            本博客所有文章除特别声明外，均为原创，采用{' '}
            <a rel='license noreferrer' href='http://creativecommons.org/licenses/by-nc/4.0/' target='_blank'>
              知识共享署名-非商业性使用 4.0 国际许可协议
            </a>
            进行许可。
          </p>
        </label>
      </div>
    </div>
  );
}

function LoginAndFollow() {
  const { t } = useI18n();
  const { user } = useRouteLoaderData('root');

  return (
    <div className='alert alert-warning shadow-lg my-10'>
      <div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='stroke-current flex-shrink-0 h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
          />
        </svg>
        <label>
          <h4 className='mb-2'>{t('common.login_and_follow')}</h4>
          {!user && (
            <Form method='post' action='/auth/sso'>
              <button className='btn btn-sm btn-primary' type='submit'>
                {t('common.login')}
              </button>
            </Form>
          )}
          {user && (
            <Form method='post' action='/auth/logout' className='block'>
              <button className='btn btn-sm btn-primary' type='submit'>
                {t('common.logout')} {user.username}
              </button>
            </Form>
          )}
          <a
            className='btn btn-sm btn-secondary ml-2'
            href='https://github.com/willin'
            target='_blank'
            rel='noreferrer'>
            {t('common.follow')}
          </a>
        </label>
      </div>
    </div>
  );
}

function PostContent({ post }: { post: Blog | Page }) {
  const { following, vip } = useLoginInfo();

  if (!post.follow && !post.vip) {
    return <Mdx code={post.body.code} html={post.html} />;
  }

  if (post.follow && !following) {
    return (
      <>
        <div className='my-10'>{(post as Blog).description || ' '}</div>
        <LoginAndFollow />
      </>
    );
  }
  if (post.vip && !vip) {
    return (
      <>
        <div className='my-10'>{(post as Blog).description || ' '}</div>
        <LoginAndFollow />
      </>
    );
  }
  return <Mdx code={post.body.code} html={post.html} />;
}

export function PostDetail({ post, type }: { post: Blog | Page; type: string }) {
  const { views = 0 } = useLoaderData();
  const { t, locale } = useI18n();
  const readingTime = post.readingTime as ReadTimeResults;

  return (
    <main>
      <h1 className='text-5xl text-secondary text-center my-4 break-words'>{post.title}</h1>
      <aside className='text-center mb-8'>
        {type === 'page' && (
          <span className='badge mr-4'>
            {t('common.publish_at')} {post.date}
          </span>
        )}
        <span className='badge'>
          {views} {t('common.views')}
        </span>
        {type === 'post' && (
          <>
            <span className='badge mx-4'>
              {t('common.wordcount', { wordcount: readingTime.words.toLocaleString() })}
            </span>
            <span className='badge'>
              {t('common.reading_time', {
                time: locale() === 'zh' ? Math.ceil(readingTime.minutes) : readingTime.text
              })}
            </span>
          </>
        )}
      </aside>
      <div className='ads mx-auto text-center'>
        <AdSlot />
      </div>
      <div className='break-words'>
        <PostContent post={post} />
      </div>
      <div className='divider'>The End</div>
      <aside className='my-4'>
        <Donate />

        {type === 'post' && (
          <div className='text-center'>
            <span className='badge mr-4'>
              {t('common.publish_at')} {post.date}
            </span>
            {post.category && <PostCategory post={post as Blog} />}
            {post.tags && <PostTags post={post as Blog} />}
          </div>
        )}

        {locale() === 'zh' && <PostCopyright post={post} type={type} />}
      </aside>
    </main>
  );
}
