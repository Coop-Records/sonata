import { useEffect, useRef, useState } from 'react';
import { OEmbedData } from '@/types/OEmbedData';
import { useSoundcloudApi } from '@/providers/SoundcloudApiProvider';
import MediaPlayer from '@/components/MediaPlayer';

const SoundCloudEmbed = ({ trackUrl }: any) => {
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [embedData, setEmbedData] = useState<OEmbedData>();
  const [iframeSrc, setIframeSrc] = useState();
  const [widget, setWidget] = useState({} as any);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const SC = useSoundcloudApi();

  const fullLoadedEmbed =
    typeof widget.play === 'function' &&
    typeof widget.pause === 'function' &&
    typeof widget.seekTo === 'function';

  useEffect(() => {
    const init = async () => {
      try {
        const oEmbedUrl = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(trackUrl)}`;
        const response = await fetch(oEmbedUrl);
        const data = await response.json();
        const srcRegex = /src="([^"]+)"/;
        const match = data.html.match(srcRegex);
        const src = match ? match[1] : null;
        setIframeSrc(src);
        setEmbedData(data);
        // eslint-disable-next-line no-empty
      } catch (error) {}
    };
    init();
  }, [trackUrl]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!(iframeSrc && SC)) return;
    const widget = SC.Widget(iframe);

    widget.bind(SC.Widget.Events.READY, function () {
      widget.bind(SC.Widget.Events.PLAY_PROGRESS, (position: any) => {
        setPosition(position.currentPosition);
      });

      widget.getDuration((duration: number) => {
        setDuration(duration);
      });
    });

    setWidget(widget);

    return () => {
      try {
        widget.unbind(SC.Widget.Events.PLAY);
        widget.unbind(SC.Widget.Events.PAUSE);
        widget.unbind(SC.Widget.Events.PLAY_PROGRESS);
      } catch (e) {
        console.error(e);
      }
    };
  }, [iframeSrc, SC]);

  return (
    <>
      {fullLoadedEmbed && (
        <MediaPlayer
          metadata={
            embedData && {
              id: trackUrl,
              type: 'soundcloud',
              artistName: embedData.author_name || '',
              trackName: embedData.title.split(' - ')[0].split(' by ')[0],
              artworkUrl: embedData.thumbnail_url,
              duration: duration,
            }
          }
          controls={{
            play: () => widget.play(),
            pause: () => widget.pause(),
            seek: (time) => widget.seekTo(time),
          }}
          position={position}
        />
      )}
      <iframe
        className="hidden"
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={iframeSrc}
        ref={iframeRef}
        key={trackUrl}
      />
    </>
  );
};

export default SoundCloudEmbed;
