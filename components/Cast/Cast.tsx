'use client';
import UserDetails from '@/components/UserDetails';
import findValidEmbed from '@/lib/findValidEmbed';
import { SupabasePost } from '@/types/SupabasePost';
import fetchMetadata from '@/lib/fetchMetadata';
import MediaPlayer from '../MediaPlayer';
import { useEffect, useState } from 'react';
import { TrackMetadata } from '@/types/Track';
import Share from './Share';
import UpvoteDownvote from '../UpvoteDownvote';
import CollectButton from './CollectButton';
import { EmbedUrl } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import findCollectibleUrl from '@/lib/findCollectibleUrlInCastEmbeds';
import Image from 'next/image';
import { PLATFORM_ICONS } from '@/lib/consts';
import Icon from '../ui/icon';
import { Progress } from '../ui/progress';

const Cast = ({ cast = {} as SupabasePost }: { cast: SupabasePost }) => {
  const embed = findValidEmbed(cast);
  const { url } = embed as EmbedUrl;
  const collectibleLink = findCollectibleUrl(cast.embeds);
  const { author } = cast;
  const { verifications } = author;
  const [metadata, setMetadata] = useState<TrackMetadata>();

  useEffect(() => {
    const init = async () => {
      if (url) {
        try {
          const metadata = await fetchMetadata(url, cast);
          setMetadata({
            ...metadata,
            channelId: cast.channelId,
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  if (!metadata) return <></>;

  return (
    <div className="w-full space-y-4 border rounded-xl p-3">
      <div className="flex gap-2">
        <UserDetails user={author} createdAt={cast.created_at} />
      </div>

      <MediaPlayer metadata={metadata} />
      <div className="flex gap-2">
        <UpvoteDownvote verifications={verifications} cast={cast} />
        <div className="flex gap-1 items-center">
          <Icon name="lock" className="text-grey size-4" />
          <p className="text-xs text-grey">20%</p>
          <Progress value={20} className="w-20 h-2" />
        </div>
        {collectibleLink && <CollectButton collectUrl={collectibleLink} />}
        <div className="flex flex-grow justify-end gap-4">
          <Image src={PLATFORM_ICONS[metadata.type]} alt="" width={16} height={16} />
          <Share cast={cast} />
        </div>
      </div>
    </div>
  );
};

export default Cast;
