import { TipResponse } from '@/types/TipResponse';

const executeTip = async (signer_uuid: string | undefined, amount: bigint, postHash: string) => {
  try {
    const res = await fetch('/api/tip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        signer_uuid,
        tipAmount: amount,
        postHash,
      }),
    });
    const data = (await res.json()) as TipResponse;
    return data;
  } catch (error) {
    console.error(error);
    return { error: 'Unable to tip' };
  }
};

export default executeTip;
