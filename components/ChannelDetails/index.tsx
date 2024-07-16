import useChannelDetails from "@/hooks/useChannelDetails";
import Image from "next/image";
import DataPoints from "./DataPoints";
import Skeleton from "./Skeleton";
import StakeDialog from "./StakeDialog";

function ChannelDetails({ image = '', channelId = '' }) {
  const { moderators, channel, userStakedAmount, loading, signedIn } = useChannelDetails(channelId);

  return (
    <div className='mb-8'>
      <Image
        src={channel.info?.image_url ?? image}
        height={120}
        width={120}
        className='-mt-14 mb-4 size-[120px] rounded-full border-[5px] border-white object-cover max-md:hidden'
        alt={channelId}
      />
      {loading ? <Skeleton channelId={channelId} /> : (
        <div className='flex flex-wrap justify-between gap-x-3 gap-y-6 max-md:mt-3'>
          <div>
            <h1 className='text-2xl font-semibold'>/{channelId}</h1>
            <h4 className='text-base font-normal text-[#141A1EB2] md:max-w-[600px]'>{channel.info?.description}</h4>

            <DataPoints channel={channel} moderators={moderators} />
          </div>
          <StakeDialog balance={userStakedAmount} disabled={!signedIn} />
        </div>
      )}
    </div>
  );
}

export default ChannelDetails;