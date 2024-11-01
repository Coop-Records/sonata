'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import findValidEmbed from '@/lib/findValidEmbed';
import { SupabasePost } from '@/types/SupabasePost';
import fetchMetadata from '@/lib/fetchMetadata';
import MediaPlayer from '@/components/MediaPlayer';
import { useEffect, useState } from 'react';
import { TrackMetadata } from '@/types/Track';
import Share from './Share';
import UpvoteDownvote from '@/components/UpvoteDownvote';
import CollectButton from './CollectButton';
import { EmbedUrl } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import findCollectibleUrl from '@/lib/findCollectibleUrlInCastEmbeds';
import { timeFromNow } from '@/lib/utils';
import Image from 'next/image';
import { PLATFORM_ICONS } from '@/lib/consts';
import { Skeleton } from '@/components/ui/skeleton';

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
    <div className="w-full space-y-4 rounded-3xl border border-muted  px-6 py-4">
      <div className="flex items-center gap-2">
        <Link href={`/${author.username}`}>
          <Avatar className="size-4">
            <AvatarImage src={author.pfp_url} />
            <AvatarFallback>{author.display_name}</AvatarFallback>
          </Avatar>
        </Link>

        <span className="text-[10px] font-light text-muted-foreground">
          {author.display_name} posted {'• '}
          {timeFromNow(cast.created_at)}
        </span>
      </div>

      <MediaPlayer metadata={metadata} />
      <div className="flex items-center gap-6">
        <UpvoteDownvote verifications={verifications} cast={cast} />
        {collectibleLink && <CollectButton collectUrl={collectibleLink} />}
        <div className="relative ml-auto size-6 overflow-hidden rounded-full">
          {metadata?.type ? (
            <Image alt="" fill src={PLATFORM_ICONS[metadata.type]} style={{ objectFit: 'cover' }} />
          ) : (
            <Skeleton className="size-full" />
          )}
        </div>
        <Share cast={cast} />
      </div>
    </div>
  );
};

export default Cast;
