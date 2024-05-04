import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import Input from '../Input';

const PostDialog = ({ handleTextChange, onPost, isOpen, setIsOpen }: any) => (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent className="max-w-[75vw] sm:max-w-[33vw]">
      <DialogHeader className="flex items-center text-center">
        <DialogTitle>Share a Song</DialogTitle>
        <DialogDescription>Enter Soundcloud or Sound links. More coming soon!</DialogDescription>
      </DialogHeader>

      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <Input onChange={handleTextChange} className="w-full" />
        <Button onClick={onPost}>Cast</Button>
      </div>
    </DialogContent>
  </Dialog>
);

export default PostDialog;
