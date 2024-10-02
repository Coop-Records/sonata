'use client';
import { useToast } from '@/components/ui/use-toast';
import isValidUrl from '@/lib/isValidUrl';
import { usePrivy } from '@privy-io/react-auth';
import { useState } from 'react';
import useSigner from './farcaster/useSigner';
import farcasterClient from '@/lib/farcaster/client';
import getParentUrlFromChannelId from '@/lib/getParentUrlFormChannelId';

const useCreateDialog = () => {
  const { getSigner } = useSigner();
  const { user } = usePrivy();
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const [channelId, setChannelId] = useState<string>();
  const [isPostDialogOpen, setIsPostDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const handlePost = async () => {
    if (!isValidUrl(embedUrl)) {
      toast({ description: `Sound / Soundcloud / Spotify / Youtube only` });
      return;
    }
    const signer = await getSigner();
    if (!(signer && user?.farcaster?.fid)) return;

    try {
      const parentUrl = getParentUrlFromChannelId(channelId);
      await farcasterClient.submitCast(
        { text: embedUrl, embeds: [{ url: embedUrl }], parentUrl },
        user.farcaster.fid,
        signer,
      );
      toast({ description: 'Posted!!!' });
    } catch (error) {
      console.error(error);
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
