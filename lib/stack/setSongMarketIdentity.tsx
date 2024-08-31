import { songMarketStack } from './client';

export interface SongMarketIdentityMetadata {
  trackName: string;
  artworkUrl: string;
}

async function setSongMarketIdentity(
  account: string,
  metadata: SongMarketIdentityMetadata,
  songLink: string,
) {
  await songMarketStack.setIdentity(account, {
    identity: metadata.trackName,
    pfpUrl: metadata.artworkUrl,
    externalUrl: `https://sonata.tips/song/${songLink}`,
  });
}

export default setSongMarketIdentity;
