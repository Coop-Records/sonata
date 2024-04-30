'use client';
import Cast from '../Cast';
import { Cast as CastType } from '@/types/Cast';
import Filter from './Filter';
import { useMemo, useState } from 'react';
import findValidEmbed from '@/lib/findValidEmbed';
import { FeedFilter } from '@/types/FeedFilter';

export default function Feed({ feed }: any) {
  const [filter, setFilter] = useState<FeedFilter>({});

  const handleFilterChange = (change: any) => {
    setFilter((prev) => ({ ...prev, ...change }));
  };

  const feedSignature = useMemo(
    () => feed.map((cast: CastType) => `${cast.hash}_${cast.points}_${cast.degen}`).join('|'),
    [feed],
  );

  const filteredFeed: any = useMemo(
    () => feed.filter((cast: CastType) => findValidEmbed(cast, filter)),
    [filter.platform, feedSignature],
  );

  return (
    <div className="flex w-full max-w-4xl items-start md:gap-10">
      <div className="max-w-full grow space-y-6">
        {filteredFeed.map((cast: CastType) => (
          <Cast key={cast.hash} cast={cast} />
        ))}
      </div>
      <div className="max-md:hidden">
        <Filter onChange={handleFilterChange} value={filter} />
      </div>
    </div>
  );
}
