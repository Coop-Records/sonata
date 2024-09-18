'use client';

import { useUi } from '@/providers/UiProvider';
import useCreateDialog from '@/hooks/useCreateModal';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '../ui/drawer';
import PostInput from './PostInput';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function CastPostDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { checkLoggedIn } = useUi();
  const { channelId, setChannelId, handlePost, setEmbedUrl, embedUrl } = useCreateDialog();
  const { menuItems } = useUi();

  const [selected, setSelected] = useState<number>();
  const [isChannelListOpen, setIsChannelListOpen] = useState(false);

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

  const handleClick = () => {
    if (!checkLoggedIn()) return;

    handlePost();
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="flex flex-col gap-6 p-6">
          <DrawerHeader className="p-0">
            <DrawerTitle className="text-center text-xl text-white font-clashdisplay_medium">
              Cast Song
            </DrawerTitle>
          </DrawerHeader>
          <PostInput
            placeholder="What are you listening to?"
            onChange={(e) => setEmbedUrl(e.target.value)}
            className="w-full px-4 py-[2px]"
            selected={selected}
            onClick={() => setIsChannelListOpen(true)}
          />
          {isChannelListOpen && (
            <section className="flex gap-16 overflow-x-scroll px-2 text-grey">
              {menuItems.map((item, i) => (
                <button
                  className="flex cursor-pointer items-center gap-2 py-2 text-sm/4 font-semibold outline-none"
                  onClick={() => onSelect(i)}
                  key={item.value}
                  type="button"
                >
                  <Image
                    alt={item.label}
                    src={item.icon}
                    width={24}
                    height={24}
                    className="size-6 rounded-full"
                  />
                  {item.label}
                </button>
              ))}
            </section>
          )}
          <section className="self-end">
            <Button
              className={`text-grey hover:bg-transparent ${selected ? '' : 'mr-8'}`}
              variant="ghost"
              onClick={() => setIsChannelListOpen(false)}
            >
              Cancel
            </Button>
            {((typeof selected == 'number' && selected >= 0) || embedUrl) && (
              <Button
                className="h-auto rounded-[6.25rem] px-6 py-2 !bg-white !text-background"
                onClick={handleClick}
              >
                Cast
              </Button>
            )}
          </section>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
