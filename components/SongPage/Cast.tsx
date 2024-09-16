'use client';
import { SupabasePost } from '@/types/SupabasePost';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { timeFromNow } from '@/lib/utils';
import Image from 'next/image';

const Cast = ({ cast = {} as SupabasePost }: { cast: SupabasePost }) => {
  const { author } = cast;
  return (
    <div className="w-full justify-between flex">
      <div className="flex space-x-2 items-center">
        <Link href={`/${author.username}`}>
          <Avatar className="size-4">
            <AvatarImage src={author.pfp_url} />
            <AvatarFallback>{author.display_name}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-1 text-grey text-[10px]">
            <a href={`/${author.username}`} target="_blank" className="leading-none flex gap-1">
              <p className="truncate max-w-[50px]">{author.display_name}</p> posted
            </a>
            {author.power_badge && (
              <Image src="/images/hypersub.png" width={20} height={20} alt="" />
            )}
          </div>
        </div>
      </div>
      {cast.created_at && <span className="leading-none">{timeFromNow(cast.created_at)} ago</span>}
    </div>
  );
};

export default Cast;
