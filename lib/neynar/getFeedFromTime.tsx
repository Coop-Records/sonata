const getFeedFromTime = async (embedUrl: string, date: Date) => {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json', api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY },
  } as any;

  const entries = [];
  let hitEndDate = false;
  try {
    const queryParams = new URLSearchParams({
      feed_type: 'filter',
      filter_type: 'embed_url',
      embed_url: embedUrl,
      with_recasts: 'true',
      limit: '100',
    });

    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/feed?${queryParams}`,
      options,
    );
    let data = await response.json();

    for (const entry of data.casts) {
      if (new Date(entry.timestamp) > date) {
        entries.push(entry);
      } else {
        hitEndDate = true;
        break;
      }
    }

    while (!hitEndDate && data.next && data.next.cursor) {
      queryParams.set('cursor', data.next.cursor);

      const response = await fetch(
        `https://api.neynar.com/v2/farcaster/feed?${queryParams}`,
        options,
      );
      data = await response.json();

      for (const entry of data.casts) {
        if (new Date(entry.timestamp) > date) {
          entries.push(entry);
        } else {
          hitEndDate = true;
          break;
        }
      }
    }

    return entries;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getFeedFromTime;
