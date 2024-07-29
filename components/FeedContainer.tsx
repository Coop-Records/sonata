import { cn } from "@/lib/utils";
import { useFeedProvider } from "@/providers/FeedProvider";
import { useNeynarProvider } from "@/providers/NeynarProvider";
import { FeedType } from "@/types/Feed";
import { useParams } from "next/navigation";
import CreatePost from "./CreatePost";
import Header from "./Header";

export default function FeedContainer({ children }: any) {

  const { username, channelId } = useParams();
  const { user } = useNeynarProvider();
  const { feedType } = useFeedProvider();

  return (
    <>
      <Header />
      <div className="relative min-h-[600px] grow">
        <div
          className="absolute left-0 top-0 size-full overflow-scroll pt-4"
          id="feed-container"
        >
          <div className={cn("container mx-auto space-y-6", { "max-w-3xl": feedType !== FeedType.Stakes && !channelId })}>
            {user && !username && !channelId && <CreatePost />}
            {children}
          </div>
        </div>
      </div>
    </>
  );
}