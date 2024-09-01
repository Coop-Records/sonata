import useSongAlternatives from "./useSongAlternatives";
import useSongCasts from "./useSongCasts";
import useSongLink from "./useSongLink";
import useSongMetadata from "./useSongMetadata";
import useTotalNotes from "./useTotalNotes";

export default function useSongPage() {
  const { songLink } = useSongLink();
  const { alternatives } = useSongAlternatives(songLink);
  const { metadata } = useSongMetadata(songLink);
  const { posts, loading } = useSongCasts(songLink, alternatives);
  const songMarket = useTotalNotes(songLink);

  return { songLink, ...songMarket, metadata, alternatives, posts, postsLoading: loading };
}