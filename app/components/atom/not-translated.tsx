import { ContentType, type Content } from '~/server/services/content';
import { LocaleLink } from '../link';

export function NotTranslated({ post, type }: { post: Content; type: ContentType }) {
  return (
    <div className='prose'>
      <h1>Not translated</h1>
      <p>This page is not translated to your language.</p>
      <p>
        Go back:
        <LocaleLink to={`${type === ContentType.PAGE ? '' : `/${type}`}/${post.slug}`}>{post.title}</LocaleLink>
      </p>
    </div>
  );
}
