import * as _jsx_runtime from 'react/jsx-runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleLink } from '../link';
import { Donate } from './donate';

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
      <table {...props} />
    </div>
  );
}

const components = {
  // pre: Codeblock,
  Image: RoundedImage,
  img: DefaultImage,
  a: CustomLink,
  table: CustomTable,
  // Invoices: Invoices,
  Donate: Donate
  // InvoiceDetail: InvoiceDetail
};

function getMDXComponent(code: string, globals: Record<string, unknown> = {}): React.FC<MDXContentProps> {
  const scope = { React, ReactDOM, _jsx_runtime, ...globals };
  // eslint-disable-next-line no-new-func
  const fn = new Function(...Object.keys(scope), code);

  return fn(...Object.values(scope)).default;
}

function useMDXComponent(code: string, globals: Record<string, unknown> = {}) {
  return React.useMemo(() => getMDXComponent(code, globals), [code, globals]);
}

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    <article className='prose prose-quoteless prose-neutral min-w-full my-10'>
      {/* @ts-ignore */}
      <Component components={{ ...components }} />
    </article>
  );
}
