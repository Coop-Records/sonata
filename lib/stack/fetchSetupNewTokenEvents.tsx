import { songMarketStack } from './client';

async function fetchSetupNewTokenEvents() {
  const query = songMarketStack
    .eventsQuery()
    .where({ eventType: 'SetupNewToken' })
    .limit(20)
    .build();

  return songMarketStack.getEvents({ query });
}

export default fetchSetupNewTokenEvents;
