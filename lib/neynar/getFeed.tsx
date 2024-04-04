const getFeed = async (embedUrl: string) => {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json', api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY },
  } as any;

  try {
    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/feed?feed_type=filter&filter_type=embed_url&embed_url=${embedUrl}&with_recasts=true&limit=10`,
      options,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default getFeed;
