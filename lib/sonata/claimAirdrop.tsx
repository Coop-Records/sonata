import { isNil } from 'lodash';

const claimAirdrop = async (
  signer_uuid: string | undefined,
  wallet_address: string,
): Promise<any> => {
  try {
    if (isNil(signer_uuid)) throw Error('Invalid Signer');
    const body = {
      signer_uuid,
      wallet_address,
    };
    const stringifiedBody = JSON.stringify(body);
    const res = await fetch('/api/claimAirdrop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: stringifiedBody,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return { message: 'Airdrop Failed' };
  }
};

export default claimAirdrop;
