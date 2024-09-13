import { Button } from '@/components/ui/button';
import useCreateDialog from '@/hooks/useCreateModal';
import { useUi } from '@/providers/UiProvider';
import { ChevronRight } from 'lucide-react';
import PostDialog from './PostDialog';
import PostInput from './PostInput';

export default function CreatePost() {
  const { checkLoggedIn } = useUi();
  const dialog = useCreateDialog();

  const handleClick = () => {
    if (!checkLoggedIn()) return;

    if (dialog.embedUrl) dialog.handlePost();
    else dialog.setIsPostDialogOpen(true);
  };

  return (
    <div className="flex items-center gap-2">
      <PostInput
        placeholder="What are you listening to?"
        value={dialog.embedUrl}
        onChange={(e) => dialog.setEmbedUrl(e.target.value)}
        action={
          <Button
            className="flex h-auto items-center gap-2 rounded-full bg-gray-500 px-4 py-2 text-white"
            onClick={handleClick}
          >
            Cast
            <ChevronRight size={16} />
          </Button>
        }
      />

      <PostDialog
        handleTextChange={(e: any) => dialog.setEmbedUrl(e.target.value)}
        onPost={dialog.handlePost}
        isOpen={dialog.isPostDialogOpen}
        setIsOpen={dialog.setIsPostDialogOpen}
        channelId={dialog.channelId}
        setChannelId={dialog.setChannelId}
      />
    </div>
  );
}
