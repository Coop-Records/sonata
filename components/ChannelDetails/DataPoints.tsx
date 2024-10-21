import formatNumber from '@/lib/formatNumber';
import { cn } from '@/lib/utils';
import { TrackMetadata } from '@/types/Track';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import fetchMetadata from '@/lib/fetchMetadata';
import findValidEmbed from '@/lib/findValidEmbed';

function DataPoints({ channel }: { channel: any }) {
  const [topSongMetadata, setTopSongMetadata] = useState<TrackMetadata>();

  useEffect(() => {
    const fetchTopSongMetadata = async () => {
      const topSong = channel.topSong;
      if (topSong) {
        const embed = findValidEmbed(topSong);
        const metadata = embed ? await fetchMetadata(embed.url, topSong) : undefined;
        setTopSongMetadata(metadata);
      }
    };

    fetchTopSongMetadata();
  }, [channel.topSong]);

  return (
    <div className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-3">
      <div className="grid grid-cols-[auto_1fr] gap-x-1">
        <span className="font-sora text-base/[17px] font-semibold">
          {formatNumber(channel.balance)}
        </span>
        <Image src="/images/notes.png" width={16} height={16} alt="notes" />
        <span className="col-span-full text-sm text-grey">Balance</span>
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-x-1">
        <span className="font-sora text-base/[17px] font-semibold">
          {formatNumber(channel.staking.staked)}
        </span>
        <Image src="/images/notes.png" width={16} height={16} alt="notes" />
        <span className="col-span-full text-sm text-grey">Staked</span>
      </div>

      <div>
        <p className="font-sora text-base/[17px] font-semibold">
          {formatNumber(channel.staking.stakers)}
        </p>
        <p className="col-span-full text-sm text-grey">Stakers</p>
      </div>

      {topSongMetadata && (
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-1">
          <Image
            className="size-6 rounded-md object-cover"
            src={topSongMetadata?.artworkUrl ?? ''}
            width={24}
            height={24}
            alt="song"
          />
          <span className="max-w-20 truncate font-sora text-base/[17px] font-semibold">
            {topSongMetadata?.trackName ?? '-'}
          </span>
          <span className="col-span-full text-sm text-grey">Top Song</span>
        </div>
      )}

      {channel.moderators.length > 0 && (
        <div>
          <div className="flex">
            {channel.moderators.map((moderator: any, i: number) => (
              <Image
                key={moderator.fid}
                src={moderator.pfp_url}
                width={24}
                height={24}
                alt={moderator.display_name}
                className={cn('size-6 rounded-3xl', { 'translate-x-[-8px]': i == 1 })}
              />
            ))}
          </div>
          <p className="col-span-full text-sm/4 text-grey">Moderators</p>
        </div>
      )}
    </div>
  );
}

export default DataPoints;
