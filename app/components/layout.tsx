import clsx from 'classnames';
import { type ReactNode } from 'react';
import BackgroundImage from './background';
import Bootstrap from './bootstrap';
import MainHeader from './header';
import { useLocation } from '@remix-run/react';

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const trailingSlash = pathname.replace(/\/$/, '');

  return (
    <>
      <BackgroundImage />
      <MainHeader />
      <main
        className={clsx('p-2 sm:p-4 mb-4 mx-auto', {
          'container max-w-[1920px] shadow bg-base-100/90 rounded':
            pathname !== '/' && trailingSlash !== '/zh' && trailingSlash !== '/en'
        })}>
        {children}
        <Bootstrap />
      </main>
      <footer className='text-center text-sm'>
        <p>
          <a href='https://github.com/willin' target='_blank' className='inline-block' rel='noreferrer'>
            <img
              src='https://img.shields.io/github/followers/willin.svg?style=social&amp;label=Followers'
              alt='Github Followers'
            />
          </a>{' '}
          <a href='https://github.com/willin/blog' target='_blank' className='inline-block' rel='noreferrer'>
            <img alt='GitHub Repo stars' src='https://img.shields.io/github/stars/willin/blog?style=social' />
          </a>
        </p>
        <p>
          <a href='https://willin.wang' target='_blank' rel='noreferrer'>
            Willin Wang
          </a>{' '}
          &copy; 2002 ~ {new Date().getFullYear()}
        </p>
        <p>
          <small>
            <a href='https://beian.miit.gov.cn/' target='_blank' rel='noreferrer'>
              苏ICP备17011988号-1
            </a>
          </small>
        </p>
      </footer>
    </>
  );
}
