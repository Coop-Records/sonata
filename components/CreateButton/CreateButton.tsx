import { FaArrowUp } from 'react-icons/fa';
import { Button } from '../ui/button';
import useCreateDialog from '@/hooks/useCreateModal';
import PostDialog from './PostDialog';
import SignInDialog from '../SignInDialog';
import useSignInModal from '@/hooks/useSignInModal';

const CreateButton = () => {
  const { isOpen, setIsOpen, checkLoggedIn } = useSignInModal();
  const { handlePost, isPostDialogOpen, setIsPostDialogOpen, setEmbedUrl } = useCreateDialog();

  const handleClick = () => {
    if (!checkLoggedIn()) return;
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
      <SignInDialog open={isOpen} setOpen={setIsOpen} />
    </div>
  );
};

export default CreateButton;
