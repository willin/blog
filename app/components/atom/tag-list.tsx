import clsx from 'classnames';
import { LocaleLink } from '../link';
import { randomClassNames } from '~/utils/helper';

export function TagList({ items, type, current }: { type: string; items: [string, number][]; current?: string }) {
  return (
    <div className='my-2 flex flex-wrap items-center flex-row justify-center'>
      {items.map(([name, count], i) => (
        <LocaleLink
          to={`/${type}/${encodeURIComponent(name)}`}
          className={clsx('btn btn-sm m-2', randomClassNames[i % randomClassNames.length], {
            'btn-disabled': name === current
          })}
          key={`${name}-${count}`}>
          {name}
          <div className='ml-1 badge badge-outline'>{count}</div>
        </LocaleLink>
      ))}
    </div>
  );
}
