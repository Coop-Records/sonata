import { StackClient } from '@stackso/js-core';

const getStackClient = (pointSystemId: number) => {
  return new StackClient({
    apiKey: process.env.STACK_API_KEY as string,
    pointSystemId: pointSystemId,
  });
};

export const stack = getStackClient(Number(process.env.STACK_SYSTEM_ID))

export default getStackClient;