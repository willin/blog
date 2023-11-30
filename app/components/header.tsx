import { useI18n } from 'remix-i18n';
import { Link, useRouteLoaderData } from '@remix-run/react';
import LocaleSwitch from './locale-switch';
import ThemeSwitch from './theme-switch';
import UserPanel from './user-panel';
import { LocaleLink } from './link';
import { ContentType } from '~/server/services/content';

function PageLinks({ items }: { items: { href: string; label: string }[] }) {
  return (
    <>
      {items.map((item) => (
        <li key={item.href}>
          <Link to={item.href} className='btn btn-ghost normal-case'>
            {item.label}
          </Link>
        </li>
      ))}
    </>
  );
}

export default function MainHeader() {
  const { t, locale } = useI18n();
  const { meta } = useRouteLoaderData('root');
  const data = meta[locale()];

  const items = data?.contents
    ?.filter((p) => p.type === ContentType.PAGE)
    .map((page) => ({
      href: `/${locale()}/${page.slug}`,
      label: page.title
    }));
  items.unshift({
    href: `/${locale()}/blog`,
    label: t('site.blog')
  });

  return (
    <header className='sticky top-0 flex justify-center w-full z-[9999] opacity-90 hover:opacity-100 bg-base-100 mb-4'>
      <div className='navbar bg-base-100'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'>
              <PageLinks items={items} />
            </ul>
          </div>
          <LocaleLink to='/' className='btn btn-ghost normal-case text-xl'>
            Willin Wang
          </LocaleLink>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1 py-0'>
            <PageLinks items={items} />
          </ul>
        </div>
        <div className='navbar-end'>
          <LocaleSwitch />
          <ThemeSwitch />
          <UserPanel />
        </div>
      </div>
    </header>
  );
}
