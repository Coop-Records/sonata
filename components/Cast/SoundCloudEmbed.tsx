import { useEffect, useRef, useState } from 'react';
import SC from '@/lib/soundcloud/mediaApi';
import CustomEmbed from './CustomEmbed';

const SoundCloudEmbed = ({ trackUrl }: any) => {
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [embedData, setEmbedData] = useState({} as any);
  const [widget, setWidget] = useState({} as any);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const init = async () => {
      const oEmbedUrl = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(trackUrl)}`;
      const response = await fetch(oEmbedUrl);
      const data = await response.json();
      const srcRegex = /src="([^"]+)"/;
      const match = data.html.match(srcRegex);
      const src = match ? match[1] : null;
      setEmbedData({ ...data, src });
      setLoading(false);
    };
    init();
  }, [trackUrl]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!(iframe && embedData.src)) return;
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
  }, [iframeRef.current, embedData.src]);

  if (loading) return <></>;

  return (
    <div className="w-full z-0 relative">
      <CustomEmbed
        artistName={embedData.author_name}
        trackName={embedData.title.split(' - ')[0].split(' by ')[0]}
        artworkUrl={embedData.thumbnail_url}
        onPause={() => widget.pause()}
        onPlay={() => widget.play()}
        playing={playing}
        duration={duration}
        position={position}
      />
      <div className="absolute top-0 left-0 -z-10 opacity-0">
        <iframe
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={embedData.src}
          ref={iframeRef}
        />
      </div>
    </div>
  );
};

export default SoundCloudEmbed;
