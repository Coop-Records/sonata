const fetchSoundGraphQL = async (query: any, variables = {}) => {
  const endpoint = 'https://api.sound.xyz/graphql';
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Sound-Client-Key': process.env.NEXT_PUBLIC_SOUND_API_KEY,
  } as any;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.errors) {
        console.error('GraphQL Errors:', data.errors);
        return null;
      }

      return data.data;
    } else {
      console.error(response.status, response.statusText);
      return null;
    }
  } catch (error: any) {
    console.error(error?.message);
    return null;
  }
};

export default fetchSoundGraphQL;
