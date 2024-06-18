import { StackClient } from '@stackso/js-core';

export const stack = new StackClient({
  apiKey: process.env.STACK_API_KEY as string,
  pointSystemId: Number(process.env.STACK_SYSTEM_ID),
});
