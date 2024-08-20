import { Button } from '@/components/ui/button';
import { usePlayer } from '@/providers/audio/PlayerProvider';
import { EPlayer, GlobalPlayerId } from '@/types/GlobalPlayer';
import Image from 'next/image';
import { useCallback } from 'react';
import { MdPauseCircle, MdPlayCircle } from 'react-icons/md';

const PlayerButtons = () => {
  const [player, dispatch] = usePlayer();
  const metadata = player.metadata;

  const handleDirection = useCallback((id: 1 | 0) => {
    const eId = id ? EPlayer.Next : EPlayer.Prev;
    const event = new CustomEvent(eId, { detail: metadata });
    document.getElementById(GlobalPlayerId)?.dispatchEvent(event);
  }, [metadata]);

  const handleAction = () => {
    if (metadata) dispatch({
      type: player.playing ? 'PAUSE' : 'RESUME',
      payload: { id: metadata.id }
    })
  };

  return (
    <div className="flex items-center">
      <Button onClick={() => handleDirection(0)} className="bg-white">
        <Image src="/images/skip-back.png" width={22} height={22} alt="" />
      </Button>

      <Button
        onClick={handleAction}
        variant="ghost"
        className="rounded-full p-0"
      >
        {player.playing ? (
          <MdPauseCircle className="text-4xl" />
        ) : (
          <MdPlayCircle className="text-4xl" />
        )}
      </Button>
      <Button onClick={() => handleDirection(1)} className="bg-white">
        <Image src="/images/skip-forward.png" width={22} height={22} alt="" />
      </Button>
    </div>
  );
};

export default PlayerButtons;
