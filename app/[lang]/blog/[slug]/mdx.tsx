import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';
import Link from 'next/link';

const CustomLink = (props: { [k: string]: string }) => {
  const href = props.href;

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a {...props} />;
  }

  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a target='_blank' rel='noopener noreferrer' {...props} />;
};

function RoundedImage(props: { [k: string]: string }) {
  return <Image alt={props.alt} className='rounded-lg' {...props} />;
}

const components = {
  Image: RoundedImage,
  a: CustomLink
};

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    <article className='prose prose-neutral'>
      <Component components={{ ...components }} />
    </article>
  );
}
