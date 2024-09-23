'use client';
import { useToast } from '@/components/ui/use-toast';
import callPostApi from '@/lib/callPostApi';
import isValidUrl from '@/lib/isValidUrl';
import { useUserProvider } from '@/providers/UserProvider';
import { useUi } from '@/providers/UiProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useCreateDialog = () => {
  const { signer } = useUserProvider();
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const [channelId, setChannelId] = useState<string>();
  const [selected, setSelected] = useState<number>();
  const [isChannelListOpen, setIsChannelListOpen] = useState(false);
  const { menuItems, setIsCastPostOpen } = useUi();
  const { toast } = useToast();
  const router = useRouter();
  const canCast = (typeof selected == 'number' && selected >= 0) || embedUrl;

  const handlePost = () => {
    if (!isValidUrl(embedUrl)) {
      toast({ description: `Sound / Soundcloud / Spotify / Youtube only` });
      return;
    }
    if (!signer?.signer_uuid) return;

    callPostApi(signer.signer_uuid, embedUrl, channelId)
      .then(async (res) => {
        toast({ description: 'Posted!!!' });
        if (res.status == 307) {
          setIsCastPostOpen(false);
          const data = await res.json();
          router.push(data.link);
        }
      })
      .catch(() => toast({ description: 'Failed' }))
      .finally(() => {
        setEmbedUrl('');
      });
  };

  useEffect(() => {
    if (channelId == undefined && selected !== undefined) {
      setSelected(undefined);
      return;
    }

    const menuItem = menuItems.findIndex((item) => item.value == channelId);
    if (menuItem >= 0) setSelected(menuItem);
  }, [channelId]);

  const onSelect = (index: number | undefined) => {
    setSelected(index);
    const channelId = typeof index == 'number' ? menuItems[index].value : undefined;
    setChannelId(channelId);
    setIsChannelListOpen(false);
  };

  return {
    handlePost,
    embedUrl,
    setEmbedUrl,
    channelId,
    setChannelId,
    onSelect,
    isChannelListOpen,
    selected,
    setIsChannelListOpen,
    canCast,
  };
};

export default useCreateDialog;
