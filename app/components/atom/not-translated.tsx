import type { Blog, Page } from 'contentlayer/generated';
import { LocaleLink } from '../link';

export function NotTranslated({ post }: { post: Blog | Page; type: string }) {
  return (
    <div className='prose'>
      <h1>Not translated</h1>
      <p>This page is not translated to your language.</p>
      <p>
        Go back:
        <LocaleLink to={`${type === 'page' ? '' : `/${type}`}/${post.slug}`}>{post.title}</LocaleLink>
      </p>
    </div>
  );
}
