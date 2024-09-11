import setupNewTokenEventMatchesSong from '@/lib/stack/setupNewTokenEventMatchesSong';
import { Address } from 'viem';

export interface SetupNewTokenEvent {
  metadata: {
    tokenId: string;
    chainId: number;
    collection: Address;
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
