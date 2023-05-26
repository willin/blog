import Link from 'next/link';
import clsx from 'classnames';
import { Locale } from '@/i18n-config';
import { randomClassNames } from '../helper';

export function TagList({
  lang,
  items,
  type,
  current
}: {
  type: string;
  lang: Locale;
  items: { name: string; count: number }[];
  current?: string;
}) {
  return (
    <div className='my-2 flex flex-wrap items-center flex-row justify-center'>
      {items.map(({ name, count }, i) => (
        <Link
          href={`/${lang}/${type}/${encodeURIComponent(name)}`}
          className={clsx('btn btn-sm m-2', randomClassNames[i % randomClassNames.length], {
            'btn-disabled': name === current
          })}
          key={`${name}-${count}`}>
          {name}
          <div className='ml-1 badge badge-outline'>{count}</div>
        </Link>
      ))}
    </div>
  );
}
