import Link from 'next/link';
import { ThemeChange } from './themes';
import { LanguageChange } from './languages';
import { Locale } from '@/i18n-config';
import { allPages } from 'contentlayer/generated';
import { translation } from '@/lib/i18n';

function PageLinks({ items }: { items: { href: string; label: string }[] }) {
  return (
    <>
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className='btn btn-ghost normal-case'>
            {item.label}
          </Link>
        </li>
      ))}
    </>
  );
}

export async function MainHeader({ lang }: { lang: Locale }) {
  const t = await translation(lang);

  const items = allPages
    .filter((p) => p.lang === lang)
    .map((page) => ({
      href: `/${lang}/${page.slug}`,
      label: page.title
    }));
  items.unshift({
    href: `/${lang}/blog`,
    label: t('site.blog')
  });

  return (
    <header className='sticky top-0 flex justify-center w-full z-20 opacity-90 hover:opacity-100 bg-base-100 mb-4'>
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
          <Link href={`/${lang}`} className='btn btn-ghost normal-case text-xl'>
            Willin Wang
          </Link>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>
            <PageLinks items={items} />
          </ul>
        </div>
        <div className='navbar-end'>
          <LanguageChange />
          <ThemeChange />
        </div>
      </div>
    </header>
  );
}
