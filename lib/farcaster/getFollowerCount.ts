'use server';

import farcasterClient from './client';

const getFollowerCount = async (fid: number) => {
  const links = farcasterClient.listLinksByTargetFid(fid);
  let count = 0;
  let link;
  do {
    link = await links.next();
    if (!link.done) {
      count++;
    }
  } while (!link.done);

  return count;
};

export default getFollowerCount;
