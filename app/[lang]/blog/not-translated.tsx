import { Blog, Page } from 'contentlayer/generated';

export function NotTranslated({ post }: { post: Blog | Page; type: string }) {
  return (
    <div>
      <h1>Not translated</h1>
      <p>This page is not translated to your language.</p>
    </div>
  );
}
