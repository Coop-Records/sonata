import createReaction from '@/lib/neynar/createReaction';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import getCastLikes from '@/lib/neynar/getCastLikes';
import { SupabasePost } from '@/types/SupabasePost';
import { useUi } from '@/providers/UiProvider';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export default function Like({ cast }: { cast: SupabasePost }) {
  const { signer } = useNeynarProvider();
  const [upvoted, setUpvoted] = useState(false);
  const [votes, setVotes] = useState<number>(cast.likes || 0);
  const { checkLoggedIn } = useUi();
  const updateReaction = async () => {
    const data = await getCastLikes(cast.post_hash, signer?.fid);
    if (!data.likes_count) {
      return;
    }
    if (data.viewContext) {
      setUpvoted(true);
    }
  };
  useEffect(() => {
    if (signer?.fid && cast.post_hash) {
      updateReaction();
    }
  }, [cast.post_hash, signer?.fid]);

  const handleClick = async () => {
    if (upvoted) return;
    if (!checkLoggedIn()) return;

    const response = await createReaction(signer, cast.post_hash, votes);
    setUpvoted(response.success);

    if (response.success) {
      setVotes(response.likes);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={cn(
        'h-auto rounded-full bg-muted px-4 py-1 font-semibold space-x-1 text-base',
        upvoted && 'bg-red-50 text-red-600 hover:text-red-600 hover:bg-red-50',
      )}
    >
      {upvoted ? <FaHeart /> : <FaRegHeart />}
      <span className="leading-none">{votes}</span>
    </Button>
  );
}
