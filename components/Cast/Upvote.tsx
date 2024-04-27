import createReaction from '@/lib/neynar/createReaction';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { Cast } from '@/types/Cast';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { twJoin } from 'tailwind-merge';

const Upvote = ({ cast }: { cast: Cast }) => {
  const { signer } = useNeynarProvider();
  const [upvoted, setUpvoted] = useState<boolean>(
    Boolean(signer && cast.reactions.likes.some((like) => like?.fid === String(signer?.fid))),
  );
  const [votes, setVotes] = useState<number>(cast.reactions.likes.length);

  const handleClick = async () => {
    if (!signer) return;

    const { signer_uuid } = signer;
    const response = await createReaction(signer_uuid, cast.hash);

    // TODO: Tip poster 10 points
    toast('Awarded 10 points');

    if (response.success) {
      setUpvoted(true);
      setVotes(votes + 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button type="button" onClick={handleClick}>
        <span className={twJoin('text-3xl', upvoted && 'font-bold')}>↑</span>
      </button>
      <span className="text-xl font-semibold font-inter">{votes}</span>
    </div>
  );
};

export default Upvote;
