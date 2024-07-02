'use client';
import UserDetails from '@/components/UserDetails';
import findValidEmbed from '@/lib/findValidEmbed';
import TipButton from '@/components/TipButton';
import { SupabasePost } from '@/types/SupabasePost';
import fetchMetadata from '@/lib/fetchMetadata';
import MediaPlayer from '../MediaPlayer';
import { useEffect, useState } from 'react';
import { TrackMetadata } from '@/types/Track';
import Like from './Like';
import Share from './Share';
import { Separator } from '@/components/ui/separator';
import { timeFromNow } from '@/lib/utils';
import UpvoteDownvote from '../UpvoteDownvote';
import { isNil } from 'lodash';
import CollectButton from './CollectButton';
import { EmbedUrl } from '@neynar/nodejs-sdk/build/neynar-api/v2';

const Cast = ({ cast = {} as SupabasePost }: { cast: SupabasePost }) => {
  const embed = findValidEmbed(cast);
  const { url } = embed as EmbedUrl;
  const isCollectible = url?.includes('sound.xyz') || url?.includes('zora.co');
  const { author } = cast;
  const { verifications } = author;
  const [metadata, setMetadata] = useState<TrackMetadata>();

  useEffect(() => {
    const init = async () => {
      if (url) {
        try {
          const metadata = await fetchMetadata(url, cast);
          setMetadata(metadata);
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
    <div className="w-full space-y-4 ">
      <div className="flex gap-2">
        <UserDetails user={author} hasHypersub={!isNil(cast.hypersub_subscribed_since)} />
        <span className="text-sm leading-none text-muted-foreground">
          {'• '}
          {timeFromNow(cast.created_at)}
        </span>
      </div>

      <MediaPlayer metadata={metadata} />
      <div className="flex gap-2">
        <UpvoteDownvote verifications={verifications} cast={cast} />
        {isCollectible && <CollectButton collectUrl={url} />}
        <TipButton verifications={verifications} cast={cast} currency="DEGEN" className="ml-auto" />
        <Like cast={cast} />
        <Share cast={cast} />
      </div>
      <Separator className="bg-muted" />
    </div>
  );
};

export default Cast;
