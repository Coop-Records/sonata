'use client';
import Cast from '../Cast';
import { Cast as CastType } from '@/types/Cast';
import { useMemo } from 'react';
import findValidEmbed from '@/lib/findValidEmbed';
import { useFeedProvider } from '@/providers/FeedProvider';

export default function Feed({ feed }: any) {
  const { filter } = useFeedProvider();

  const feedSignature = useMemo(
    () => feed.map((cast: CastType) => `${cast.hash}_${cast.points}`).join('|'),
    [feed],
  );

  const filteredFeed: any = useMemo(
    () =>
      feed.filter((cast: CastType) => {
        if (filter.channel) {
          const parentUrl = cast.parent_url;
          if (!(parentUrl && parentUrl.includes(filter.channel))) return false;
        }
        const validEmbed = findValidEmbed(cast, { platform: filter.platform });
        if (!validEmbed) return false;

        return true;
      }),
    [filter.platform, filter.channel, feedSignature],
  );

  return (
    <div className="max-w-full grow space-y-6">
      {filteredFeed.map((cast: CastType) => (
        <Cast key={cast.hash} cast={cast} />
      ))}
    </div>
  );
}
