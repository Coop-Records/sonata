import Feed from '@/components/Feed';
import getCombinedFeeds from '@/lib/neynar/getCombinedFeeds';

export default async function Recent() {
  const feed = await getCombinedFeeds();
  feed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <main>
      <div className="container flex justify-center py-12 font-helvetica bg-blend-color-burn">
        {feed?.length > 0 && <Feed feed={feed} />}
      </div>
    </main>
  );
}
