import getProfileRank from '@/lib/sonata/getProfileRank';
import { formatBigInt } from '@/lib/utils';
import { useProfileProvider } from '@/providers/ProfileProvider';
import { useEffect, useState } from 'react';

const Rank = () => {
  const [rank, setRank] = useState(0);
  const { profile } = useProfileProvider();

  useEffect(() => {
    const init = async () => {
      if (!profile?.verifications) return;
      const cnt = await getProfileRank(profile?.verifications);
      setRank(cnt);
    };
    if (!profile) return;

    init();
  }, [profile]);

  return (
    <div className="flex w-fit flex-col justify-center">
      <p className="font-sora text-[16px] font-semibold">{rank}</p>
    </div>
  );
};

export default Rank;
