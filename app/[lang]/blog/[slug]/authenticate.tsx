'use client';
import { Blog, Page } from 'contentlayer/generated';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { AdminId } from '@/lib/config';
import { translation } from '@/lib/i18n';
import { Locale } from '@/i18n-config';
import { Mdx } from '../mdx';

function LoginAndFollow({ lang, username }: { lang: string; username?: string }) {
  const loggedIn = !!username;
  const t = translation(lang as Locale);

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
          {!loggedIn && (
            <button className='btn btn-sm btn-primary' onClick={() => signIn('github')}>
              {t('common.login')}
            </button>
          )}
          {loggedIn && (
            <button className='btn btn-sm btn-primary' onClick={() => signIn('github')}>
              {t('common.logout')} {username}
            </button>
          )}
          <a className='btn btn-sm btn-secondary ml-2' href='https://github.com/willin' target='_blank'>
            {t('common.follow')}
          </a>
        </label>
      </div>
    </div>
  );
}

export function PostContent({ post }: { post: Blog | Page }) {
  const [valid, setValid] = useState(!post.follow);
  const [username, setUsername] = useState('');
  useEffect(() => {
    if (!username) {
      fetch(`/api/me`)
        .then((res) => res.json())
        .then((data: { username: string }) => {
          setUsername(data.username);
        })
        .catch(() => {});
    }
    if (username === AdminId) {
      setValid(true);
      return;
    }
    fetch(`https://api.github.com/users/${username}/following/${AdminId}`)
      .then((res) => {
        if (res.status === 204) {
          setValid(true);
        }
      })
      .catch(() => {});
  }, [post.slug, username]);
  if (!valid) {
    return (
      <>
        <div className='my-10'>{(post as Blog).description || ' '}</div>
        <LoginAndFollow lang={post.lang} username={username} />
      </>
    );
  }
  return <Mdx code={post.body.code} />;
}
