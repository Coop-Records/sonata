import { formatBigInt } from '@/lib/utils';
import { useProfileProvider } from '@/providers/ProfileProvider';

const Songs = () => {
  const { songs } = useProfileProvider();

  return (
    <div className="flex flex-col justify-center w-fit">
      <p className="text-[16px] font-semibold font-sora">{formatBigInt(BigInt(songs.length))}</p>
      <p className="text-[14px] text-grey">Songs</p>
    </div>
  );
};

export default Songs;
