import { useRef, useEffect } from 'react';

function isSlowNetwork(): boolean {
  const conn = (navigator as any).connection;
  return conn && ['slow-2g', '2g'].includes(conn.effectiveType);
}

export function useVideoAutoplay(onError?: () => void) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Skip video entirely on very slow connections (2G)
    if (isSlowNetwork()) {
      video.style.display = 'none';
      return;
    }

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
