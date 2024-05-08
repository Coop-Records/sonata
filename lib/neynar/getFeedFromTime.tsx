const getFeedFromTime = async (embedUrl: string, date: Date) => {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json', api_key: process.env.NEYNAR_API_KEY },
  } as any;

  const entries = [];
  let hitEndDate = false;
  try {
    const queryParams = new URLSearchParams({
      feed_type: 'filter',
      filter_type: 'embed_url',
      embed_url: embedUrl,
      with_recasts: 'false',
      limit: '100',
      cachebust: `${new Date().getTime()}`, // Adding a cache busting parameter
    });

    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/feed?${queryParams.toString()}`,
      options,
    );
    let data = await response.json();

    for (const entry of data.casts) {
      console.log(
        'neynar::getFeedFromTime',
        embedUrl,
        `post timestamp: ${new Date(entry.timestamp)} compared to ${date}`,
      );
      if (new Date(entry.timestamp) > date) {
        if (entry.author.power_badge === true) {
          entries.push(entry);
        }
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
        console.log(
          'neynar::getFeedFromTime',
          embedUrl,
          `post timestamp: ${new Date(entry.timestamp)} compared to ${date}`,
        );
        if (new Date(entry.timestamp) > date) {
          if (entry.author.power_badge === true) {
            entries.push(entry);
          }
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
