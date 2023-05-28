import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';
import Link from 'next/link';

const CustomLink = (props: { [k: string]: string }) => {
  const href = props.href;

  if (href.startsWith('/')) {
    return (
      <Link className='link link-primary' href={href} {...props}>
        {props.children}
      </Link>
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
  return <Image alt={props.alt} className='rounded-lg shadow max-h-[80vh] max-w-[90%]' {...props} />;
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
  Image: RoundedImage,
  img: DefaultImage,
  a: CustomLink,
  table: CustomTable
};

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    <article className='prose prose-quoteless prose-neutral min-w-full my-10'>
      {/* @ts-ignore */}
      <Component components={{ ...components }} />
    </article>
  );
}
