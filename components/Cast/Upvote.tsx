import createReaction from '@/lib/neynar/createReaction';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { Cast } from '@/types/Cast';
import { useState } from 'react';
import { IoIosArrowDropup, IoIosArrowDropupCircle } from 'react-icons/io';

const Upvote = ({ cast }: { cast: Cast }) => {
  const { signer } = useNeynarProvider();
  const [upvoted, setUpvoted] = useState<boolean>(
    signer && cast.reactions.likes.some((like: any) => like?.fid === signer?.fid),
  );
  const [votes, setVotes] = useState<number>(cast.reactions.likes.length);

  const handleClick = async () => {
    const { signer_uuid } = signer;
    const response = await createReaction(signer_uuid, cast.hash);
    if (response.success) {
      setUpvoted(true);
      setVotes(votes + 1);
    }
  };

  return (
    <button type="button" onClick={handleClick}>
      {upvoted ? (
        <IoIosArrowDropupCircle className="text-red-500 text-4xl" />
      ) : (
        <IoIosArrowDropup className="text-red-500 text-4xl" />
      )}
      <span className="text-lg font-semibold font-inter text-red-300">{votes}</span>
    </button>
  );
};

export default Upvote;
