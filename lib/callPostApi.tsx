import { isNil } from 'lodash';

const callPostApi = async (signer_uuid: string | undefined, url: string): Promise<any> => {
  try {
    console.log('SWEETS isNil(signer_uuid)', isNil(signer_uuid));
    if (isNil(signer_uuid)) throw Error('Invalid Signer');
    const body = {
      signer_uuid,
      url,
    };
    console.log('SWEETS signer_uuid', signer_uuid);
    console.log('SWEETS body', body);
    const stringifiedBody = JSON.stringify(body);
    console.log('SWEETS stringifiedBody', body);

    const res = await fetch('/api/postMusicEmbed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: stringifiedBody,
    });
    console.log('SWEETS res', res);

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return { message: 'Tip Failed', usedTip: 0, tipRemaining: 0, totalTipOnPost: 0 };
  }
};

export default callPostApi;
