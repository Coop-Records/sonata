import { isNil } from 'lodash';

const callPostApi = async (signer_uuid: string | undefined, url: string): Promise<any> => {
  try {
    if (isNil(signer_uuid)) throw Error('Invalid Signer');
    const body = {
      signer_uuid,
      url,
    };
    const stringifiedBody = JSON.stringify(body);
    const res = await fetch('/api/postMusicEmbed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: stringifiedBody,
    });
    await fetch('/api/jobs/getNewCasts');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return { message: 'Cast Failed' };
  }
};

export default callPostApi;
