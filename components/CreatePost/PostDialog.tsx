import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUi } from '@/providers/UiProvider';

export default function PostDialog({ handleTextChange, onPost, isOpen, setIsOpen }: any) {
  const { isMobile } = useUi();
  return (
    <>
      <Dialog open={!isMobile && isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="flex flex-col items-center gap-8 ">
          <DialogHeader>
            <DialogTitle className="text-center">Share a Song</DialogTitle>
            <DialogDescription>
              We currently support Spotify, Soundxyz and Soundcloud
            </DialogDescription>
          </DialogHeader>

          <Input
            onChange={handleTextChange}
            className="w-full border-none bg-muted outline-none"
            placeholder="https://www.sound.xyz/xcelencia/cancun-ft-tarot"
          />
          <Button className="h-auto rounded-full px-8" onClick={onPost}>
            Cast
          </Button>
        </DialogContent>
      </Dialog>

      <Drawer open={isMobile && isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <div className="flex flex-col gap-6 p-6">
            <DrawerHeader className="p-0">
              <DrawerTitle className="text-center text-xl">Share a Song</DrawerTitle>
              <DrawerDescription>
                We currently support Spotify, Soundxyz and Soundcloud
              </DrawerDescription>
            </DrawerHeader>
            <Input
              onChange={handleTextChange}
              className="w-full border-none bg-muted outline-none"
              placeholder="https://www.sound.xyz/xcelencia/cancun-ft-tarot"
            />
            <Button className="h-auto rounded-full p-3" onClick={onPost}>
              Cast
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
