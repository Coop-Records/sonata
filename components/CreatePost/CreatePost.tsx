import { Input } from '@/components/ui/input';
import useCreateDialog from '@/hooks/useCreateModal';
import { useUi } from '@/providers/UiProvider';
import Dropdown from './Dropdown';
import PostDialog from './PostDialog';

export default function CreatePost() {
  const { checkLoggedIn } = useUi();
  const { handlePost, isPostDialogOpen, setIsPostDialogOpen, setEmbedUrl, embedUrl, setChannelId, channelId } =
    useCreateDialog();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checkLoggedIn()) return;
    if (embedUrl) {
      handlePost();
      return;
    }
    setIsPostDialogOpen(true);
  };

  return (
    <div className="flex items-center gap-2">
      <form className="flex grow items-center justify-between rounded-[100px] bg-grey-light px-4 py-2" onSubmit={handleSubmit}>
        <Input
          value={embedUrl}
          className="border-none bg-transparent text-shadowgreen placeholder:text-shadowgreen focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Share SoundCloud, Sound or Spotify links here!"
          onChange={(e) => setEmbedUrl(e.target.value)}
        />
        <Dropdown handleSelect={setChannelId} value={channelId} />
      </form>

      <PostDialog
        channelValue={channelId}
        handleChannelSelect={setChannelId}
        handleTextChange={(e: any) => setEmbedUrl(e.target.value)}
        onPost={handlePost}
        isOpen={isPostDialogOpen}
        setIsOpen={setIsPostDialogOpen}
      />
    </div>
  );
}
