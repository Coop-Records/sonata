import { Button } from '@/components/ui/button';
import useCreateModal from '@/hooks/useCreateModal';
import { useUi } from '@/providers/UiProvider';
import { ChevronRight, Loader2 } from 'lucide-react';
import PostDialog from './PostDialog';
import PostInput from './PostInput';

export default function CreatePost() {
  const { checkLoggedIn } = useUi();
  const dialog = useCreateModal();

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
            disabled={dialog.posting}
            className="flex h-auto items-center gap-2 rounded-full bg-gray-500 px-4 py-2 text-white"
            onClick={handleClick}
          >
            {dialog.posting ? (
              <>
                Casting <Loader2 className="animate-spin" size={16} />
              </>
            ) : (
              <>
                Cast <ChevronRight size={16} />
              </>
            )}
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
        loading={dialog.posting}
      />
    </div>
  );
}
