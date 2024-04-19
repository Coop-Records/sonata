import { Cast as CastType } from '@/types/Cast';
import AuthorDetails from './AuthorDetails';
import PlayButton from './PlayButton';
import Upvote from './Upvote';

const Cast = ({ cast = {} as CastType }: { cast: CastType }) => {
  const embed = (cast?.embeds?.[0] as any)?.url;

  return (
    <div className="flex flex-col gap-3 mb-[20px] border border-500-[#ddd] p-[10px]">
      <AuthorDetails pfpUrl={cast.author.pfp_url} displayName={cast.author.display_name} />
      <div className="flex items-center w-full">
        <Upvote cast={cast} />
        <PlayButton embed={embed} />
      </div>
    </div>
  );
};

export default Cast;
