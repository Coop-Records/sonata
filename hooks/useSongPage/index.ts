import useSongAlternatives from "./useSongAlternatives";
import useSongCasts from "./useSongCasts";
import useSongLink from "./useSongLink";
import useSongMetadata from "./useSongMetadata";
import useSongMarket from "./useSongMarket";

export default function useSongPage() {
  const { songLink } = useSongLink();
  const { alternatives } = useSongAlternatives(songLink);
  const { metadata } = useSongMetadata(songLink);
  const { posts, loading } = useSongCasts(songLink, alternatives);
  const songMarket = useSongMarket(songLink);

  return { songLink, ...songMarket, metadata, alternatives, posts, postsLoading: loading };
}