import createReaction from '@/lib/neynar/createReaction';
import getCastReactions from '@/lib/neynar/getCastReactions';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { useEffect, useState } from 'react';
import { MdArrowCircleUp } from 'react-icons/md';
import { Address } from 'viem';

const Upvote = ({ target, cast }: { target: Address; cast: any }) => {
  const { signer } = useNeynarProvider();
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [votes, setVotes] = useState<number>(cast.reactions.likes.length);

  const handleClick = async () => {
    const { signer_uuid } = signer;
    const response = await createReaction(signer_uuid, target);
    if (response.success) {
      setUpvoted(true);
      setVotes(votes + 1);
    }
  };

  const fetchUpvoted = async () => {
    if (!signer) return;
    const castResponse = await getCastReactions(target);
    const { fid } = signer;
    const userHasUpvoted = castResponse.some((reaction: any) => reaction.user.fid == fid);
    if (userHasUpvoted) setUpvoted(true);
  };

  useEffect(() => {
    fetchUpvoted();
  }, [signer]);

  return (
    <button type="button" onClick={handleClick}>
      <MdArrowCircleUp size={50} color={upvoted ? 'red' : 'black'} />
      <span>{votes}</span>
    </button>
  );
};

export default Upvote;
