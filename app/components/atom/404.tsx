import { useI18n } from 'remix-i18n';
import { LocaleLink } from '../link';

export default function E404() {
  const { t } = useI18n();

  return (
    <main
      className='prose !w-full !max-w-full h-[400px]'
      style={{
        backgroundImage: 'url(/images/404.gif)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
      <div className='text-center'>
        <h1>404</h1>
        <LocaleLink to='/' className='btn btn-primary text-primary-content'>
          {t('site.home')}
        </LocaleLink>
      </div>
    </main>
  );
}
