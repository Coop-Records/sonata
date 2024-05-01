import { TipResponse } from '@/types/TipResponse';
import { isNil } from 'lodash';

const executeDegenTip = async (
  walletAddress: string,
  signer_uuid: string | undefined,
  amount: bigint,
  postHash: string,
): Promise<TipResponse> => {
  try {
    if (isNil(signer_uuid)) throw Error('Invalid Signer');
    const res = await fetch('/api/degenTip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        signer_uuid,
        tipAmount: amount,
        postHash,
        walletAddress,
      }),
    });
    const data = (await res.json()) as TipResponse;
    return data;
  } catch (error) {
    console.error(error);
    return { message: 'Tip Failed', usedTip: 0, tipRemaining: 0, totalTipOnPost: 0 };
  }
};

export default executeDegenTip;
