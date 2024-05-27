const getFeed = async (embedUrl: string) => {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json' },
    next: {
      revalidate: 60,
    },
  } as any;

  try {
    const queryParams = new URLSearchParams({
      embedUrl,
    });

    const response = await fetch(`/api/neynar/getFeed?${queryParams}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getFeed;
