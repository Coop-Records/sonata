import getProfileRank from '@/lib/sonata/getProfileRank';
import { useProfileProvider } from '@/providers/ProfileProvider';
import { useEffect, useState } from 'react';

const Rank = () => {
  const [rank, setRank] = useState(0);
  const { profile } = useProfileProvider();

  useEffect(() => {
    const init = async () => {
      if (!profile?.verifications) return;
      const leaderBoardRank: any = await getProfileRank(profile?.verifications);
      setRank(leaderBoardRank);
    };
    if (!profile) return;

    init();
  }, [profile]);

  return (
    rank > 0 && (
      <div className="flex h-[33px] items-center justify-center rounded-full bg-grey-light px-4 font-sora text-[14px] font-semibold">
        <div className="flex w-fit flex-col justify-center">
          <p className="font-sora text-[16px] font-semibold">#{rank}</p>
        </div>
      </div>
    )
  );
};

export default Rank;
