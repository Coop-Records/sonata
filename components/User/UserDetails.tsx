import { cn } from "@/lib/utils";
import Image from "next/image";
import ImageOverlap from "@/components/User/ImageOverlap";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const data: {img: string, username: string}[] = [
    {
        img: "/images/user.png",
        username: "@seb"
    },
    {
        img: "/images/user.png",
        username: "@coop"
    },
    {
        img: "/images/user.png",
        username: "@akhil"
    },
    {
        img: "/images/user.png",
        username: "@test111"
    },
]

const UserDetails = ({ className } : { className?: string }) => {
    return (
        <div className="flex flex-col gap-8 w-fit">
            <div className={cn('flex items-center gap-3', className)}>
        <a href={'https://warpcast.com/sweetman.eth'} target="_blank">
            <Avatar className="size-16">
                <AvatarImage src={'images/user.png'}/>
                <AvatarFallback>Akhil</AvatarFallback>
            </Avatar>
        </a>
        <div className="flex flex-col gap-2">
            <div className="flex flex-row align-middle items-center">
                <a href={'https://warpcast.com/sweetman.eth'} target="_blank" className="text-sm font-semibold leading-none">
                    Akhil
                </a>
            </div>

            <div className='flex gap-2 items-center'>
                <div className='max-h-[33px] py-2 px-4 font-semibold text-sm bg-[#F6F6F6] rounded-2xl'>#92</div>
                <div className="max-h-[33px] py-2 px-4 rounded-2xl text-sm font-semibold text-farcaster bg-[#EEE4FE]">akhil-bvs</div>

            </div>
        </div>
    </div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-8">
                <div className="flex flex-col gap-1">
                    <p className='font-semibold'>10</p>
                    <p className="font-normal text-sm text-[#949494]">Songs</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className='font-semibold'>25.6k</p >
                    <p className="font-normal text-sm text-[#949494]">Notes</p>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 ">
                        <Image className="rounded-md" width={24} height={24} src="/images/user.png" alt="Top Song" />
                           <p className="font-semibold max-w-[147px] overflow-hidden text-ellipsis text-sm">Hight on Coinb</p>
                    </div>
                    <p className="font-normal text-sm text-[#949494]">Top Song</p>
                </div>

            </div>
                <ImageOverlap data={data} />
            </div>
        </div>
    )
}

export default UserDetails
