'use server';
const fetchSoundGraphQL = async (query: any, variables = {}) => {
  const endpoint = 'https://api.sound.xyz/graphql';
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Sound-Client-Key': process.env.SOUND_API_KEY,
  } as any;

  const { data, errors } = await fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  }).then((res) => res.json());

  if (errors) {
    throw new Error('Something went wrong');
  }

  return data;
};

export default fetchSoundGraphQL;
