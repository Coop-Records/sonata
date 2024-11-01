import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useUi } from '@/providers/UiProvider';
import CreateDialogBody from './CreateDialogBody';

export default function PostDialog({
  handleTextChange,
  onPost,
  isOpen,
  setIsOpen,
  setChannelId,
  channelId,
  loading,
}: any) {
  const { isMobile } = useUi();

  return (
    <>
      <Dialog open={!isMobile && isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="flex flex-col items-center gap-8 ">
          <DialogHeader className="self-start">
            <DialogTitle className="font-clashDisplay text-base font-thin">Cast Song</DialogTitle>
          </DialogHeader>

          <CreateDialogBody
            handleTextChange={handleTextChange}
            onPost={onPost}
            setChannelId={setChannelId}
            channelId={channelId}
            loading={loading}
            setIsOpen={setIsOpen}
          />
        </DialogContent>
      </Dialog>

      <Drawer open={isMobile && isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <div className="flex flex-col gap-6 p-6">
            <DrawerHeader className="p-0">
              <DrawerTitle className="font-clashDisplay text-base font-thin">Cast Song</DrawerTitle>
            </DrawerHeader>

            <CreateDialogBody
              handleTextChange={handleTextChange}
              onPost={onPost}
              setChannelId={setChannelId}
              channelId={channelId}
              loading={loading}
              setIsOpen={setIsOpen}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
