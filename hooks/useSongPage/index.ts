import useSongAlternatives from './useSongAlternatives';
import useSongCasts from './useSongCasts';
import useSongLink from './useSongLink';
import useSongMetadata from './useSongMetadata';
import useSongMarket from './useSongMarket';

export default function useSongPage() {
  const { songLink } = useSongLink();
  const { alternatives } = useSongAlternatives(songLink);
  const { metadata } = useSongMetadata(songLink);
  const { posts, loading } = useSongCasts(songLink);
  const { totalNotes, songLinks, collection } = useSongMarket(songLink);

  return {
    songLink,
    totalNotes,
    songLinks,
    collection,
    metadata,
    alternatives,
    posts,
    postsLoading: loading,
  };
}
