import { formatBigInt } from '@/lib/utils';
import { useProfileProvider } from '@/providers/ProfileProvider';

const Songs = () => {
  const { songs } = useProfileProvider();

  return (
    <div className="flex w-fit flex-col justify-center">
      <p className="font-sora text-[16px] font-semibold">{formatBigInt(BigInt(songs.length))}</p>
      <p className="text-[14px] text-grey">Songs</p>
    </div>
  );
};

export default Songs;
