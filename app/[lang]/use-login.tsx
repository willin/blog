'use client';
import useSWR, { preload } from 'swr';
import { AdminId } from '@/lib/config';
import { useEffect, useState } from 'react';

export async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.json();
}

export function useLoginInfo() {
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const { data } = useSWR<{ username: string; vip: boolean }>('/api/me', fetcher);
  const { username, vip = false } = data || {};

  useEffect(() => {
    if (username != undefined) {
      setLoading(false);
    }
    if (!username) {
      return;
    }
    if (username === AdminId) {
      setFollowing(true);
      return;
    }
    fetch(`https://api.github.com/users/${username}/following/${AdminId}`)
      .then((res) => {
        if (res.status === 204) {
          setFollowing(true);
        }
      })
      .catch(() => {});
  }, [username]);

  return {
    loading,
    username,
    vip,
    following
  };
}

// void preload('/api/me', fetcher);
