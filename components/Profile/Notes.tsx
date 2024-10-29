import getCurrentNotes from '@/lib/sonata/getCurrentNotes';
import { formatBigInt } from '@/lib/utils';
import { useProfileProvider } from '@/providers/ProfileProvider';
import { useEffect, useState } from 'react';

const Notes = () => {
  const [notes, setNotes] = useState(0);
  const { profile } = useProfileProvider();

  useEffect(() => {
    const init = async () => {
      if (!profile?.verifications) return;
      const cnt = await getCurrentNotes(profile.fid);
      setNotes(cnt);
    };
    if (!profile) return;

    init();
  }, [profile]);

  return (
    <div className="flex w-fit flex-col justify-center">
      <p className="font-clashDisplay text-lg font-medium">{formatBigInt(BigInt(notes))}</p>
      <p className="text-sm text-grey">Notes</p>
    </div>
  );
};

export default Notes;
