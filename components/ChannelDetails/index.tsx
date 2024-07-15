import useChannelDetails from "@/hooks/useChannelDetails";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";

function ChannelDetails({ image = '', channelId = '' }) {
  const { moderators, channel } = useChannelDetails(channelId);
  const channelImage = channel?.image_url ?? image;

  return (
    <div className='mb-8'>
      <Image
        src={channelImage}
        height={120}
        width={120}
        className='-mt-14 mb-4 size-[120px] rounded-full border-[5px] border-white object-cover max-md:hidden'
        alt={channelId}
      />
      <div className='flex flex-wrap justify-between gap-x-3 gap-y-6 max-md:mt-3'>
        <div>
          <h1 className='text-2xl font-semibold'>/{channelId}</h1>
          <h4 className='text-base font-normal text-[#141A1EB2] md:max-w-[600px]'>{channel?.description}</h4>

          <div className='mt-4 flex flex-wrap items-end gap-x-6 gap-y-3'>
            <div className='grid grid-cols-[auto_1fr] gap-x-1'>
              <span className="font-sora text-base/[17px] font-semibold">0</span>
              <Image src="/images/notes.png" width={16} height={16} alt="notes" />
              <span className="col-span-full text-sm text-grey">Notes</span>
            </div>

            <div className='grid grid-cols-[auto_1fr] gap-x-1'>
              <span className="font-sora text-base/[17px] font-semibold">0</span>
              <Image src="/images/notes.png" width={16} height={16} alt="notes" />
              <span className="col-span-full text-sm text-grey">Staked</span>
            </div>

            <div>
              <p className="font-sora text-base/[17px] font-semibold">0</p>
              <p className="col-span-full text-sm text-grey">Stakers</p>
            </div>

            <div className='grid grid-cols-[auto_1fr] items-center gap-x-1'>
              <Image className='size-6 rounded-md object-cover' src={channelImage} width={24} height={24} alt="song" />
              <span className="font-sora text-base/[17px] font-semibold">-</span>
              <span className="col-span-full text-sm text-grey">Top Song</span>
            </div>

            <div>
              <div className="flex">
                {moderators.map((moderator, i) => (
                  <Image
                    key={moderator.fid}
                    src={moderator.pfp_url}
                    width={24}
                    height={24}
                    alt={moderator.display_name}
                    className={cn('rounded-3xl size-6 object-cover', { 'translate-x-[-8px]': i == 1 })}
                  />
                ))}
              </div>
              <p className="col-span-full text-sm/4 text-grey">Moderators</p>
            </div>
          </div>
        </div>

        <div className='text-center'>
          <Button className="h-auto rounded-full px-9 py-4 text-base font-normal">STAKE NOTES</Button>
          <p className='mt-2 text-sm font-semibold'>
            <span className='text-sm font-normal text-grey'>Staked: </span>
            0 NOTES
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChannelDetails;