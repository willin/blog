import { Locale } from '@/i18n-config';
import { translation } from '@/lib/i18n';

export function Donate({ lang }: { lang: Locale }) {
  const t = translation(lang);
  return (
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
  );
}
