import { songMarketStack } from '@/lib/stack/client';
import { REFFERAL_ADDRESS } from '@/lib/consts';

async function getSongMarketCollection(songLinks: string[]) {
  const setupNewTokenEvents = await songMarketStack.getEvents({
    query: songMarketStack
      .eventsQuery()
      .where({
        eventType: 'SetupNewToken',
      })
      .limit(20)
      .build(),
  });

  const matchedEvent = setupNewTokenEvents.find((event) => {
    return (
      event.metadata?.songLinks &&
      Array.isArray(event.metadata.songLinks) &&
      event.metadata.songLinks.some((link: string) =>
        songLinks.some((sl) => link.includes(sl.split('?')[0])),
      )
    );
  });

  if (matchedEvent) {
    return {
      tokenId: matchedEvent.metadata.tokenId,
      chainId: matchedEvent.metadata.chainId,
      address: matchedEvent.metadata.collection,
      zora: `https://testnet.zora.co/collect/bsep:${matchedEvent.metadata.collection}/${matchedEvent.metadata.tokenId}?referrer=${REFFERAL_ADDRESS}`,
    };
  }

  return null;
}

export default getSongMarketCollection;
