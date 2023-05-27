import { allBlogs } from 'contentlayer/generated';
import { ContextParams } from '../../helper';
import { NotTranslated } from '../not-translated';
import { PostDetail } from './detail';
import { BaseURL } from '@/lib/config';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/next-auth';

export default async function Post({ params }: ContextParams) {
  const posts = allBlogs.filter((post) => post.slug === params.slug);
  const post = posts.find((post) => post.lang === params.lang);
  if (!post) {
    if (posts.length > 0) {
      return <NotTranslated post={posts[0]} type='post' />;
    }
    redirect('/');
  }
  const session = await getServerSession(authOptions);
  // @ts-ignore
  return <PostDetail post={post} type='post' lang={params.lang} username={session?.user?.username as string} />;
}

export function generateStaticParams() {
  return allBlogs.map((p) => ({ params: { slug: p.slug, lang: p.lang } }));
}

export async function generateMetadata({ params }: ContextParams) {
  const post = allBlogs.find((post) => post.slug === params.slug && post.lang === params.lang);
  if (!post) {
    return;
  }

  const { title, date, description, image, slug } = post;
  const ogImage = image
    ? image.startsWith('http')
      ? image
      : `${BaseURL}${image}`
    : //temp
      `${BaseURL}/images/og.png`;
  //  `${BaseURL}/api/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: date,
      url: `${BaseURL}/${params.lang}/blog/${slug}`,
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
