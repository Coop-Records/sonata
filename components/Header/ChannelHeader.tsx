'use client';
import { useStakeProvider } from '@/providers/StakeProvider';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Avatar } from '../ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

const ChannelHeader = () => {
  const { channelImage } = useStakeProvider();
  const { channelId } = useParams();

  return (
    <main className="pr-6 mb-4">
      <div className="flex gap-2 my-4 items-center">
        <Image
          src={channelImage ?? ''}
          height={72}
          width={72}
          className="size-[72px] rounded-full object-cover"
          alt={channelId as string}
        />
        <div>
          <p className="text-white font-clashdisplay_medium text-md">{channelId as string}</p>
          <div className="text-grey text-sm font-clashdisplay flex flex-wrap items-center">
            Discussions about all types of music
            <div className="flex items-center">
              Moderated by&nbsp;
              <Avatar className="size-4 cursor-pointer">
                <AvatarImage
                  className="object-cover object-center"
                  src={'https://i.imgur.com/Hf9CCmq.jpg'}
                />
                <AvatarFallback>akhil_bvs</AvatarFallback>
              </Avatar>
              &nbsp;<span className="text-white">@akhil_bvs</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChannelHeader;
