import fetchSetupNewTokenEvents from '@/lib/stack/fetchSetupNewTokenEvents';
import createCollectionObject, { CollectionObject } from './createCollectionObject';
import findMatchingEvent from './findMatchingEvent';

async function getSongMarketCollection(songLinks: string[]): Promise<CollectionObject | null> {
  const setupNewTokenEvents = await fetchSetupNewTokenEvents();
  console.log('SWEETS setupNewTokenEvents', setupNewTokenEvents[0].metadata);
  console.log('SWEETS songLinks', songLinks);
  const matchedEvent = findMatchingEvent(setupNewTokenEvents, songLinks);
  return matchedEvent ? createCollectionObject(matchedEvent) : null;
}

export default getSongMarketCollection;
