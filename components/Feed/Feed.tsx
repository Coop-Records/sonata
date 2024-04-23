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

  if (!(feed && feed.length)) return <></>;

  const filteredFeed: any = useMemo(
    () => feed.filter((cast: CastType) => findValidEmbed(cast, filter)),
    [filter.platform],
  );

  return (
    <div className="flex items-start gap-10">
      <div className="max-w-[333px] md:max-w-[444px]">
        {filteredFeed.map((cast: CastType) => (
          <Cast key={cast.hash} cast={cast} />
        ))}
      </div>
      <Filter onChange={handleFilterChange} value={filter} />
    </div>
  );
}
