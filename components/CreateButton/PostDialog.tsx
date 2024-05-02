import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import Input from '../Input';

const PostDialog = ({ handleTextChange, onPost, isOpen, setIsOpen }: any) => (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent className="max-w-[75vw]">
      <DialogHeader>
        <DialogTitle>Post Your Content</DialogTitle>
        <DialogDescription>sound/soundcloud/spotify</DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <div className="flex flex-col gap-3">
          <Input onChange={handleTextChange} className="w-full" />
          <Button onClick={onPost}>Post</Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default PostDialog;
