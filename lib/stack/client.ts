import { StackClient } from '@stackso/js-core';
import { REWARDS_DEPOSIT_POINT_SYSTEM_ID, SETTINGS_STACK_ID } from '../consts';

export const createStackClient = (pointSystemId: number) =>
  new StackClient({
    apiKey: process.env.STACK_API_KEY as string,
    pointSystemId,
  });

export const stack = createStackClient(parseInt(process.env.STACK_POINT_SYSTEM_ID as string, 10));
export const rewardStack = createStackClient(REWARDS_DEPOSIT_POINT_SYSTEM_ID);
export const settingsStack = createStackClient(SETTINGS_STACK_ID);
