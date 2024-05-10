import { TipResponse } from '@/types/TipResponse';
import { isNil } from 'lodash';

const executeTip = async (
  signer_uuid: string | undefined,
  amount: bigint,
  postHash: string,
  recipientFid: number,
): Promise<TipResponse> => {
  try {
    if (isNil(signer_uuid)) throw Error('Invalid Signer');
    const res = await fetch('/api/tip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        signer_uuid,
        tipAmount: amount,
        postHash,
        recipientFid,
      }),
    });
    const data = (await res.json()) as TipResponse;
    return data;
  } catch (error) {
    console.error(error);
    return { message: 'Tip Failed', usedTip: 0, tipRemaining: 0, totalTipOnPost: 0 };
  }
};

export default executeTip;
