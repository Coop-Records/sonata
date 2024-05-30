'use client';

import Cast from '@/components/Cast';
import getCastHash from '@/lib/neynar/getCastHash';
import { useSupabaseProvider } from '@/providers/SupabaseProvider';
import { SupabasePost } from '@/types/SupabasePost';
import { isEmpty, isNil } from 'lodash';
import { useEffect, useState } from 'react';

const SingleFeed = ({ username, hash }: { username: string; hash: string }) => {
  const { supabaseClient } = useSupabaseProvider();
  const [cast, setCast] = useState<SupabasePost | undefined>();

  useEffect(() => {
    if (isEmpty(supabaseClient) || !hash || !username) return;
    const getCast = async () => {
      const fullHash = await getCastHash(`https://warpcast.com/${username}/${hash}`);
      const { data } = await supabaseClient
        .from('posts')
        .select('*')
        .eq('post_hash', fullHash)
        .single();
      setCast(data);
    };
    getCast();
  }, [supabaseClient, hash, username]);

  return isNil(cast) ? <></> : <Cast cast={cast} />;
};

export default SingleFeed;
