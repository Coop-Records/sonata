'use client';

import { useUi } from '@/providers/UiProvider';
import useCreateDialog from '@/hooks/useCreateModal';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '../ui/drawer';
import PostInput from './PostInput';
import ChannelList from './ChannelList';

export default function CastPostDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { checkLoggedIn } = useUi();
  const {
    handlePost,
    setEmbedUrl,
    canCast,
    onSelect,
    selected,
    isChannelListOpen,
    setIsChannelListOpen,
  } = useCreateDialog();

  const handleClick = () => {
    if (!checkLoggedIn()) return;

    handlePost();
  };
  const handleCancel = () => {
    if (isChannelListOpen) {
      setIsChannelListOpen(false);
      return;
    }
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="flex flex-col gap-6 p-6">
          <DrawerHeader className="p-0">
            <DrawerTitle className="text-center text-xl text-white font-clashdisplay_medium">
              Cast Song
            </DrawerTitle>
          </DrawerHeader>
          <PostInput
            placeholder="What are you listening to?"
            onChange={(e) => setEmbedUrl(e.target.value)}
            className="w-full px-4 py-[2px]"
            selected={selected}
            onClick={() => setIsChannelListOpen(true)}
          />
          {isChannelListOpen && <ChannelList onSelect={onSelect} />}
          <section className="flex gap-3 self-end">
            <button
              className={`py-2 text-grey hover:bg-transparent ${canCast ? '' : 'mr-[97.5px]'}`}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            {canCast && (
              <button
                className="rounded-[6.25rem] px-6 py-2 !bg-white !text-background"
                onClick={handleClick}
                type="button"
              >
                Cast
              </button>
            )}
          </section>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
