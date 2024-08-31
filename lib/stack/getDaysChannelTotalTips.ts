import { eventTipChannel } from "./events";
import getDaysEvents from "./getDaysEvents";

async function getDaysChannelTotalTips(channelId: string, daysAgo = 7) {
  const events = await getDaysEvents(eventTipChannel(channelId), daysAgo);

  return events.reduce((prev, curr) => prev + curr.points, 0);
}

export default getDaysChannelTotalTips;