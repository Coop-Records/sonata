import Feed from '@/components/Feed';
import getCombinedFeeds from '@/lib/neynar/getCombinedFeeds';

export default async function Recent() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  const feed = await getCombinedFeeds();
  feed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return feed?.length > 0 && <Feed feed={feed} />;
}
