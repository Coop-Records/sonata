import Feed from '@/components/Feed';
import getCombinedFeeds from '@/lib/neynar/getCombinedFeeds';

export default async function Recent() {
  const feed = await getCombinedFeeds();
  feed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return feed?.length > 0 && <Feed feed={feed} />;
}
