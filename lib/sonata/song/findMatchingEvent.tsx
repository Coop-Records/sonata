import setupNewTokenEventMatchesSong from '@/lib/stack/setupNewTokenEventMatchesSong';

export interface SetupNewTokenEvent {
  metadata: {
    tokenId: string;
    chainId: number;
    collection: `0x${string}`;
    songLinks: string[];
  };
}

function findMatchingEvent(
  events: SetupNewTokenEvent[],
  songLinks: string[],
): SetupNewTokenEvent | undefined {
  return events.find((event) => setupNewTokenEventMatchesSong(event, songLinks));
}

export default findMatchingEvent;
