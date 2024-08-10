import {StackClient} from "@stackso/js-core";

const createClient = (pointSystemId: number) => new StackClient({
  apiKey: process.env.STACK_API_KEY as string, 
  pointSystemId,
});

export const stack = createClient(parseInt(process.env.STACK_POINT_SYSTEM_ID as string, 10));
export const rewardStack = createClient(parseInt(process.env.REWARDS_DEPOSIT_POINT_SYSTEM_ID as string, 10))