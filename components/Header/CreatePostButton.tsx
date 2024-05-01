'use client';
import { Button } from '../ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { useToast } from '../ui/use-toast';

export default function CreatePostButton() {
  const { toast } = useToast();

  return (
    <Button
      type="button"
      className="space-x-2"
      onClick={() =>
        toast({
          title: 'Coming soon',
          description: 'This feature is still under development',
        })
      }
    >
      <span>New Post</span>
      <PlusIcon />
    </Button>
  );
}
