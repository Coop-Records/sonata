import { useParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function useSongLink() {
  const searchParams = useSearchParams();
  const songLinkParam = useParams().songLink as string[];

  const songLink = useMemo(() => {
    let link = '';
    const query = searchParams.toString();

    if (songLinkParam.length == 1) link = songLinkParam[0];
    else {
      link = songLinkParam[0].replaceAll('%3A', ':') +
        '//' + songLinkParam.slice(1).join('/');
    }

    if (!query) return link;

    return decodeURI(`${link}?${query}`);
  }, []);

  return { songLink };
}