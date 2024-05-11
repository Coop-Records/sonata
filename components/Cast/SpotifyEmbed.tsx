import MediaPlayer from '@/components/MediaPlayer';
import { SupabasePost } from '@/types/SupabasePost';
import useSpotifyIframe from '@/hooks/useSpotifyIframe';
import SoundCloudEmbed from './SoundCloudEmbed';

export default function SpotifyEmbed({ trackUrl, cast }: { trackUrl: string; cast: SupabasePost }) {
  const { soundcloudUrl, playMusic, embedData, iframeSrc, iframeRef, pauseMusic, isReady } =
    useSpotifyIframe(trackUrl);

  if (!embedData) return <></>;

  return (
    <>
      {soundcloudUrl ? (
        <SoundCloudEmbed trackUrl={soundcloudUrl} cast={cast} />
      ) : (
        <div className="relative z-0 w-full">
          <MediaPlayer
            metadata={
              embedData && {
                id: trackUrl,
                type: 'spotify',
                artistName: '',
                trackName: embedData.title,
                artworkUrl: embedData.thumbnail_url,
                duration: 0,
              }
            }
            controls={
              isReady
                ? {
                    play: playMusic,
                    pause: pauseMusic,
                    seek: () => {},
                  }
                : null
            }
            position={0}
            cast={cast}
          />
          <iframe
            className="absolute -z-10 size-1 scale-0 overflow-hidden"
            style={{
              clip: 'rect(0 0 0 0)',
              clipPath: 'inset(50%)',
              position: 'absolute',
            }}
            width="1"
            height="1"
            allow="autoplay"
            src={iframeSrc}
            ref={iframeRef}
            id={trackUrl}
          />
        </div>
      )}
    </>
  );
}
