import dayjs from "dayjs";
import { stack } from "./client";
import { StackEvent } from "@/types/Stack";

async function getDaysEvents(event: string, daysAgo = 7) {
  let offset = 0;
  const limit = 100;
  const today = new Date();
  const events: StackEvent[] = [];

  mainLoop: do {
    const results: StackEvent[] = await stack.getEvents({ event, offset, limit });

    for (const event of results) {
      const days = dayjs(today).diff(event.timestamp, "days", true);

      if (days > daysAgo) break mainLoop;
      events.push(event);
    }

    if (results.length < limit) break;
    offset += 100;
  } while (true);

  return events;
}

export default getDaysEvents;