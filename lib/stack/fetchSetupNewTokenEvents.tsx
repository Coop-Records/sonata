import { songMarketStack } from './client';

async function fetchSetupNewTokenEvents() {
  const query = songMarketStack
    .eventsQuery()
    .where({ eventType: 'SetupNewToken' })
    .limit(200)
    .build();

  return songMarketStack.getEvents({ query });
}

export default fetchSetupNewTokenEvents;
