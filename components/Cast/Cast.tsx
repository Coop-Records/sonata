'use client';
import UserDetails from '@/components/UserDetails';
import findValidEmbed from '@/lib/findValidEmbed';
import { SupabasePost } from '@/types/SupabasePost';
import fetchMetadata from '@/lib/fetchMetadata';
import MediaPlayer from '../MediaPlayer';
import { useEffect, useState } from 'react';
import { TrackMetadata } from '@/types/Track';
import Share from './Share';
import { Separator } from '@/components/ui/separator';
import UpvoteDownvote from '../UpvoteDownvote';
import CollectButton from './CollectButton';
import { EmbedUrl } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import findCollectibleUrl from '@/lib/findCollectibleUrlInCastEmbeds';

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
        <UserDetails user={author} createdAt={cast.created_at} />
      </div>

      <MediaPlayer metadata={metadata} />
      <div className="flex gap-2">
        <UpvoteDownvote verifications={verifications} cast={cast} />
        {collectibleLink && <CollectButton collectUrl={collectibleLink} />}
        <Share cast={cast} className="ml-auto" />
      </div>
      <Separator className="bg-muted" />
    </div>
  );
};

export default Cast;
