import AuthorDetails from './AuthorDetails';
import Upvote from './Upvote';
import findValidEmbed from '@/lib/findValidEmbed';
import TipButton from '../Tipping/TipButton';
import { SupabasePost } from '@/types/SupabasePost';
import fetchMetadata from '@/lib/fetchMetadata';
import MediaPlayer from '../MediaPlayer';
import { useEffect, useState } from 'react';
import { TrackMetadata } from '@/types/Track';

const Cast = ({ cast = {} as SupabasePost }: { cast: SupabasePost }) => {
  const embed = findValidEmbed(cast);
  const url = embed?.url;

  const { author } = cast;
  const { verifications } = author;

  const [metadata, setMetadata] = useState<TrackMetadata>();

  useEffect(() => {
    const init = async () => {
      if (url) {
        try {
          const metadata = await fetchMetadata(url);
          setMetadata(metadata);
        } catch (error) {
          console.error(error);
        }
      }
    };
    init();
  }, [url]);

  if (!metadata) return <></>;
  return (
    <div className="flex items-center gap-5 p-2.5">
      <Upvote cast={cast} />
      <div className="w-full space-y-4">
        <AuthorDetails author={author} />
        <MediaPlayer metadata={metadata} />
        <TipButton verifications={verifications} cast={cast} />
      </div>
    </div>
  );
};

export default Cast;
