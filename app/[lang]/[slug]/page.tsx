import { notFound } from 'next/navigation';
import { allPages } from 'contentlayer/generated';
import { ContextParams } from '../helper';
import { NotTranslated } from '../blog/not-translated';
import { PostDetail } from '../blog/[slug]/detail';
import { BaseURL } from '@/lib/config';

export default function CustomPage({ params }: ContextParams) {
  const posts = allPages.filter((post) => post.slug === params.slug);
  const post = posts.find((post) => post.lang === params.lang);
  if (!post) {
    if (posts.length > 0) {
      return <NotTranslated post={posts[0]} type='page' />;
    }
    notFound();
  }
  return <PostDetail post={post} type='page' lang={params.lang} />;
}

export function generateStaticParams() {
  return allPages.map((p) => ({ params: { slug: p.slug, lang: p.lang } }));
}

export async function generateMetadata({ params }: ContextParams): Promise<Metadata | undefined> {
  const post = allPages.find((post) => post.slug === params.slug && post.lang === params.lang);
  if (!post) {
    return;
  }

  const { title, date, description, image, slug } = post;
  const ogImage = image
    ? (image as string).startsWith('http')
      ? image
      : `${BaseURL}${image as string}`
    : `${BaseURL}/api/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: date,
      url: `${BaseURL}/${params.lang}/${slug}`,
      images: [
        {
          url: ogImage
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    }
  };
}
