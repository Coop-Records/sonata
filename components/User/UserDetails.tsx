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
                <div className="max-h-[33px] py-2 flex items-center gap-1 px-4 rounded-2xl text-sm font-semibold text-farcaster bg-[#EEE4FE]">
                    <svg width="16" height="14" viewBox="0 0 323 297" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M55.5867 0.733337H263.413V296.267H232.907V160.893H232.607C229.236 123.479 197.792 94.16 159.5 94.16C121.208 94.16 89.7642 123.479 86.3926 160.893H86.0933V296.267H55.5867V0.733337Z"
                            fill="#8B49F7"/>
                        <path
                            d="M0.293335 42.68L12.6867 84.6267H23.1733V254.32C17.9082 254.32 13.64 258.588 13.64 263.853V275.293H11.7333C6.46822 275.293 2.2 279.562 2.2 284.827V296.267H108.973V284.827C108.973 279.562 104.705 275.293 99.44 275.293H97.5333V263.853C97.5333 258.588 93.2651 254.32 88 254.32H76.56V42.68H0.293335Z"
                            fill="#8B49F7"/>
                        <path
                            d="M234.813 254.32C229.548 254.32 225.28 258.588 225.28 263.853V275.293H223.373C218.108 275.293 213.84 279.562 213.84 284.827V296.267H320.613V284.827C320.613 279.562 316.345 275.293 311.08 275.293H309.173V263.853C309.173 258.588 304.905 254.32 299.64 254.32V84.6267H310.127L322.52 42.68H246.253V254.32H234.813Z"
                            fill="#8B49F7"/>
                    </svg>

                    akhil-bvs
                </div>

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
                        <p className='font-semibold'>25.6k</p>
                        <p className="font-normal text-sm text-[#949494]">Notes</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 ">
                            <Image className="rounded-md" width={24} height={24} src="/images/user.png" alt="Top Song"/>
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
