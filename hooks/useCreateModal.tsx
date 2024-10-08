'use client';
import { useToast } from '@/components/ui/use-toast';
import isValidUrl from '@/lib/isValidUrl';
import { usePrivy } from '@privy-io/react-auth';
import { useState } from 'react';
import useSigner from './farcaster/useSigner';
import farcasterClient from '@/lib/farcaster/client';
import getParentUrlFromChannelId from '@/lib/getParentUrlFormChannelId';
import upsertCast from '@/lib/supabase/upsertCast';
import { useRouter } from 'next/navigation';

const useCreateModal = () => {
  const { getSigner } = useSigner();
  const { user } = usePrivy();
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const [channelId, setChannelId] = useState<string>();
  const [isPostDialogOpen, setIsPostDialogOpen] = useState<boolean>(false);
  const [posting, setPosting] = useState<boolean>(false);
  const { toast } = useToast();
  const { push } = useRouter();

  const handlePost = async () => {
    if (!isValidUrl(embedUrl)) {
      toast({ description: `Sound / Soundcloud / Spotify / Youtube only` });
      return;
    }
    const signer = await getSigner();
    if (!(signer && user?.farcaster?.fid)) return;

<<<<<<< HEAD
    setPosting(true);
    try {
      const parentUrl = getParentUrlFromChannelId(channelId);
      const castAdd = await farcasterClient.submitCast(
        { text: embedUrl, embeds: [{ url: embedUrl }], parentUrl },
        user.farcaster.fid,
        signer,
      );

      const { link } = await upsertCast(castAdd);
      push(link!);

      toast({ description: 'Posted!!!' });
    } catch (error) {
      console.error(error);
      toast({ description: 'Failed' });
      setPosting(false);
=======
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
>>>>>>> eab9712b686607c332090dd543433407acd98d02
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
<<<<<<< HEAD
    posting,
=======
>>>>>>> eab9712b686607c332090dd543433407acd98d02
  };
};

export default useCreateModal;
