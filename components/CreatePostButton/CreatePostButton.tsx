import { Button } from '@/components/ui/button';
import useCreateModal from '@/hooks/useCreateModal';
import { useUi } from '@/providers/UiProvider';
import PostDialog from './PostDialog';
import Loader from '@/components/Loader';

export default function CreatePost() {
  const { checkLoggedIn } = useUi();
  const dialog = useCreateModal();

  const handleClick = () => {
    if (!checkLoggedIn()) return;

    dialog.setIsPostDialogOpen(true);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        disabled={dialog.posting}
        className="fixed bottom-16 right-6 size-16 rounded-full bg-blue text-3xl text-foreground hover:bg-blue"
        onClick={handleClick}
      >
        {dialog.posting ? <Loader /> : '+'}
      </Button>

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
