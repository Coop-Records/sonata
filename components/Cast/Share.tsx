import findValidEmbed from '@/lib/findValidEmbed';
import { SupabasePost } from '@/types/SupabasePost';
import { ShareIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';

export default function Share({ cast }: { cast: SupabasePost }) {
  const { copy } = useCopyToClipboard();
  const handleClick = () => {
    const embed = findValidEmbed(cast);
    if (!embed) return;

    copy(`${window.location.origin}/cast/${cast.author.username}/${cast.post_hash.slice(0, 10)}`);
  };

  return (
    <Button
      variant="ghost"
      className="h-auto p-0 text-muted-foreground outline-none hover:bg-transparent"
      onClick={handleClick}
    >
      <ShareIcon />
    </Button>
  );
}
