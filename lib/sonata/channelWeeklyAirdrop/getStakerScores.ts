import { eventStakeChannelFid } from "@/lib/stack/events";
import getDaysEvents from "@/lib/stack/getDaysEvents";
import { User } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import dayjs from "dayjs";
import getStackPoints from "../getStackPoints";

function getStakerScores(users: User[], channelId: string) {
  const DAILY_APR = .05 / 365;
  const today = new Date();

  return Promise.all(users.map(async user => {
    const event = eventStakeChannelFid(channelId, user.fid);

    const points = await getStackPoints(user.verifications, event);
    if (points >= 0) return null;
    const events = await getDaysEvents(event);

    const multiplier = events.reduceRight((prev, event, index) => {
      if (index === 0) prev.date = events[0].timestamp;
      const days = dayjs(event.timestamp).diff(prev.date, 'days', false);

      if (days > 0) {
        prev.date = event.timestamp;
        prev.score += prev.points * ((1 + DAILY_APR) ** days);
      }

      if (event.points < 0) prev.points += Math.abs(event.points);
      else if (event.points >= prev.points) prev.points = 0;
      else prev.points -= event.points;

      return prev;
    }, { date: new Date(), points: 0, score: 0 });

    const days = dayjs(today).diff(multiplier.date, 'days', false);

    if (days > 0)
      multiplier.score += multiplier.points * ((1 + DAILY_APR) ** days);

    return { fid: user.fid, score: Math.abs(points) + multiplier.score };
  }));
}

export default getStakerScores;