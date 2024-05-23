import findValidEmbed from '@/lib/findValidEmbed';
import { SupabasePost } from '@/types/SupabasePost';
import { ShareIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

export default function Share({ cast }: { cast: SupabasePost }) {
  const { toast } = useToast();
  const handleClick = async () => {
    const embed = findValidEmbed(cast);
    if (!embed) return;
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/cast/${cast.author.username}/${cast.post_hash.slice(0, 10)}`,
      );
      toast({ title: 'Copied!', description: 'URL copied to clipboard.' });
    } catch (error) {
      console.error('Failed to copy URL to clipboard:', error);
    }
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
