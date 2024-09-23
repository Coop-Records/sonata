import { formatBigInt } from '@/lib/utils';
import { useProfileProvider } from '@/providers/ProfileProvider';

const Songs = () => {
  const { songs } = useProfileProvider();

  return (
    <div className="flex w-fit flex-col justify-center">
      <p className="text-lg font-clashdisplay_medium text-white">
        {formatBigInt(BigInt(songs.length))}
      </p>
      <p className="text-sm text-grey">Songs</p>
    </div>
  );
};

export default Songs;
