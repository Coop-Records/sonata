import { Cast as CastType } from '@/types/Cast';
import AuthorDetails from './AuthorDetails';
import Upvote from './Upvote';
import findValidEmbed from '@/lib/findValidEmbed';
import { useMemo } from 'react';
import SpotifyEmbed from './SpotifyEmbed';
import SoundCloudEmbed from './SoundCloudEmbed';
import SoundXyzEmbed from './SoundXyzEmbed';

const Cast = ({ cast = {} as CastType }: { cast: CastType }) => {
  const embed = findValidEmbed(cast);

  const url = embed?.url;

  const EmbedComponent = useMemo(() => {
    if (!url) return null;
    if (url.includes('spotify')) return SpotifyEmbed;
    if (url.includes('soundcloud')) return SoundCloudEmbed;
    if (url.includes('sound.xyz')) return SoundXyzEmbed;
  }, [url]);

  if (!url) return <></>;

  return (
    <div className="flex gap-5 p-2.5 items-center">
      <Upvote cast={cast} />
      <div className="space-y-4 w-full">
        <AuthorDetails pfpUrl={cast.author.pfp_url} displayName={cast.author.display_name} />
        {EmbedComponent && <EmbedComponent trackUrl={url} />}
      </div>
    </div>
  );
};

export default Cast;
