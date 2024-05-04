import createReaction from '@/lib/neynar/createReaction';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { useTipProvider } from '@/providers/TipProvider';
import { Cast } from '@/types/Cast';
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import SignInDialog from '../SignInDialog';
import getCastLikes from '@/lib/neynar/getCastLikes';
import { SupabasePost } from '@/types/SupabasePost';

const Upvote = ({ cast }: { cast: SupabasePost }) => {
  const { signer } = useNeynarProvider();
  const [upvoted, setUpvoted] = useState(false);
  const [votes, setVotes] = useState<number>(cast.likes || 0);
  const [signInModalOpen, setSignInModalOpen] = useState<boolean>(false);
  const { tip } = useTipProvider();

  useEffect(() => {
    const updateReaction = async () => {
      const likes = await getCastLikes(cast.post_hash);
      if ('error' in likes) {
        return;
      }
      if (likes.some((like: any) => like?.fid === signer?.fid)) {
        setUpvoted(true);
      }
    };
    if (signer?.fid && cast.post_hash) {
      updateReaction();
    }
  }, [cast.post_hash, signer?.fid]);

  useEffect(() => {
    if (signer) setSignInModalOpen(false);
  }, [signer]);

  const handleClick = async () => {
    if (!signer) {
      setSignInModalOpen(true);
      return;
    }

    const { signer_uuid } = signer;
    const response = await createReaction(signer_uuid, cast.post_hash);

    if (response.success) {
      setUpvoted(true);
      setVotes(votes + 1);
      await tip(10, cast.post_hash, cast.author.verifications);
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
