import { type MetaFunction } from '@remix-run/cloudflare';

export const pageMeta: MetaFunction = ({ matches, data }) => {
  const title = matches[0].meta.find((x) => x.title)?.title;
  const { post } = data;
  const parentMeta = matches
    .flatMap((match) => match.meta ?? [])
    .filter((meta) => !('title' in meta) && meta.name !== 'keywords' && meta.name !== 'description');
  return [
    ...parentMeta,
    {
      title: `${post.title} | ${title}`
    },
    {
      name: 'description',
      content: post.description || ''
    },
    {
      name: 'keywords',
      content: [post.category, ...(post?.tags || [])].join(', ')
    }
  ];
};

export const tagMeta: MetaFunction = ({ matches, params }) => {
  const title = matches[0].meta.find((x) => x.title)?.title;
  const key = decodeURIComponent(params.slug);
  const parentMeta = matches.flatMap((match) => match.meta ?? []).filter((meta) => !('title' in meta));
  return [
    ...parentMeta,
    {
      title: `${key} | ${title}`
    }
  ];
};
