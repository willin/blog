'use client';
import clsx from 'classnames';
import useSWR from 'swr';
import type { InvoicesTable } from '@/lib/mysql';
import { Locale } from '@/i18n-config';
import { fetcher } from '@/app/[lang]/use-login';
import { translation } from '@/lib/i18n';
import { formatMoney } from '@/app/[lang]/helper';

export function Invoices({ lang }: { lang: Locale }) {
  const t = translation(lang);
  const { data: invoices = [] } = useSWR<InvoicesTable[]>('/api/invoices', fetcher);
  const year = new Date().getFullYear();
  const metrics = invoices?.reduce(
    (acc, cur) => {
      if (cur.type === 'IN') {
        acc.in += +cur.amount;
        if (new Date(cur.date).getFullYear() === year) {
          acc.yearIn += +cur.amount;
        }
      } else {
        acc.out += +cur.amount;
        if (new Date(cur.date).getFullYear() === year) {
          acc.yearOut += +cur.amount;
        }
      }
      return acc;
    },
    { in: 0, out: 0, yearIn: 0, yearOut: 0 }
  );

  return (
    <div className='flex justify-center'>
      <div className='stats stats-vertical lg:stats-horizontal shadow'>
        <div className='stat'>
          <div className='stat-title'>{t('components.income')}</div>
          <div className='stat-value text-secondary'>{formatMoney(metrics?.in || 0)}</div>
          <div className='stat-desc'>
            {t('components.this_year')} {formatMoney(metrics?.yearIn || 0)}
          </div>
        </div>

        <div className='stat'>
          <div className='stat-title'>{t('components.expenditure')}</div>
          <div className='stat-value text-primary'>{formatMoney(metrics?.out || 0)}</div>
          <div className='stat-desc'>
            {t('components.this_year')} {formatMoney(metrics?.yearOut || 0)}
          </div>
        </div>

        <div className='stat'>
          <div className='stat-title'>{t('components.balance')}</div>
          <div
            className={clsx('stat-value', {
              'text-primary': (metrics?.in || 0 - metrics?.out || 0) < 0,
              'text-secondary': (metrics?.in || 0 - metrics?.out || 0) >= 0
            })}>
            {formatMoney(metrics?.in || 0 - metrics?.out || 0)}
          </div>
          <div className='stat-desc'>
            {t('components.this_year')} {formatMoney(metrics?.yearIn || 0 - metrics?.yearOut || 0)}
          </div>
        </div>
      </div>
    </div>
  );
}

function TableBody({ invoices, lang }: { invoices: InvoicesTable[]; lang: Locale }) {
  const t = translation(lang);
  return (
    <table className='table table-zebra table-compact'>
      <thead>
        <tr>
          <th>{t('components.date')}</th>
          <th>{t('components.amount')}</th>
          <th>{t('components.desc')}</th>
        </tr>
      </thead>
      <tbody>
        {invoices.length === 0 && (
          <tr>
            <td colSpan={3} className='text-center'>
              <a
                target='_blank'
                className='btn btn-secondary my-2 hover:glass'
                href={lang === 'zh' ? 'https://afdian.net/a/willin' : 'https://github.com/sponsors/willin'}>
                {t('components.no_data')}
              </a>
            </td>
          </tr>
        )}
        {invoices.map((invoice, i) => (
          <tr key={`${invoice.date}-${i}`}>
            <td>{invoice.date}</td>
            <td>{invoice.amount}</td>
            <td>{invoice.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function InvoiceDetail({ lang }: { lang: Locale }) {
  const t = translation(lang);
  const { data: invoices = [] } = useSWR<InvoicesTable[]>('/api/invoices', fetcher);

  return (
    <div className='text-center'>
      <h2>{t('components.income')}</h2>
      <TableBody invoices={invoices?.filter((x) => x.type === 'IN')} lang={lang} />
      <h2>{t('components.expenditure')}</h2>
      <TableBody invoices={invoices?.filter((x) => x.type === 'OUT')} lang={lang} />
    </div>
  );
}
