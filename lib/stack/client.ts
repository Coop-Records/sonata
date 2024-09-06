import {StackClient} from "@stackso/js-core";

export const createStackClient = (pointSystemId: number) => new StackClient({
  apiKey: process.env.STACK_API_KEY as string, 
  pointSystemId,
});

export const stack = createStackClient(parseInt(process.env.STACK_POINT_SYSTEM_ID as string, 10));
export const rewardStack = createStackClient(parseInt(process.env.REWARDS_DEPOSIT_POINT_SYSTEM_ID as string, 10))