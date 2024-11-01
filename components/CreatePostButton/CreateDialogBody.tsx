import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Globe, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { isNil } from 'lodash';
import { cn } from '@/lib/utils';
import PostInput from './PostInput';
import { useState } from 'react';
import { useUi } from '@/providers/UiProvider';

const CreateDialogBody = ({
  handleTextChange,
  onPost,
  setChannelId,
  channelId,
  loading,
  setIsOpen,
}: any) => {
  const { menuItems } = useUi();

  const [selectingChannel, setSelectingChannel] = useState(false);

  const handleSelect = (channelId: string | null) => {
    setSelectingChannel(false);
    setChannelId(channelId);
  };

  const selected = menuItems.find((item: any) => item.value === channelId);
  return (
    <>
      <PostInput
        placeholder="What are you listening to?"
        onChange={handleTextChange}
        className="w-full px-4 py-[2px]"
        action={
          <button
            className="flex items-center justify-center gap-1 rounded-full border border-muted-foreground px-2 py-1 text-muted-foreground outline-none hover:opacity-80"
            title="channel selector"
            aria-label="channel selector"
            onClick={() => setSelectingChannel(!selectingChannel)}
          >
            {!isNil(selected) ? (
              <Image
                src={selected.icon}
                width={24}
                height={24}
                className="size-6 rounded-full"
                alt="selected"
              />
            ) : (
              <Globe size={24} />
            )}
            {selectingChannel ? (
              <ChevronUp className="size-4 shrink-0" />
            ) : (
              <ChevronDown className="size-4 shrink-0" />
            )}
          </button>
        }
      />
      {selectingChannel && (
        <div className="flex w-full overflow-x-scroll scrollbar-thin">
          <button
            className="flex shrink-0 cursor-pointer select-none items-center gap-2 rounded-full px-2 py-1 text-sm/4 font-semibold outline-none hover:bg-accent"
            onClick={() => handleSelect(null)}
          >
            <Globe size={24} />
            /none
          </button>
          {menuItems.map((item) => (
            <button
              className="flex shrink-0 cursor-pointer select-none items-center gap-2 rounded-full px-2 py-1 text-sm/4 font-semibold outline-none hover:bg-accent"
              onClick={() => handleSelect(item.value)}
              key={item.value}
            >
              <Image
                alt={item.value}
                src={item.icon}
                width={24}
                height={24}
                className="size-6 rounded-full"
              />
              {item.value}
            </button>
          ))}
        </div>
      )}
      <div className="self-end">
        <Button
          className="font-thin text-muted-foreground hover:bg-transparent"
          variant="ghost"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
        <Button
          className={cn(
            'h-auto rounded-full px-4 py-2',
            selectingChannel && 'opacity-0 pointer-events-none',
          )}
          onClick={onPost}
          disabled={loading}
        >
          {loading ? (
            <>
              Casting <Loader2 className="animate-spin" size={16} />
            </>
          ) : (
            <>Cast</>
          )}
        </Button>
      </div>
    </>
  );
};

export default CreateDialogBody;
