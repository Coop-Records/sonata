'use server';
const getSongLinks = async (songLink: string) => {
  const endpoint = `https://api.song.link/v1-alpha.1/links?url=${songLink}&userCountry=US&songIfSingle=true`;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  } as any;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: headers,
  });
  if (!response.ok) {
    console.error(response.status, response.statusText);
    throw new Error();
  }
  const data = await response.json();
  return data;
};

export default getSongLinks;
