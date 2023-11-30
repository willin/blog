import { LocaleLink } from '../link';
import { Codeblock } from './code';

const CustomLink = (props: { [k: string]: string }) => {
  const href = props.href;

  if (href.startsWith('/')) {
    return (
      <LocaleLink className='link link-primary' to={href} {...props}>
        {props.children}
      </LocaleLink>
    );
  }

  if (href.startsWith('#')) {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a className='link' {...props} />;
  }

  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a className='link link-secondary' target='_blank' rel='noopener noreferrer' {...props} />;
};

function RoundedImage(props: { [k: string]: string }) {
  // @ts-ignore
  return <img alt={props.alt} className='rounded-lg shadow max-h-[80vh] max-w-[90%]' {...props} />;
}

function DefaultImage(props: { [k: string]: string }) {
  return (
    <span className='flex justify-center my-4'>
      <img alt={props.alt} className='rounded-lg shadow max-h-[80vh] max-w-[90%]' {...props} />
    </span>
  );
}

function CustomTable(props: { [k: string]: string }) {
  return (
    <div className='overflow-x-auto'>
      <table className='table table-zebra' {...props} />
    </div>
  );
}

export const components = {
  pre: Codeblock,
  Image: RoundedImage,
  img: DefaultImage,
  a: CustomLink,
  table: CustomTable
  // Invoices: Invoices,
  // Donate: Donate
  // InvoiceDetail: InvoiceDetail
};
