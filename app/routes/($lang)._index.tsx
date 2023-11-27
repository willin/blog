import { useI18n } from 'remix-i18n';
import { LocaleLink } from '~/components/link';
// import type { LoaderFunction } from '@remix-run/cloudflare';
// import { i18nConfig } from '~/i18n';

// export const loader: LoaderFunction = async ({ request, context, params }) => {
//   const lang = params.lang;

//   await context.services.auth.authenticator.isAuthenticated(request, {
//     successRedirect: `${lang && lang !== i18nConfig.fallbackLng ? `/${lang}` : ''}/dashboard`,
//     failureRedirect: `${lang && lang !== i18nConfig.fallbackLng ? `/${lang}` : ''}/login`
//   });
// };

export default function IndexPage() {
  const { t } = useI18n();

  return (
    <div className='flex justify-center'>
      <div className='card w-full max-w-2xl bg-base-100/70 shadow-xl'>
        <figure className='px-10 pt-10'>
          <img src='/images/avatar.jpg' alt='Willin Wang' className='rounded-xl w-32' />
        </figure>
        <div className='card-body items-center text-center'>
          <h1 className='text-5xl md:text-[3.50rem] font-bold mb-4 background-animate bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary sm:whitespace-nowrap'>
            <LocaleLink to='/about'>{t('site.title')}</LocaleLink>
          </h1>
          <p className='leading-7 whitespace-pre-line'>{t('site.desc')}</p>
          {/* <h2 className='mt-4 btn btn-secondary cursor-default'>{t('site.social')}</h2>
          <div className='card-actions justify-center'>
            <SocialLinks />
          </div> */}
        </div>
      </div>
    </div>
  );
}
