import { Separator } from "@radix-ui/react-separator";
import { ShareIcon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import MediaPlayer from "../MediaPlayer";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { TrackMetadata } from "@/types/Track";
import fetchMetadata from "@/lib/fetchMetadata";
import isValidUrl from "@/lib/isValidUrl";

export default function SongPage() {
  const { toast } = useToast();
  const songLink = useParams().songLink as string[];
  const searchParams = useSearchParams();
  const [metadata, setMetadata] = useState<TrackMetadata>();

  useEffect(() => {
    const trackUrl = buildUrl();
    if (!isValidUrl(trackUrl)) return;

    fetchMetadata(
      trackUrl,
      { id: 1, alternativeEmbeds: [] } as any
    ).then(setMetadata);
  }, []);

  const buildUrl = useCallback(() => {
    let link = '';
    const query = searchParams.toString();

    if (songLink.length == 1) link = songLink[0];
    else link = songLink[0].replaceAll('%3A', ':') + '//' + songLink.slice(1).join('/');

    if (!query) return link;

    return decodeURI(`${link}?${query}`);
  }, []);

  const handleShare = async () => {
    const link = buildUrl();
    try {
      await navigator.clipboard.writeText(link);
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