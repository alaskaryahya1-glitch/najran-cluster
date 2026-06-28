import { useRef, useEffect } from 'react';

function getNetworkTier(): '2g' | '3g' | 'fast' {
  const conn = (navigator as any).connection;
  if (!conn) return 'fast';
  if (['slow-2g', '2g'].includes(conn.effectiveType)) return '2g';
  if (conn.effectiveType === '3g') return '3g';
  return 'fast';
}

export function useVideoAutoplay(onError?: () => void) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const tier = getNetworkTier();

    if (tier === '2g') {
      video.style.display = 'none';
      return;
    }

    video.muted = true;

    // On fast/WiFi networks: preload the full video immediately so playback
    // starts the instant play() is called — no CDN round-trip delay.
    // On 3G: preload just metadata to establish the CDN connection early
    // without pulling the full file.
    if (tier === 'fast') {
      video.preload = 'auto';
    } else {
      video.preload = 'metadata';
    }
    video.load();

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
