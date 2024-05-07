import AuthorDetails from './AuthorDetails';
import Upvote from './Upvote';
import findValidEmbed from '@/lib/findValidEmbed';
import TipButton from '../Tipping/TipButton';
import { useMemo } from 'react';
import SpotifyEmbed from './SpotifyEmbed';
import SoundCloudEmbed from './SoundCloudEmbed';
import SoundXyzEmbed from './SoundXyzEmbed';
import { useFeedProvider } from '@/providers/FeedProvider';
import { SupabasePost } from '@/types/SupabasePost';

const Cast = ({ cast = {} as SupabasePost }: { cast: SupabasePost }) => {
  const { filter } = useFeedProvider();
  const embed = findValidEmbed(cast);
  const url = embed?.url;
  const isSpotify = url?.includes('spotify');

  const { author } = cast;
  const { verifications } = author;

  const EmbedComponent = useMemo(() => {
    if (!url) return null;
    if (isSpotify) return SpotifyEmbed;
    if (url.includes('soundcloud')) return SoundCloudEmbed;
    if (url.includes('sound.xyz')) return SoundXyzEmbed;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const shouldBeFiltered = useMemo(() => {
    const channelId = cast.channelId;

    if (filter.channel) {
      if (!(channelId && channelId.includes(filter.channel))) return false;
    }

    const validEmbed = findValidEmbed(cast, { platform: filter.platform });
    if (!validEmbed) return false;

    if (isSpotify) return false;

    return true;
  }, [filter, cast]);

  if (!url) return <></>;

  return (
    <div
      className={`flex items-center gap-5 p-2.5 ${shouldBeFiltered ? '' : 'hidden'}`}
      key={cast.post_hash}
    >
      <Upvote cast={cast} />
      <div className="w-full space-y-4">
        <AuthorDetails author={author} />
        {EmbedComponent && <EmbedComponent trackUrl={url} cast={cast} />}
        <TipButton verifications={verifications} cast={cast} />
      </div>
    </div>
  );
};

export default Cast;
