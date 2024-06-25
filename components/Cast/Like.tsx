import { Button } from '@/components/ui/button';
import createReaction from '@/lib/neynar/createReaction';
import hasUserLikedCast from '@/lib/neynar/hasUserLiked';
import { cn } from '@/lib/utils';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { useUi } from '@/providers/UiProvider';
import { SupabasePost } from '@/types/SupabasePost';
import { Signer } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function Like({ cast }: { cast: SupabasePost }) {
  const { signer } = useNeynarProvider();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState<number>(cast.likes || 0);
  const { checkLoggedIn } = useUi();

  useEffect(() => {
    if (signer?.fid) hasUserLikedCast(
      cast.post_hash,
      signer.fid
    ).then(liked => setLiked(liked));

  }, [cast.post_hash, signer?.fid]);

  const handleClick = async () => {
    if (!checkLoggedIn()) return;
    if (liked) return;
    setLiked(true);

    const { signer_uuid } = signer as Signer;
    const response = await createReaction(signer_uuid, cast.post_hash);

    if (response.success) {
      setLikes(response.likes);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={cn(
        'h-auto rounded-full bg-muted px-4 py-1 font-semibold space-x-1 text-base',
        liked && 'bg-red-50 text-red-600 hover:text-red-600 hover:bg-red-50',
      )}
    >
      {liked ? <FaHeart /> : <FaRegHeart />}
      <span className="leading-none">{likes}</span>
    </Button>
  );
}
