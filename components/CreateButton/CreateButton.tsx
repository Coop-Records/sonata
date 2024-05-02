import { FaArrowUp } from 'react-icons/fa';
import { Button } from '../ui/button';
import useCreateDialog from '@/hooks/useCreateModal';
import PostDialog from './PostDialog';

const CreateButton = () => {
  const { handlePost, isPostDialogOpen, setIsPostDialogOpen, setEmbedUrl } = useCreateDialog();

  const handleClick = () => {
    console.log('sweets clicked');
    setIsPostDialogOpen(true);
  };

  return (
    <div>
      <Button onClick={handleClick}>
        <FaArrowUp className="text-2xl text-white" />
      </Button>
      <PostDialog
        handleTextChange={(e: any) => setEmbedUrl(e.target.value)}
        onPost={handlePost}
        isOpen={isPostDialogOpen}
        setIsOpen={setIsPostDialogOpen}
      />
    </div>
  );
};

export default CreateButton;
