import { Cast } from '@/types/Cast';
import { FeedFilter } from '@/types/Feed';
import findValidEmbed from './findValidEmbed';

export default function filterFeed(feed: Cast[], filter: FeedFilter) {
  return feed.filter((cast) => {
    if (filter.channel) {
      const parentUrl = cast.parent_url;
      if (!(parentUrl && parentUrl.includes(filter.channel))) return false;
    }
    const validEmbed = findValidEmbed(cast, { platform: filter.platform });
    if (!validEmbed) return false;

    return true;
  });
}
