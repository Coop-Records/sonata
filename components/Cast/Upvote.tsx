import createReaction from '@/lib/neynar/createReaction';
import executeTip from '@/lib/sonata/executeTip';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { useStackProvider } from '@/providers/StackProvider';
import { Cast } from '@/types/Cast';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { twJoin } from 'tailwind-merge';

const Upvote = ({ cast }: { cast: Cast }) => {
  const { signer } = useNeynarProvider();
  const [upvoted, setUpvoted] = useState<boolean>(
    Boolean(signer && cast.reactions.likes.some((like: any) => like?.fid === signer?.fid)),
  );
  const [votes, setVotes] = useState<number>(cast.reactions.likes.length);
  const { tip } = useStackProvider();

  const handleClick = async () => {
    if (!signer) return;

    const { signer_uuid } = signer;
    const response = await createReaction(signer_uuid, cast.hash);

    await tip(10, cast.hash, cast.author.verifications[0]);

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
