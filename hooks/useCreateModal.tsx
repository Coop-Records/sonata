import { useToast } from '@/components/ui/use-toast';
import callPostApi from '@/lib/callPostApi';
import isValidUrl from '@/lib/isValidUrl';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { useState } from 'react';

const useCreateDialog = () => {
  const { signer } = useNeynarProvider();
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const [isPostDialogOpen, setIsPostDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const handlePost = () => {
    if (!isValidUrl(embedUrl)) {
      toast({ description: `Spotify / Sound / Soundcloud only` });
      return;
    }
    console.log('SWEETS USE NEYNAR TO POST COMMENT');
    callPostApi(signer?.signer_uuid, embedUrl);
    toast({ description: `Posted!!!` });
    setIsPostDialogOpen(false);
  };

  const handleClick = () => {
    setIsPostDialogOpen(true);
  };

  return { handleClick, handlePost, isPostDialogOpen, setIsPostDialogOpen, setEmbedUrl };
};

export default useCreateDialog;
