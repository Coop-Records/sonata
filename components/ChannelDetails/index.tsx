'use client';
import { useStakeProvider } from '@/providers/StakeProvider';
import DataPoints from './DataPoints';
import StakeDialog from './StakeDialog';
import Image from 'next/image';

function ChannelDetails({ channelId = '' }) {
  const { channelDetails: channel, userStakedAmount, channelImage } = useStakeProvider();
  return (
    <div className="space-y-8">
      <div className="flex items-start gap-x-4">
        <Image src={channelImage} alt={''} height={72} width={72} className="rounded-full" />
        <div className="flex flex-col">
          <h4 className="font-clashDisplay font-semibold">{channelId}</h4>
          <h4 className="mt-1 line-clamp-1 text-sm font-light text-muted-foreground">
            {channel?.info?.description}
          </h4>
          {channel?.info?.lead && (
            <h4 className="mt-2 flex items-center gap-x-1 text-sm font-light">
              <span className="text-muted-foreground">Moderated by</span>
              <Image
                src={channel.info.lead.pfp_url}
                alt=""
                height={24}
                width={24}
                className="rounded-full"
              />
              <span>@{channel.info.lead.username}</span>
            </h4>
          )}
        </div>
      </div>
      <DataPoints channel={channel} />
      <StakeDialog balance={userStakedAmount} />
    </div>
  );
}

export default ChannelDetails;
