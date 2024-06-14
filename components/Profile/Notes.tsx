import getProfileNotes from '@/lib/sonata/getProfileNotes';
import { formatBigInt } from '@/lib/utils';
import { useProfileProvider } from '@/providers/ProfileProvider';
import { useEffect, useState } from 'react';

const Notes = () => {
  const [notes, setNotes] = useState(0);
  const { profile } = useProfileProvider();

  useEffect(() => {
    const init = async () => {
      if (!profile?.verifications) return;
      const cnt = await getProfileNotes(profile?.verifications);
      setNotes(cnt);
    };
    if (!profile) return;

    init();
  }, [profile]);

  return (
    <div className="flex w-fit flex-col justify-center">
      <p className="font-sora text-[16px] font-semibold">{formatBigInt(BigInt(notes))}</p>
      <p className="text-[14px] text-grey">Notes</p>
    </div>
  );
};

export default Notes;
