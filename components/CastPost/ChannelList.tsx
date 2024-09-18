import { useUi } from '@/providers/UiProvider';
import Image from 'next/image';

const ChannelList = ({ onSelect }: { onSelect: (index: number) => void }) => {
  const { menuItems } = useUi();

  return (
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
  );
};

export default ChannelList;
