import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { useUi } from '@/providers/UiProvider';
import PostInput from './PostInput';
import Dropdown from './Dropdown';

export default function PostDialog({
  handleTextChange,
  onPost,
  isOpen,
  setIsOpen,
  setChannelId,
  channelId,
}: any) {
  const { isMobile } = useUi();
  const close = () => setIsOpen(false);
  return (
    <>
      <Dialog open={!isMobile && isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="flex flex-col items-center gap-8 ">
          <DialogHeader className="self-start">
            <DialogTitle>Cast Song</DialogTitle>
          </DialogHeader>

          <PostInput
            placeholder="Paste Song URL"
            onChange={handleTextChange}
            className="w-full px-4 py-[2px]"
            action={<Dropdown handleSelect={setChannelId} value={channelId} className="z-50" />}
          />

          <div className="self-end">
            <Button className="text-grey hover:bg-transparent" variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button className="h-auto rounded-[6.25rem] px-4 py-2" onClick={onPost}>
              Cast
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Drawer open={isMobile && isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <div className="flex flex-col gap-6 p-6">
            <DrawerHeader className="p-0">
              <DrawerTitle className="text-center text-xl">Cast Song</DrawerTitle>
            </DrawerHeader>
            <PostInput
              placeholder="Paste Song URL"
              onChange={handleTextChange}
              className="w-full px-4 py-[2px]"
              action={<Dropdown handleSelect={setChannelId} value={channelId} className="z-50" />}
            />
            <div className="self-end">
              <Button className="text-grey hover:bg-transparent" variant="ghost" onClick={close}>
                Cancel
              </Button>
              <Button className="h-auto rounded-[6.25rem] px-6 py-2" onClick={onPost}>
                Cast
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
