import { Button } from '@/components/ui/button';
import useCreateDialog from '@/hooks/useCreateModal';
import PostDialog from './PostDialog';
import { useUi } from '@/providers/UiProvider';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function CreatePost() {
  const { user } = useNeynarProvider();
  const { checkLoggedIn } = useUi();
  const { handlePost, isPostDialogOpen, setIsPostDialogOpen, setEmbedUrl, embedUrl } =
    useCreateDialog();

  const handleClick = () => {
    if (!checkLoggedIn()) return;
    if (embedUrl) {
      handlePost();

      return;
    }
    setIsPostDialogOpen(true);
  };

  return (
    <div className="flex items-center gap-2">
      <a className="cursor-pointer" href={`/${user?.username}`}>
        <Avatar className="size-12 max-md:hidden">
          <AvatarImage src={user?.pfp_url} />
          <AvatarFallback>{user?.display_name?.[0]}</AvatarFallback>
        </Avatar>
      </a>

      <div className="flex grow items-center justify-between rounded-2xl bg-muted p-3">
        <Input
          value={embedUrl}
          className="border-none bg-transparent text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Share SoundCloud, Sound or Spotify links here!"
          onChange={(e) => setEmbedUrl(e.target.value)}
        />
        <Button
          onClick={handleClick}
          className="flex h-auto items-center gap-2 rounded-full bg-gray-500 px-4 py-1.5 text-white"
        >
          Cast
          <ChevronRight size={16} />
        </Button>
      </div>

      <PostDialog
        handleTextChange={(e: any) => setEmbedUrl(e.target.value)}
        onPost={handlePost}
        isOpen={isPostDialogOpen}
        setIsOpen={setIsPostDialogOpen}
      />
    </div>
  );
}
