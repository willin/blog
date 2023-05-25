import { useMDXComponent } from 'next-contentlayer/hooks';
import { allBlogs } from 'contentlayer/generated';
// import type { Blog } from 'contentlayer/generated';

export default function Post({ params }: { params: { slug: string } }) {
  const post = allBlogs.find((post) => post.slug === params.slug);
  if (!post) throw new Error(`Post not found: ${params.slug}`);

  const Component = useMDXComponent(post.body.code);

  return (
    <div>
      <Component />
    </div>
  );
}

export async function generateStaticParams() {
  return allBlogs.map((p) => ({ params: { slug: p.slug, lang: p.lang } }));
}
