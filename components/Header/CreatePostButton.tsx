'use client';

import { Button } from '../ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import PostDialog from '../CreateButton/PostDialog';
import useCreateDialog from '@/hooks/useCreateModal';

export default function CreatePostButton() {
  const { handlePost, isPostDialogOpen, setIsPostDialogOpen, setEmbedUrl } = useCreateDialog();

  const handleClick = () => {
    setIsPostDialogOpen(true);
  };

  return (
    <div>
      <Button type="button" className="space-x-2" onClick={handleClick}>
        <span>New Post</span>
        <PlusIcon />
      </Button>
      <PostDialog
        handleTextChange={(e: any) => setEmbedUrl(e.target.value)}
        onPost={handlePost}
        isOpen={isPostDialogOpen}
        setIsOpen={setIsPostDialogOpen}
      />
    </div>
  );
}
