import { useI18n } from 'remix-i18n';

export function Donate() {
  const { t, locale } = useI18n();

  return (
    <div className='text-center'>
      <div className='tooltip' data-tip={t('common.donate_tip')}>
        <a
          target='_blank'
          className='btn btn-secondary btn-lg my-2 hover:glass'
          href={locale() === 'zh' ? 'https://afdian.net/a/willin' : 'https://github.com/sponsors/willin'}
          rel='noreferrer'>
          {t('common.donate')}
        </a>
      </div>
    </div>
  );
}
