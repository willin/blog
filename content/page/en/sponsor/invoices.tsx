import clsx from 'classnames';
import { useEffect, useState } from 'react';

function formatMoney(n: number) {
  return n.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' });
}

export function Invoices() {
  const [metrics, setMetrics] = useState({});
  useEffect(() => {
    function calc(invoices) {
      const year = new Date().getFullYear();
      const m = invoices?.reduce(
        (acc, cur) => {
          if (cur.type === 'IN') {
            acc.in += +cur.amount;
            acc.balance += +cur.amount;
            if (new Date(cur.date).getFullYear() === year) {
              acc.yearIn += +cur.amount;
              acc.balanceYear += +cur.amount;
            }
          } else {
            acc.out += +cur.amount;
            acc.balance -= cur.amount;
            if (new Date(cur.date).getFullYear() === year) {
              acc.yearOut += +cur.amount;
              acc.balanceYear -= +cur.amount;
            }
          }
          return acc;
        },
        { in: 0, out: 0, balance: 0, balanceYear: 0, yearIn: 0, yearOut: 0 }
      );
      setMetrics(m);
    }
    fetch('/api/invoices', {
      method: 'POST',
      credentials: 'include'
    })
      .then((r) => r.json())
      .then(calc);
  }, []);

  return (
    <div className='flex justify-center'>
      <div className='stats stats-vertical lg:stats-horizontal shadow'>
        <div className='stat'>
          <div className='stat-title'>⚡ Income</div>
          <div className='stat-value text-secondary'>{formatMoney(metrics?.in || 0)}</div>
          <div className='stat-desc'>This year {formatMoney(metrics?.yearIn || 0)}</div>
        </div>

        <div className='stat'>
          <div className='stat-title'>❤️ Expenditure</div>
          <div className='stat-value text-primary'>{formatMoney(metrics?.out || 0)}</div>
          <div className='stat-desc'>This year {formatMoney(metrics?.yearOut || 0)}</div>
        </div>

        <div className='stat'>
          <div className='stat-title'>🌾 Balance</div>
          <div
            className={clsx('stat-value', {
              'text-primary': metrics?.balance < 0,
              'text-secondary': metrics?.balance >= 0
            })}>
            {formatMoney(metrics?.balance || 0)}
          </div>
          <div className='stat-desc'>This year {formatMoney(metrics?.balanceYear || 0)}</div>
        </div>
      </div>
    </div>
  );
}

function TableBody({ invoices }: { invoices: InvoicesTable[] }) {
  return (
    <table className='table table-zebra table-compact'>
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {invoices.length === 0 && (
          <tr>
            <td colSpan={3} className='text-center'>
              <a
                target='_blank'
                className='btn btn-secondary my-2 hover:glass'
                href='https://github.com/sponsors/willin'>
                Get Startted
              </a>
            </td>
          </tr>
        )}
        {invoices.map((invoice, i) => (
          <tr key={`${invoice.date}-${i}`}>
            <td>{invoice.date}</td>
            <td>{invoice.amount}</td>
            <td>{invoice.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function InvoiceDetail() {
  const [metrics, setMetrics] = useState([]);
  useEffect(() => {
    function calc(invoices) {
      setMetrics(invoices);
    }
    fetch('/api/invoices', {
      method: 'POST',
      credentials: 'include'
    })
      .then((r) => r.json())
      .then(calc);
  }, []);
  return (
    <>
      <h2>⚡ Income</h2>
      <TableBody invoices={metrics?.filter((x) => x.type === 'IN')} />
      <h2>❤️ Expenditure</h2>
      <TableBody invoices={metrics?.filter((x) => x.type === 'OUT')} />
    </>
  );
}
