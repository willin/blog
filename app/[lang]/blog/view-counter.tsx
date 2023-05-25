'use client';
import { useEffect } from 'react';
import useSWR from 'swr';

type PostView = {
  slug: string;
  count: string;
};

async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, {
    ...init,
    method: 'POST'
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.json();
}

export default function ViewCounter({ slug, trackView, label }: { slug: string; trackView: boolean; label: string }) {
  const { data } = useSWR<PostView[]>('/api/views', fetcher);
  const viewsForSlug = data && data.find((view) => view.slug === slug);
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

  return (
    <p className='font-mono text-sm text-neutral-500 tracking-tighter'>
      {data ? `${views.toLocaleString()} ${label}` : '​'}
    </p>
  );
}
