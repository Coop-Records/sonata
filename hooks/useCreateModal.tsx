'use client';
import { useToast } from '@/components/ui/use-toast';
import callPostApi from '@/lib/callPostApi';
import isValidUrl from '@/lib/isValidUrl';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const useCreateDialog = () => {
  const { signer } = useNeynarProvider();
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const [channelId, setChannelId] = useState<string>();
  const [isPostDialogOpen, setIsPostDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const { push } = useRouter();

  const handlePost = async () => {
    if (!isValidUrl(embedUrl)) {
      toast({ description: `Sound / Soundcloud / Spotify / Youtube only` });
      return;
    }
    if (!signer?.signer_uuid) return;

    try {
      const res = await callPostApi(signer.signer_uuid, embedUrl, channelId);
      if (!res.ok) throw new Error('Failed');
      toast({ description: 'Posted!!!' });
      const data = await res.json();
      if (data?.link) {
        push(data.link);
      }
    } catch (e) {
      toast({ description: 'Failed' });
    } finally {
      setEmbedUrl('');
      setIsPostDialogOpen(false);
    }
  };

  const handleClick = () => {
    setIsPostDialogOpen(true);
  };

  return {
    handleClick,
    handlePost,
    isPostDialogOpen,
    setIsPostDialogOpen,
    embedUrl,
    setEmbedUrl,
    channelId,
    setChannelId,
  };
};

export default useCreateDialog;
