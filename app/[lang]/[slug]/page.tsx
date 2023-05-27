import { allPages } from 'contentlayer/generated';
import { ContextParams } from '../helper';
import { NotTranslated } from '../blog/not-translated';
import { PostDetail } from '../blog/[slug]/detail';
import { BaseURL } from '@/lib/config';
import { translation } from '@/lib/i18n';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/next-auth';

export default async function CustomPage({ params }: ContextParams) {
  const posts = allPages.filter((post) => post.slug === params.slug);
  const post = posts.find((post) => post.lang === params.lang);
  if (!post) {
    if (posts.length > 0) {
      return <NotTranslated post={posts[0]} type='page' />;
    }
    redirect('/');
  }
  const session = await getServerSession(authOptions);
  // @ts-ignore
  return <PostDetail post={post} type='page' lang={params.lang} username={session?.user?.username as string} />;
}

export function generateStaticParams() {
  return allPages.map((p) => ({ params: { slug: p.slug, lang: p.lang } }));
}

export async function generateMetadata({ params }: ContextParams) {
  const post = allPages.find((post) => post.slug === params.slug && post.lang === params.lang);
  if (!post) {
    return;
  }
  const t = translation(params.lang);

  const { title, date, description = t('site.description'), image, slug } = post as any;
  const ogImage = image
    ? (image as string).startsWith('http')
      ? image
      : `${BaseURL}${image as string}`
    : `${BaseURL}/api/og?title=${title as string}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: date,
      url: `${BaseURL}/${params.lang}/${slug as string}`,
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
