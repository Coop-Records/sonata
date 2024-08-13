import { Separator } from "@radix-ui/react-separator";
import { ShareIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MediaPlayer from "../MediaPlayer";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { TrackMetadata } from "@/types/Track";
import fetchMetadata from "@/lib/fetchMetadata";
import isValidUrl from "@/lib/isValidUrl";

export default function SongPage() {
  const { toast } = useToast();
  const trackUrl = useSearchParams().get('trackUrl');
  const [metadata, setMetadata] = useState<TrackMetadata>();

  useEffect(() => {
    if (!trackUrl) return;
    if (!isValidUrl(trackUrl)) return;

    fetchMetadata(
      trackUrl,
      { id: 1, alternativeEmbeds: [] } as any
    ).then(setMetadata);
  }, [trackUrl]);

  const handleShare = async () => {
    if (!metadata) return;
    try {
      await navigator.clipboard.writeText(metadata.url);
      toast({ title: 'Copied!', description: 'URL copied to clipboard.' });
    } catch (error) {
      console.error('Failed to copy URL to clipboard:', error);
    }
  };

  return (
    <main className="flex grow items-center justify-center">
      <div className="w-full space-y-4 ">
        <MediaPlayer metadata={metadata} />
        <div className="flex justify-end">
          <Button
            className="w-9 h-auto p-0 text-muted-foreground outline-none hover:bg-transparent"
            onClick={handleShare}
            variant="ghost">
            <ShareIcon />
          </Button>
        </div>
        <Separator className="bg-muted h-px" />
      </div>
    </main>
  )
}