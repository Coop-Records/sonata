import fetchMetadata from "@/lib/fetchMetadata";
import isValidUrl from "@/lib/isValidUrl";
import { TrackMetadata } from "@/types/Track";
import { useEffect, useState } from "react";

export default function useSongMetadata(songLink: string) {
  const [metadata, setMetadata] = useState<TrackMetadata>();

  useEffect(() => {
    if (!isValidUrl(songLink)) return;

    fetchMetadata(songLink, {
      id: (new Date()).getTime(),
      alternativeEmbeds: []
    } as any
    ).then(setMetadata);
  }, [songLink]);

  return { metadata };
}