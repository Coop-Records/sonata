import createReaction from '@/lib/neynar/createReaction';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { useState } from 'react';
import { MdArrowCircleUp } from 'react-icons/md';
import { Address } from 'viem';

const Upvote = ({ target, cast }: { target: Address; cast: any }) => {
  const { signer } = useNeynarProvider();
  const [upvoted, setUpvoted] = useState<boolean>(
    cast.reactions.likes.some((like: any) => like.fid == signer.fid),
  );
  const [votes, setVotes] = useState<number>(cast.reactions.likes.length);

  const handleClick = async () => {
    const { signer_uuid } = signer;
    const response = await createReaction(signer_uuid, target);
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
