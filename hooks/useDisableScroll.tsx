import { useEffect, useRef } from 'react';
import styles from './disableScroll.module.css';

export default function useDisableScroll(shouldDisable: boolean) {
  const yPosition = useRef<number | undefined>();
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const bodyEl = document.querySelector('#content-root') as HTMLDivElement;
    const heroLottie = document.querySelector('#heroLottie') as HTMLDivElement;
    if (!bodyEl) return;
    if (shouldDisable) {
      const { scrollY } = window;
      yPosition.current = scrollY;
      bodyEl.style.top = `-${scrollY}px`;
      bodyEl.style.position = 'fixed';
      bodyEl.classList.add(styles.disableScroll);
      document.querySelector('html')?.classList.add(styles.disableScroll);
      // We need to change the position of the HeroSectionBlock lottie animation since
      // it's using position fixed which interacts weirdly with the disable scroll
      if (heroLottie) heroLottie.style.position = 'absolute';
    } else {
      bodyEl.style.position = '';
      bodyEl.style.top = '';
      bodyEl?.classList.remove(styles.disableScroll);
      document.querySelector('html')?.classList.remove(styles.disableScroll);
      if (yPosition.current) window.scrollTo(0, yPosition.current ?? 0);
      // Unset our changes to the HeroSectionBlock
      if (heroLottie) heroLottie.style.position = '';
    }
  }, [shouldDisable]);
}
