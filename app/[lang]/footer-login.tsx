'use client';
import { signIn, signOut } from 'next-auth/react';
import { useLoginInfo } from './use-login';
import { Locale } from '@/i18n-config';
import { translation } from '@/lib/i18n';

export function FooterLogin({ lang }: { lang: Locale }) {
  const t = translation(lang);

  const { username, vip, following } = useLoginInfo();
  if (username) {
    return (
      <>
        {!vip && !following && (
          <button onClick={() => signIn('github')} className='btn btn-xs btn-secondary align-super ml-4'>
            {t('common.follow')}
          </button>
        )}
        <button onClick={() => signOut()} className='btn btn-xs align-super ml-4'>
          {t('common.logout')}
        </button>
      </>
    );
  }

  return (
    <>
      <button onClick={() => signIn('github')} className='btn btn-xs btn-secondary align-super ml-4'>
        {t('common.fans_login')}
      </button>
    </>
  );
}
