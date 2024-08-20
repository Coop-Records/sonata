import { usePlayer } from "@/providers/audio/PlayerProvider";
import { EPlayer, EventPlayer, GlobalPlayerId, IGlobalPlayerEventMap } from "@/types/GlobalPlayer";
import { useCallback } from "react";

declare global {
  interface HTMLElementEventMap extends IGlobalPlayerEventMap { }
}

export default function usePlayerActions() {
  const [player, dispatch] = usePlayer();

  const onEnd = useCallback((callback: (e: EventPlayer) => void) => {
    const element = document.getElementById(GlobalPlayerId);
    element?.addEventListener(EPlayer.End, callback);
    return () => element?.removeEventListener(EPlayer.End, callback);
  }, []);

  const onNext = useCallback((callback: (e: EventPlayer) => void) => {
    const element = document.getElementById(GlobalPlayerId);
    element?.addEventListener(EPlayer.Next, callback);
    return () => element?.removeEventListener(EPlayer.Next, callback);
  }, []);

  const onPrevious = useCallback((callback: (e: EventPlayer) => void) => {
    const element = document.getElementById(GlobalPlayerId);
    element?.addEventListener(EPlayer.Prev, callback);
    return () => element?.removeEventListener(EPlayer.Prev, callback);
  }, []);

  return { onEnd, onPrevious, onNext, player, dispatch };
};