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
    <DialogContent className="max-w-[75vw]">
      <DialogHeader className="flex items-center text-center">
        <DialogTitle>Post Your Content</DialogTitle>
        <DialogDescription>We currently support Spotify, Soundcloud and Sound links. More coming soon!</DialogDescription>
      </DialogHeader>

      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <Input onChange={handleTextChange} className="w-full max-w-[555px]" />
        <Button onClick={onPost}>Cast</Button>
      </div>
    </DialogContent>
  </Dialog>
);

export default PostDialog;
