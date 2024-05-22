import { Button } from '../ui/button';
import useCreateDialog from '@/hooks/useCreateModal';
import PostDialog from './PostDialog';
import { useUi } from '@/providers/UiProvider';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { Avatar } from '../ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { ChevronRight } from 'lucide-react';

export default function CreatePost() {
  const { user } = useNeynarProvider();
  const { checkLoggedIn } = useUi();
  const { handlePost, isPostDialogOpen, setIsPostDialogOpen, setEmbedUrl } = useCreateDialog();

  const handleClick = () => {
    if (!checkLoggedIn()) return;
    setIsPostDialogOpen(true);
  };

  if (!user) return <></>;

  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-12 max-md:hidden">
        <AvatarImage src={user.pfp_url} />
        <AvatarFallback>{user.display_name[0]}</AvatarFallback>
      </Avatar>

      <div className="flex grow items-center justify-between rounded-2xl bg-muted p-3">
        <p className="text-muted-foreground">What are you listening?</p>
        <Button
          onClick={handleClick}
          className="flex h-auto items-center gap-2 rounded-full bg-gray-500 px-4 py-1.5 text-white"
        >
          List
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
