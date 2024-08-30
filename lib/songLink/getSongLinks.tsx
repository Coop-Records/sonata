const getSongLinks = async (songLink: string) => {
  const endpoint = `https://api.song.link/v1-alpha.1/links?url=${songLink}&userCountry=US&songIfSingle=true`;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  } as any;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: headers,
    });
    const data = await response.json();
    return { response, data };
  } catch (error: any) {
    console.error(error?.message);
    return { error };
  }
};

export default getSongLinks;
