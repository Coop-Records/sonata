import { Cast as CastType } from '@/types/Cast';
import AuthorDetails from './AuthorDetails';
import Upvote from './Upvote';
import findValidEmbed from '@/lib/findValidEmbed';
import TipButton from '../Tipping/TipButton';
import Media from './Media';

const Cast = ({ cast = {} as CastType }: { cast: CastType }) => {
  const embed = findValidEmbed(cast);
  const url = embed?.url;

  const { author } = cast;
  const { verifications } = author;

  if (!url) return <></>;

  return (
    <div className="flex items-center gap-5 p-2.5">
      <Upvote cast={cast} />
      <div className="w-full space-y-4">
        <AuthorDetails author={author} />
        <Media trackUrl={url} />
        <TipButton verifications={verifications} cast={cast} />
      </div>
    </div>
  );
};

export default Cast;
