
const callPostApi = (signer_uuid: string, url: string) => {
  const body = {
    signer_uuid,
    url,
  };
  const stringifiedBody = JSON.stringify(body);

  return fetch('/api/postMusicEmbed', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: stringifiedBody,
  });
};

export default callPostApi;
