import extractSoundArtistAndTrack from '@/lib/sound/extractSoundArtistAndTrack';
import getSoundTrack from '@/lib/sound/getSoundTrack';
import { useEffect, useState } from 'react';

const SoundXyzEmbed = ({ url }: { url: string }) => {
  const [trackInfo, setTrackInfo] = useState<any>({});
  const src = trackInfo?.track?.audio?.audioOriginal?.url;
  const trackId = trackInfo?.id;
  const soundReferral = '0xcfbf34d385ea2d5eb947063b67ea226dcda3dc38';

  useEffect(() => {
    const init = async () => {
      const { artist, trackName } = extractSoundArtistAndTrack(url);
      const soundResponse = await getSoundTrack(artist, trackName);
      const { mintedRelease } = soundResponse;
      if (!mintedRelease) {
        console.log('SWEETS UNABLE TO GET SOUND TRACK FOR URL', url);
      }
      setTrackInfo(mintedRelease);
    };
    init();
  }, []);

  return (
    <div>
      {src && (
        <iframe
          src={`https://embed.sound.xyz/v1/release/${trackId}?referral=${soundReferral}&referral_source=embed-sound`}
          style={{ borderRadius: '8px;' }}
          width="100%"
          height="188px"
          allow="clipboard-write"
          sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
        ></iframe>
      )}
    </div>
  );
};

export default SoundXyzEmbed;
