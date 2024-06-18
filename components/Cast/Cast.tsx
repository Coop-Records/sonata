'use client';
import UserDetails from '@/components/UserDetails';
import findValidEmbed from '@/lib/findValidEmbed';
import TipButton from '@/components/TipButton';
import { SupabasePost } from '@/types/SupabasePost';
import fetchMetadata from '@/lib/fetchMetadata';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import MediaPlayer from '../MediaPlayer';
import { useEffect, useState } from 'react';
import { TrackMetadata } from '@/types/Track';
import Like from './Like';
import Share from './Share';
import { Separator } from '@/components/ui/separator';
import { timeFromNow, formatBigInt } from '@/lib/utils';
import UpvoteDownvote from '../UpvoteDownvote';
import { isNil } from 'lodash';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import BaseInfo from '../MediaObject/BaseProfile';





const Cast = ({ cast = {} as SupabasePost }: { cast: SupabasePost }) => {

  const pathname = location.pathname;

  const embed = findValidEmbed(cast);
  const url = embed?.url;

  const logos = {
    DEGEN: '/images/degenchain.png',
    NOTES: '/images/notes.png',
  };
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
  }, [url]);

  if (!metadata) return <></>;
  if(pathname.includes("/cast/")){
    return (
      <div className="w-full space-y-4 ">
        <div className="flex gap-2">
          <div className="flex space-x-3">
            <a href={`/channel/${cast.channelId}`}>
              <Avatar className="size-8">
                <AvatarImage src={author.pfp_url} />
                <AvatarFallback>{author.display_name}</AvatarFallback>
              </Avatar>
            </a>
            <div className="flex flex-col gap-1 justify-center">
              <div className="flex flex-row items-center align-middle">
                <a
                  href={`/channel/${cast.channelId}`}
                  target="_blank"
                  className="text-xl font-semibold leading-none"
                >
                  /{cast.channelId}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div data-type={metadata?.type} className="flex w-full gap-4 bg-white py-2">
          <div className="relative my-auto aspect-square w-32 shrink-0 overflow-hidden rounded-lg shadow-md">
            {metadata?.artworkUrl ? (
              <Image
                src={metadata.artworkUrl}
                alt=""
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                unoptimized
              />
            ) : (
              <Skeleton className="size-full" />
            )}
          </div>

          <div className="flex grow flex-col justify-center gap-1 text-left">
            <div className="line-clamp-2 text-lg  font-semibold leading-none">
              {metadata?.trackName ? (
                <>{metadata.trackName}</>
              ) : (
                <Skeleton className="h-2 w-32 rounded-sm" />
              )}
            </div>
            <div className="line-clamp-2 text-sm font-extralight">
              {metadata?.artistName ? (
                <>{metadata.artistName}</>
              ) : (
                <Skeleton className="h-2 w-12 rounded-sm" />
              )}
            </div>
          </div>
          <div className="my-auto rounded-2xl bg-grey-light  px-8 md:py-6">
            <div className="flex">
              <span className="font-bold ">{formatBigInt(BigInt(cast.points || 0))}</span>
              <Image src={logos.NOTES} width={16} height={16} alt="" />
            </div>
            Notes Collected
          </div>
        </div>

        <span className="line-clamp-2 text-sm font-medium">Posted By</span>

        <div className="flex gap-2">
          <BaseInfo profile={author}></BaseInfo>
        </div>
        <Separator className="bg-muted" />
      </div>
    )
  }
  else{
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
          <TipButton verifications={verifications} cast={cast} currency="DEGEN" className="ml-auto" />
          <Like cast={cast} />
          <Share cast={cast} />
        </div>
        <Separator className="bg-muted" />
      </div>
    );
  }
  

 
  // debugger
 
};

export default Cast;
