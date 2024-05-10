const getSortedFeed = (feed: any[], type: string) => {
  if (type === 'Trending') {
    return feed.sort((a, b) => b.likes - a.likes);
  } else if (type === 'Recent') {
    return feed.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
  return feed;
};

export default getSortedFeed;
