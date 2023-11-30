import * as mdxBundler from 'mdx-bundler/client';
import { useMemo } from 'react';
import { components as mdxComponents } from './custom-components';

function getMdxComponent(code: string) {
  const Component = mdxBundler.getMDXComponent(code);
  function WMdxComponent({ components, ...rest }: Parameters<typeof Component>['0']) {
    return (
      // @ts-expect-error the types are wrong here
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      <Component components={{ ...mdxComponents, ...components }} {...rest} />
    );
  }
  return WMdxComponent;
}

function useMdxComponent(code: string, globals: Record<string, unknown> = {}) {
  return useMemo(() => getMdxComponent(code, globals), [code, globals]);
}

export function Mdx({ code, html }: { code: string; html: string }) {
  let Component = null;
  if (typeof window !== 'undefined' && code) {
    // eslint-disable-next-line
    Component = useMdxComponent(code);
  }

  return (
    <>
      {Component ? (
        <article className='prose prose-quoteless prose-neutral min-w-full my-10'>
          <Component />
        </article>
      ) : (
        <article
          className='prose prose-quoteless prose-neutral min-w-full my-10 html'
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </>
  );
}
