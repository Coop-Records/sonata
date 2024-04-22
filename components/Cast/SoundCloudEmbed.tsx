import { useEffect, useRef, useState } from 'react';
import { OEmbedData } from '@/types/OEmbedData';
import { useSoundcloudApi } from '@/providers/SoundcloudApiProvider';
import MediaPlayer from '@/components/MediaPlayer';

const SoundCloudEmbed = ({ trackUrl }: any) => {
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [embedData, setEmbedData] = useState<OEmbedData>();
  const [iframeSrc, setIframeSrc] = useState();
  const [widget, setWidget] = useState({} as any);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const SC = useSoundcloudApi();

  useEffect(() => {
    const init = async () => {
      const oEmbedUrl = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(trackUrl)}`;
      const response = await fetch(oEmbedUrl);
      const data = await response.json();
      const srcRegex = /src="([^"]+)"/;
      const match = data.html.match(srcRegex);
      const src = match ? match[1] : null;
      setIframeSrc(src);
      setEmbedData(data);
    };
    init();
  }, [trackUrl]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!(iframe && iframeSrc)) return;
    const widget = SC.Widget(iframe);

    widget.bind(SC.Widget.Events.READY, function () {
      widget.bind(SC.Widget.Events.PLAY, () => {
        setPlaying(true);
      });

      widget.bind(SC.Widget.Events.PAUSE, () => {
        setPlaying(false);
      });

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
  }, [iframeRef.current, iframeSrc]);

  if (!embedData) return <></>;

  return (
    <>
      <MediaPlayer
        artistName={embedData.author_name || ''}
        trackName={embedData.title.split(' - ')[0].split(' by ')[0]}
        artworkUrl={embedData.thumbnail_url}
        onPause={() => widget.pause()}
        onPlay={() => widget.play()}
        playing={playing}
        duration={duration}
        position={position}
      />
      <iframe
        className="hidden"
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={iframeSrc}
        ref={iframeRef}
      />
    </>
  );
};

export default SoundCloudEmbed;
