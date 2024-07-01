'use client'
import { useToast } from '@/components/ui/use-toast';
import callPostApi from '@/lib/callPostApi';
import isValidUrl from '@/lib/isValidUrl';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const useCreateDialog = () => {
  const { signer } = useNeynarProvider();
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const [isPostDialogOpen, setIsPostDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const handlePost = () => {
    if (!isValidUrl(embedUrl)) {
      toast({ description: `Sound / Soundcloud / Spotify only` });
      return;
    }
    if (!signer?.signer_uuid) return;

    callPostApi(signer.signer_uuid, embedUrl).then(
      async res => {
        toast({ description: 'Posted!!!' });
        if (res.status == 307) {
          const data = await res.json();
          router.push(data.link);
        }
      }
    ).catch(
      () => toast({ description: 'Failed' })
    ).finally(() => {
      setEmbedUrl('');
      setIsPostDialogOpen(false);
    });
  };

  const handleClick = () => {
    setIsPostDialogOpen(true);
  };

  return { handleClick, handlePost, isPostDialogOpen, setIsPostDialogOpen, embedUrl, setEmbedUrl };
};

export default useCreateDialog;
