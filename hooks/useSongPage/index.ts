import useSongAlternatives from "./useSongAlternatives";
import useSongCasts from "./useSongCasts";
import useSongLink from "./useSongLink";
import useSongMetadata from "./useSongMetadata";

export default function useSongPage() {
  const { songLink } = useSongLink();
  const { alternatives } = useSongAlternatives(songLink);
  const { metadata } = useSongMetadata(songLink);
  const { posts, loading } = useSongCasts(songLink, alternatives);

  const totalNotes = loading ? undefined : posts.reduce((prev, curr) => prev + (curr.points ?? 0), 0);
console.log("SWEETS GET totalNotes via API instead of client side", totalNotes)
  return { songLink, totalNotes, metadata, alternatives, posts, postsLoading: loading };
}