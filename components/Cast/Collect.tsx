import { Button } from '@/components/ui/button';
import { TrackMetadata } from '@/types/Track';

type MediaPlayerProps = {
  metadata?: TrackMetadata;
};

export default function Collect({ metadata }: MediaPlayerProps) {
  const handleClick = () => {
    if (!metadata) return;

    let url = '';
    if (metadata.type === 'soundxyz') {
      url = 'https://sound.xyz/your-drop-url';
    } else if (metadata.type === 'zora') {
      url = 'https://zora.co/your-drop-url';
    }

    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div>
      {(metadata?.type === 'soundxyz' || metadata?.type === 'zora') && (
        <Button
          onClick={handleClick}
          className="flex items-center gap-2 rounded-full bg-[#333536] px-4 py-1.5 text-white"
        >
          Collect
        </Button>
      )}
    </div>
  );
}
