import useChannelDetails from "@/hooks/useChannelDetails";
import formatNumber from "@/lib/formatNumber";
import Image from "next/image";
import { Button } from "../ui/button";
import DataPoints from "./DataPoints";
import Skeleton from "./Skeleton";

function ChannelDetails({ image = '', channelId = '' }) {
  const { moderators, channel, userStakedAmount, loading, signedIn } = useChannelDetails(channelId);

  return (
    <div className='mb-8'>
      <Image
        src={channel.info?.image_url ?? image}
        height={120}
        width={120}
        className='-mt-14 mb-4 rounded-full border-[5px] border-white max-md:hidden'
        alt={channelId}
      />
      {loading ? <Skeleton channelId={channelId} /> : (
        <div className='flex flex-wrap justify-between gap-x-3 gap-y-6 max-md:mt-3'>
          <div>
            <h1 className='text-2xl font-semibold'>/{channelId}</h1>
            <h4 className='text-base font-normal text-[#141A1EB2]'>{channel.info?.description}</h4>

            <DataPoints channel={channel} moderators={moderators} />
          </div>

          <div className='text-center'>
            <Button
              disabled={!signedIn}
              className="h-auto rounded-full px-9 py-4 text-base font-normal">
              STAKE NOTES
            </Button>
            <p className='mt-2 text-sm font-semibold'>
              <span className='text-sm font-normal text-grey'>Staked: </span>
              {formatNumber(userStakedAmount)} NOTES
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChannelDetails;