import { useI18n } from 'remix-i18n';

export default function RssFeed() {
  const { t, locale } = useI18n();

  return (
    <div className='dropdown dropdown-end'>
      <div tabIndex={0} className='btn btn-ghost gap-1 normal-case'>
        <svg
          baseProfile='tiny'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='inline-block h-4 w-4 fill-current md:h-5 md:w-5'>
          <path d='M6.002 15.999a2 2 0 10-.004 4 2 2 0 00.004-4zM6 4a2 2 0 000 4c5.514 0 10 4.486 10 10a2 2 0 004 0c0-7.72-6.28-14-14-14zm0 6a2 2 0 000 4c2.205 0 4 1.794 4 4a2 2 0 004 0c0-4.411-3.589-8-8-8z' />
        </svg>
        <svg
          width='12px'
          height='12px'
          className='ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 2048 2048'>
          <path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z' />
        </svg>
      </div>
      <div
        tabIndex={0}
        className='dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px mt-16 w-48 overflow-y-auto shadow-2xl'>
        <ul className='menu menu-compact gap-1 p-3'>
          <li>
            <a href={`/${locale()}/rss.xml`} target='_blank' rel='rss noreferrer'>
              {t('common.current_language')}
            </a>
            <a href='/rss.xml' target='_blank' rel='rss noreferrer'>
              {t('common.all_language')}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
