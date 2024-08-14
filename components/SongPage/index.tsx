import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { useSongPageProvider } from "@/providers/SongPageProvider";
import { Separator } from "@radix-ui/react-separator";
import { ShareIcon } from "lucide-react";
import MediaPlayer from "../MediaPlayer";
import { Button } from "../ui/button";
import SongAlternatives from "./Alternatives";
import TotalNotes from "./TotalNotes";

export default function SongPage() {
  const { metadata } = useSongPageProvider();
  const { copy } = useCopyToClipboard();
  const handleShare = () => copy(window.location.href);

  return (
    <main className="flex grow items-center justify-center">
      <div className="w-full space-y-4 ">
        <MediaPlayer metadata={metadata} />
        <div className="flex justify-between">
          <TotalNotes />
          <Button
            className="w-9 h-auto p-0 text-muted-foreground outline-none hover:bg-transparent"
            onClick={handleShare}
            variant="ghost"
            title="share">
            <ShareIcon />
          </Button>
        </div>
        <Separator className="bg-muted h-px" />
        <SongAlternatives />
      </div>
    </main>
  )
}