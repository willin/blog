import { Blog, Page } from 'contentlayer/generated';
import Link from 'next/link';

export function NotTranslated({ post }: { post: Blog | Page; type: string }) {
  return (
    <div className='prose'>
      <h1>Not translated</h1>
      <p>This page is not translated to your language.</p>
      <p>
        Go back:
        <Link href={`/${post.lang}/blog/${post.slug}`}>{post.title}</Link>
      </p>
    </div>
  );
}
