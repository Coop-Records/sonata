import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import fetchMetadata from "@/lib/fetchMetadata";
import isValidUrl from "@/lib/isValidUrl";
import { TrackMetadata } from "@/types/Track";
import { Separator } from "@radix-ui/react-separator";
import { ShareIcon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import MediaPlayer from "../MediaPlayer";
import { Button } from "../ui/button";
import SongAlternatives from "./Alternatives";
import { uniqueId } from "lodash";

export default function SongPage() {
  const songLink = useParams().songLink as string[];
  const searchParams = useSearchParams();
  const [metadata, setMetadata] = useState<TrackMetadata>();
  const { copy } = useCopyToClipboard();

  useEffect(() => {
    const trackUrl = buildUrl();
    if (!isValidUrl(trackUrl)) return;

    fetchMetadata(
      trackUrl,
      { id: (new Date()).getTime(), alternativeEmbeds: [] } as any
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

  const handleShare = () => copy(window.location.href);

  return (
    <main className="flex grow items-center justify-center">
      <div className="w-full space-y-4 ">
        <MediaPlayer metadata={metadata} />
        <div className="flex justify-end">
          <Button
            className="w-9 h-auto p-0 text-muted-foreground outline-none hover:bg-transparent"
            onClick={handleShare}
            variant="ghost"
            title="share">
            <ShareIcon />
          </Button>
        </div>
        <Separator className="bg-muted h-px" />
        <SongAlternatives trackUrl={buildUrl()} />
      </div>
    </main>
  )
}