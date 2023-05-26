'use client';
import clsx from 'classnames';
import { usePathname } from 'next/navigation';

export function AppLayer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      className={clsx('p-2 sm:p-4 mb-20', {
        'container mx-auto shadow bg-base-100/70': pathname.indexOf('/') !== pathname.lastIndexOf('/')
      })}>
      {children}
    </div>
  );
}
