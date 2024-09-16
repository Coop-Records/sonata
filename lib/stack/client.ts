import { StackClient } from '@stackso/js-core';
import { SONG_MARKET_POINT_SYSTEM_ID } from '../consts';

const getStackClient = (pointSystemId: number) => {
  return new StackClient({
    apiKey: process.env.STACK_API_KEY as string,
    pointSystemId: pointSystemId,
  });
};

export const stack = getStackClient(Number(process.env.STACK_SYSTEM_ID));
export const songMarketStack = getStackClient(SONG_MARKET_POINT_SYSTEM_ID);

export default getStackClient;
