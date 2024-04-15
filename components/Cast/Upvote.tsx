import createReaction from '@/lib/neynar/createReaction';
import getCastReactions from '@/lib/neynar/getCastReactions';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { useEffect, useState } from 'react';
import { MdArrowCircleUp } from 'react-icons/md';
import { Address } from 'viem';

const Upvote = ({ target }: { target: Address }) => {
  const { signer } = useNeynarProvider();
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [votes, setVotes] = useState<number>(0);

  const handleClick = async () => {
    const { signer_uuid } = signer;
    const response = await createReaction(signer_uuid, target);
    await refetchData();
    if (response.success) {
      setUpvoted(true);
      setVotes(votes + 1);
    }
  };

  const refetchData = async () => {
    const castResponse = await getCastReactions(target);
    setVotes(castResponse?.reactions?.length);
    const { fid } = signer;
    const userHasUpvoted = castResponse.reactions.some((reaction: any) => reaction.user.fid == fid);
    if (userHasUpvoted) setUpvoted(true);
  };

  useEffect(() => {
    refetchData();
  }, [signer]);

  return (
    <button type="button" onClick={handleClick}>
      <MdArrowCircleUp size={50} color={upvoted ? 'red' : 'black'} />
      <span>{votes}</span>
    </button>
  );
};

export default Upvote;
