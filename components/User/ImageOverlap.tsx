"use client"
import Image from 'next/image';
import type { FC } from "react";

interface IImageOverlap {
    data: {
        img: string, username: string
    }[]
}

const ImageOverlap: FC<IImageOverlap> = ({ data } ) => {
    const mutalFriends = data.length > 3 ? data.slice(0, 3) : data;

    return (
        <div className="flex items-center gap-2 h-8 min-w-[464px]">
            <div className="relative flex h-8  w-[48px]">
                {mutalFriends.map((element, index) => (
                    <Image
                        key={index}
                        width={24}
                        height={24}
                        src={element.img}
                        style={{left: index * 12}}
                        alt={element.username}
                        className={`w-6 h-6 absolute z-${index + 1} rounded-full`}
                    />
            ))}
            </div>

            <p className="font-normal text-[#949494] text-sm">
               Followed by{" "}
                {mutalFriends.map((element,index) => index === mutalFriends.length - 1 ? element.username : element.username + ", ")}
                {data.length > 3 ? ` and more  ${data.length - 3} friend${data.length - 3 > 1 ? 's' : '' }.` : ''}
            </p>
        </div>
    );
};

export default ImageOverlap;
