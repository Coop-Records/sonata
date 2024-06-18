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
    <div className="flex w-fit flex-col justify-center">
      <p className="font-sora text-[16px] font-semibold">#{rank}</p>
    </div>
  );
};

export default Rank;
