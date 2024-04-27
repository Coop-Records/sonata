import { StackClient } from '@stackso/js-core';
import { useEffect, useState } from 'react';

const useStack = () => {
  const [stackClient, setStackClient] = useState<StackClient | undefined>(undefined);

  useEffect(() => {
    const init = async () => {
      const stack = new StackClient({
        apiKey: process.env.NEXT_PUBLIC_STACK_API_KEY as string,
        pointSystemId: Number(process.env.NEXT_PUBLIC_STACK_SYSTEM_ID),
      });
      setStackClient(stack);
    };
    init();
  }, []);

  return { stackClient };
};

export default useStack;
