const getFeed = async (embedUrl: string) => {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json', api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY },
    next: {
      revalidate: 60,
    },
  } as any;

  try {
    const queryParams = new URLSearchParams({
      feed_type: 'filter',
      filter_type: 'embed_url',
      embed_url: embedUrl,
      with_recasts: 'false',
      limit: '22',
    });

    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/feed?${queryParams}`,
      options,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getFeed;
