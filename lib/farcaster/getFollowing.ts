'use server';

import farcasterClient from './client';

const getFollowing = async (fid: number) => {
  const following = [];
  const links = farcasterClient.listLinksByFid(fid);
  let link;
  do {
    link = await links.next();
    if (!link.done) {
      following.push(link.value.data.linkBody.targetFid);
    }
  } while (!link.done);

  return following;
};

export default getFollowing;
