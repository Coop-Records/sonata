const SpotifyEmbed = ({ trackId }: { trackId: string }) => (
  <iframe
    style={{ borderRadius: '12px' }}
    src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
    width="100%"
    height="100%"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
  />
);

export default SpotifyEmbed;
