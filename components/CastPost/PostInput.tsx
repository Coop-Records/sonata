import { ChangeEvent } from 'react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useUi } from '@/providers/UiProvider';
import { ChevronDown, Globe } from 'lucide-react';

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder: string;
  className?: string;
  selected?: number | undefined;
  onClick?: () => void;
}

function PostInput({ onClick, onChange, value, selected, placeholder, className }: Props) {
  const { menuItems } = useUi();

  return (
    <div
      className={cn(
        'flex grow items-center justify-between rounded-[100px] bg-background-light p-3',
        className,
      )}
    >
      <Input
        value={value}
        className="border-none bg-transparent text-grey focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder={placeholder}
        onChange={onChange}
      />
      <button
        className="flex items-center justify-center gap-1 rounded-[6.25rem] border border-[#D7D6D5] px-2 py-1 text-shadowgreen outline-none hover:opacity-80"
        title="channel selector"
        onClick={onClick}
      >
        {typeof selected == 'number' ? (
          <Image
            src={menuItems[selected].icon}
            width={24}
            height={24}
            className="size-6 rounded-full"
            alt="selected"
          />
        ) : (
          <Globe size={24} className="text-grey" />
        )}
        <ChevronDown className="size-4 shrink-0 text-grey" />
      </button>
    </div>
  );
}

export default PostInput;
