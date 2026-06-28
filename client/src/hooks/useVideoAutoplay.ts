import { useRef, useEffect } from 'react';

export function useVideoAutoplay(onError?: () => void) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;

    const tryPlay = () => {
      if (document.hidden || !video.paused) return;
      video.play().catch(() => onError?.());
    };

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        tryPlay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', tryPlay);
    window.addEventListener('pageshow', tryPlay);

    tryPlay();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', tryPlay);
      window.removeEventListener('pageshow', tryPlay);
    };
  }, [onError]);

  return ref;
}
