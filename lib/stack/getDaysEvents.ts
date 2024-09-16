import dayjs from 'dayjs';
import { stack } from './client';
import { Event } from '@stackso/js-core';

async function getDaysEvents(event: string, daysAgo = 7) {
  let offset: number | null = 0;
  const limit = 100;
  const today = new Date();
  const events: Event[] = [];

  mainLoop: do {
    const results: Event[] = await stack.getEvents({
      query: stack
        .eventsQuery()
        .where({
          eventType: event,
        })
        .limit(limit)
        .offset(offset)
        .build(),
    });

    for (const event of results) {
      const days = dayjs(today).diff(event.timestamp, 'days', true);

      if (days > daysAgo) break mainLoop;
      events.push(event);
    }

    offset += 100;
    if (results.length < limit) offset = null;
  } while (offset !== null);

  return events;
}

export default getDaysEvents;
