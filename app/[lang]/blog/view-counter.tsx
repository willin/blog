'use client';
import { useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '../use-login';

type PostView = {
  slug: string;
  count: string;
};

export default function ViewCounter({ slug, trackView, label }: { slug: string; trackView: boolean; label: string }) {
  const { data } = useSWR<PostView[]>('/api/views', fetcher);
  const viewsForSlug = data !== undefined && data?.find((view) => view.slug === slug);
  const views = new Number(viewsForSlug?.count || 0);

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST'
      });

    if (trackView) {
      void registerView();
    }
  }, [slug]);

  // eslint-disable-next-line no-irregular-whitespace
  return <>{data ? `${views.toLocaleString()} ${label}` : `0 ${label}​`}</>;
}
