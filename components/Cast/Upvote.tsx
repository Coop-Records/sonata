import createReaction from '@/lib/neynar/createReaction';
import getCastReactions from '@/lib/neynar/getCastReactions';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { ReactionLike } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { useEffect, useState } from 'react';
import { MdArrowCircleUp } from 'react-icons/md';
import { Address } from 'viem';

const Upvote = ({ target }: { target: Address }) => {
  const { signer } = useNeynarProvider();
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [votes, setVotes] = useState<number>(0);

  const handleClick = async () => {
    const { signer_uuid } = signer;
    console.log('SWEETS USE THIS', signer_uuid);
    console.log('SWEETS LIKE THIS', target);
    const response = await createReaction(signer_uuid, target);
    console.log('SWEETS RESPONSE', response);
    // CHECK IF RESPONSE IS SUCCESSFUL
    await refetchData();
    if (response.success) {
      setUpvoted(true);
      setVotes(votes + 1);
    }
  };

  const refetchData = async () => {
    const castResponse = await getCastReactions(target);
    console.log('SWEETS castResponse', castResponse);
    setVotes(castResponse?.reactions?.length);
    console.log('SWEETS SIGNER UPVOTE?', signer);
    const { fid } = signer;
    console.log('SWEETS fid', fid);
    console.log('SWEETS typeof fid', typeof fid);

    // Iterate over all reactions to check if any reaction has the same fid as the signer
    const userHasUpvoted = castResponse.reactions.some((reaction: any) => reaction.user.fid == fid);
    if (userHasUpvoted) setUpvoted(true); // Update the upvoted state if the fid matches the signer's fid
    // setUpvoted(userHasUpvoted); // Update the upvoted state based on the check
    // console.log('SWEETS SIGNER UPVOTE?', signer, userHasUpvoted);
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
