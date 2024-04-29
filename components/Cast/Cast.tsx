import { Cast as CastType } from '@/types/Cast';
import AuthorDetails from './AuthorDetails';
import Upvote from './Upvote';
import findValidEmbed from '@/lib/findValidEmbed';
import TipButton from '../Tipping/Tip';
import { useMemo } from 'react';
import SpotifyEmbed from './SpotifyEmbed';
import SoundCloudEmbed from './SoundCloudEmbed';
import SoundXyzEmbed from './SoundXyzEmbed';

const Cast = ({ cast = {} as CastType }: { cast: CastType }) => {
  const embed = findValidEmbed(cast);
  const url = embed?.url;

  const { author } = cast;
  const { verifications } = author;

  const EmbedComponent = useMemo(() => {
    if (!url) return null;
    if (url.includes('spotify')) return SpotifyEmbed;
    if (url.includes('soundcloud')) return SoundCloudEmbed;
    if (url.includes('sound.xyz')) return SoundXyzEmbed;
  }, [url]);

  if (!url) return <></>;

  return (
    <div className="flex items-center gap-5 p-2.5">
      <Upvote cast={cast} />
      <div className="w-full space-y-4">
        <AuthorDetails author={author} />
        {EmbedComponent && <EmbedComponent trackUrl={url} />}
        <TipButton verifications={verifications} />
      </div>
    </div>
  );
};

export default Cast;
