import { useRouteLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';

export function useLoginInfo() {
  const { user } = useRouteLoaderData('root');
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/following/${AdminId}`)
      .then((res) => {
        if (res.status === 204) {
          setFollowing(true);
        }
      })
      .catch(() => {});
  }, [user]);

  return {
    vip: user.type === 'vip' || user.type === 'admin',
    following
  };
}
