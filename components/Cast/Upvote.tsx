import createReaction from '@/lib/neynar/createReaction';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { Cast } from '@/types/Cast';
import { useState } from 'react';
import { MdArrowCircleUp } from 'react-icons/md';

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
      <MdArrowCircleUp size={50} color={upvoted ? 'red' : 'black'} />
      <span>{votes}</span>
    </button>
  );
};

export default Upvote;
