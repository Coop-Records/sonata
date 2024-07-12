import { Skeleton } from "../ui/skeleton";

function ChannelDetailsSkeleton({ channelId = '' }: { channelId: string }) {

  return (
    <div className='flex flex-wrap justify-between gap-x-3 gap-y-6 max-md:mt-3'>
      <div>
        <h1 className='text-2xl font-semibold'>/{channelId}</h1>
        <Skeleton className='h-6 w-52' />

        <div className='mt-4 flex flex-wrap items-end gap-x-6 gap-y-3'>
          <div>
            <Skeleton className='h-6 w-full' />
            <span className="col-span-full text-sm text-grey">Notes</span>
          </div>

          <div>
            <Skeleton className='h-6 w-full' />
            <span className="col-span-full text-sm text-grey">Staked</span>
          </div>

          <div>
            <Skeleton className='h-6 w-full' />
            <p className="col-span-full text-sm text-grey">Stakers</p>
          </div>

          <div className='grid grid-cols-[auto_1fr] items-center gap-x-1'>
            <Skeleton className='size-6' />
            <Skeleton className='h-6 w-16' />
            <span className="col-span-full text-sm text-grey">Top Song</span>
          </div>

          <div>
            <Skeleton className='h-6 w-full' />
            <p className="col-span-full text-sm/4 text-grey">Moderators</p>
          </div>
        </div>
      </div>

      <div>
        <Skeleton className='mt-2 h-14 w-48 rounded-full' />
        <Skeleton className='mt-2 h-4 w-full' />
      </div>
    </div>
  );
}

export default ChannelDetailsSkeleton;
