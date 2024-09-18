'use client';

import { useUi } from '@/providers/UiProvider';
import useCreateDialog from '@/hooks/useCreateModal';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '../ui/drawer';
import PostInput from './PostInput';
import Image from 'next/image';

export default function CastPostDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { checkLoggedIn } = useUi();
  const {
    handlePost,
    setEmbedUrl,
    embedUrl,
    onSelect,
    selected,
    isChannelListOpen,
    setIsChannelListOpen,
  } = useCreateDialog();
  const { menuItems } = useUi();

  const handleClick = () => {
    if (!checkLoggedIn()) return;

    handlePost();
  };

  const handleCancel = () => {
    if (isChannelListOpen) {
      setIsChannelListOpen(false);
      return;
    }
    setOpen(false);
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
          <section className="flex gap-3 self-end">
            <button
              className={`py-2 text-grey hover:bg-transparent ${typeof selected == 'number' && selected >= 0 ? '' : 'mr-[96px]'}`}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            {((typeof selected == 'number' && selected >= 0) || embedUrl) && (
              <button
                className="rounded-[6.25rem] px-6 py-2 !bg-white !text-background"
                onClick={handleClick}
                type="button"
              >
                Cast
              </button>
            )}
          </section>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
