'use client';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useUi } from '@/providers/UiProvider';
import { useParams } from 'next/navigation';

export default function ChannelFilter() {
  const { channelId } = useParams();
  const { menuItems } = useUi();

  return (
    <div className="flex grow flex-col">
      <h2 className="mb-2 font-semibold text-white">Channels</h2>
      <div className="grow basis-0 overflow-y-auto scrollbar-thin md:-mr-16 md:pr-12">
        {menuItems.map((option) => {
          const active = channelId === option.value;
          return (
            <Link
              href={active ? '/' : `/channel/${option.value}`}
              key={option.value}
              className={cn(
                'flex px-6 py-2 justify-start items-center gap-2 w-full font-semibold text-sm text-white',
                active && 'rounded-xl bg-grey-light',
              )}
            >
              <div className="relative size-6 overflow-hidden rounded-full">
                <Image
                  src={option.icon}
                  fill
                  alt=""
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>

              <span>{option.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
