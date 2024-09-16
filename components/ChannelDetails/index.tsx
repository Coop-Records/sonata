import { useStakeProvider } from '@/providers/StakeProvider';
import DataPoints from './DataPoints';
import Skeleton from './Skeleton';
import StakeDialog from './StakeDialog';

function ChannelDetails({ channelId = '' }) {
  const { loading, channelDetails: channel, userStakedAmount } = useStakeProvider();

  return (
    <div className="mb-8">
      {loading ? (
        <Skeleton channelId={channelId} />
      ) : (
        <div className="flex flex-wrap justify-between gap-x-3 gap-y-6 max-md:mt-3">
          <div>
            <h1 className="text-2xl font-semibold">/{channelId}</h1>
            <h4 className="text-base font-normal text-[#141A1EB2] md:max-w-[600px]">
              {channel.info?.description}
            </h4>

            <DataPoints channel={channel} moderators={channel.moderators} />
          </div>
          <StakeDialog balance={userStakedAmount} />
        </div>
      )}
    </div>
  );
}

export default ChannelDetails;
