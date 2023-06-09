import { translation } from '@/lib/i18n';
import { ContextParams } from './helper';
import { SocialLinks } from './social';
import Link from 'next/link';

export default function Home({ params: { lang } }: ContextParams) {
  const t = translation(lang);

  return (
    <div className='flex justify-center'>
      <div className='card w-full max-w-2xl bg-base-100/70 shadow-xl'>
        <figure className='px-10 pt-10'>
          <img src='/images/avatar.jpg' alt='Willin Wang' className='rounded-xl w-32' />
        </figure>
        <div className='card-body items-center text-center'>
          <h1 className='card-title btn btn-secondary cursor-default'>
            <Link href={`/${lang}/about`}>{t('site.title')}</Link>
          </h1>
          <p className='leading-7 whitespace-pre-line'>{t('site.desc')}</p>
          <h2 className='mt-4 btn btn-secondary cursor-default'>{t('site.social')}</h2>
          <div className='card-actions justify-center'>
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
}
