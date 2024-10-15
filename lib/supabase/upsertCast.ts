'use server';
import getChannelIdFromParentUrl from '@/lib/neynar/getChannelIdFromParentUrl';
import { type CastAdd } from '@standard-crypto/farcaster-js-hub-rest';
import serverClient from './serverClient';
import getDate from '@/lib/farcaster/getDate';
import getUserFromFid from '../farcaster/getUserFromFid';

async function upsertCast(cast: CastAdd) {
  const channelId = getChannelIdFromParentUrl(cast.data.castAddBody.parentUrl);

  const authorFid = cast.data.fid;
  const author = await getUserFromFid(authorFid);

  const { error, statusText } = await serverClient.from('posts').upsert(
    {
      post_hash: cast.hash,
      created_at: getDate(cast.data.timestamp),
      embeds: cast.data.castAddBody.embeds,
      author,
      channelId,
      authorFid,
    },
    {
      onConflict: 'post_hash',
    },
  );
  if (error) {
    throw new Error(error.message);
  }
  const link = `/cast/${author?.username}/${cast.hash.substring(0, 8)}`;
  console.log(statusText, 'cast(hash):', cast.hash);
  return { statusText, link };
}

export default upsertCast;
