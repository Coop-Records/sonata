import { cn } from '@/lib/utils';
import { useUi } from '@/providers/UiProvider';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown, Globe } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  className?: string;
  value?: string;
  handleSelect?: (menuValue: string | undefined) => void;
};

const Dropdown = ({ handleSelect, className, value }: Props) => {
  const { menuItems } = useUi();
  const [selected, setSelected] = useState<number>();

  useEffect(() => {
    if (value == undefined && selected !== undefined) {
      setSelected(undefined);
      return;
    }

    const menuItem = menuItems.findIndex(item => item.value == value);
    if (menuItem >= 0) setSelected(menuItem);
  }, [value])

  const onSelect = (index: number | undefined) => {
    setSelected(index);
    const channelId = typeof index == 'number' ? menuItems[index].value : undefined;
    if (handleSelect) handleSelect(channelId);
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="w-[4.25rem] rounded-full flex gap-1 items-center justify-center px-2 py-1 text-shadowgreen border border-[#D7D6D5] outline-none hover:opacity-80"
          title='channel selector'
          aria-label="channel selector">
          {typeof selected == 'number' ? (
            <Image
              src={menuItems[selected].icon}
              width={24}
              height={24}
              className='size-6 rounded-full'
              alt='selected'
            />
          ) : <Globe size={24} />}
          <ChevronDown className='size-4 shrink-0' />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={cn("max-h-[350px] overflow-y-scroll scrollbar-thin bg-white rounded-md py-2 shadow-md", className)}
          sideOffset={10}>
          <DropdownMenu.Item
            className="text-sm/4 font-semibold flex gap-2 items-center cursor-pointer select-none outline-none px-4 py-2 hover:bg-grey-light"
            onSelect={() => onSelect(undefined)}>
            <Globe size={24} />
            /none
          </DropdownMenu.Item>
          {menuItems.map((item, i) => (
            <DropdownMenu.Item
              className="text-sm/4 font-semibold flex gap-2 items-center cursor-pointer select-none outline-none px-4 py-2 hover:bg-grey-light"
              onSelect={() => onSelect(i)}
              key={item.value}>
              <Image alt={item.label} src={item.icon} width={24} height={24} className='size-6 rounded-full' />
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;