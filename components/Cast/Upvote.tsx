import createReaction from '@/lib/neynar/createReaction';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { useStackProvider } from '@/providers/StackProvider';
import { Cast } from '@/types/Cast';
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { useToast } from '../ui/use-toast';
import SignInDialog from '../SignInDialog';

const Upvote = ({ cast }: { cast: Cast }) => {
  const { toast } = useToast();
  const { signer } = useNeynarProvider();
  const [upvoted, setUpvoted] = useState<boolean>(
    Boolean(signer && cast.reactions.likes.some((like) => like?.fid === String(signer?.fid))),
  );
  const [votes, setVotes] = useState<number>(cast.reactions.likes.length);
  const [signInModalOpen, setSignInModalOpen] = useState<boolean>(false);
  const { tip } = useStackProvider();

  useEffect(() => {
    if (signer) setSignInModalOpen(false);
  }, [signer]);

  const handleClick = async () => {
    if (!signer) {
      setSignInModalOpen(true);
      return;
    }

    const { signer_uuid } = signer;
    const response = await createReaction(signer_uuid, cast.hash);

    // TODO: Tip poster 10 points
    toast({ description: 'Awarded 10 points' });
    await tip(10, cast.hash, cast.author.verifications[0]);

    if (response.success) {
      setUpvoted(true);
      setVotes(votes + 1);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <button type="button" onClick={handleClick}>
          <FaArrowUp className={cn('text-2xl text-gray-400', upvoted && 'text-black')} />
        </button>
        <span className="font-inter text-xl font-semibold">{votes}</span>
      </div>
      <SignInDialog open={signInModalOpen} setOpen={setSignInModalOpen} />
    </>
  );
};

export default Upvote;
