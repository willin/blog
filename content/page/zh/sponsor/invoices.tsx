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
          <div className='stat-title'>充 ⚡ 收入</div>
          <div className='stat-value text-secondary'>{formatMoney(metrics?.in || 0)}</div>
          <div className='stat-desc'>今年 {formatMoney(metrics?.yearIn || 0)}</div>
        </div>

        <div className='stat'>
          <div className='stat-title'>用 ❤️ 支出</div>
          <div className='stat-value text-primary'>{formatMoney(metrics?.out || 0)}</div>
          <div className='stat-desc'>今年 {formatMoney(metrics?.yearOut || 0)}</div>
        </div>

        <div className='stat'>
          <div className='stat-title'>余粮 🌾 </div>
          <div
            className={clsx('stat-value', {
              'text-primary': metrics?.balance < 0,
              'text-secondary': metrics?.balance >= 0
            })}>
            {formatMoney(metrics?.balance || 0)}
          </div>
          <div className='stat-desc'>今年 {formatMoney(metrics?.balanceYear || 0)}</div>
        </div>
      </div>
    </div>
  );
}

function TableBody({ invoices }: { invoices: InvoicesTable[] }) {
  return (
    <div className='overflow-x-auto'>
      <table className='table table-zebra table-md'>
        <thead>
          <tr>
            <th>日期</th>
            <th>金额</th>
            <th>项目说明</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length === 0 && (
            <tr>
              <td colSpan={3} className='text-center'>
                <a target='_blank' className='btn btn-secondary my-2 hover:glass' href='https://afdian.com/a/willin'>
                  请开始您的表演
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
    </div>
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
      <h2>充 ⚡ 收入</h2>
      <TableBody invoices={metrics?.filter((x) => x.type === 'IN')} />
      <h2>用 ❤️ 支出</h2>
      <TableBody invoices={metrics?.filter((x) => x.type === 'OUT')} />
    </>
  );
}
