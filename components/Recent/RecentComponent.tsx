'use client';

import useFeed from "@/hooks/useFeed";
import Feed from "../Feed";

export default function RecentComponent() {
  const { feed } = useFeed();
  
  feed.sort((cast1: any, cast2: any) => {
    return cast2.reactions.likes.length - cast1.reactions.likes.length;
  });
  
  return feed?.length > 0 ? <Feed feed={feed} /> : <></>;
}
  