import { useRouteLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';

export function useLoginInfo() {
  const { user } = useRouteLoaderData('root');
  const [following, setFollowing] = useState(false);
  const vip = user && (user?.type === 'admin' || user?.type === 'vip');
  useEffect(() => {
    if (vip) {
      setFollowing(true);
      return;
    }
    if (user) {
      const username = user.thirdparty?.find((x) => x.provider === 'github')?.username || '';
      fetch(`https://api.github.com/users/${username}/following/willin`)
        .then((res) => {
          if (res.status === 204) {
            setFollowing(true);
          }
        })
        .catch(() => {});
    }
  }, [user, vip]);

  return {
    vip,
    following
  };
}
