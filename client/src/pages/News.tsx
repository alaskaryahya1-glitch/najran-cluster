import { useEffect, useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { useSEO } from "@/hooks/useSEO";
import { motion } from "framer-motion";
import { Newspaper, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { SiX } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";
import heroImage from "@assets/Emarah_palace_stairs_in_Aba_Alsaud_historical…_1768895221719.jpg";

interface Tweet {
  id: string;
  text: string;
  created_at: string;
  author_name: string;
  author_username: string;
  image_url?: string | null;
  image_urls?: string[] | null;
  video_url?: string | null;
}

interface NewsResponse {
  tweets: Tweet[];
  lastUpdated: string | null;
  monthlyUsage: { count: number; limit: number };
  count: number;
}

function formatArabicDate(dateString: string, language: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

function cleanTweetText(text: string): string {
  return text
    .replace(/^RT @\w+:\s*/, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/@\S+/g, '')
    .replace(/#\S+/g, '')
    .replace(/[|:]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function getProxiedImageUrl(imageUrl: string | null | undefined): string | null {
  if (!imageUrl) return null;
  if (imageUrl.startsWith('https://pbs.twimg.com/')) {
    return `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
  }
  return imageUrl;
}

function getProxiedVideoUrl(videoUrl: string | null | undefined): string | null {
  if (!videoUrl) return null;
  if (videoUrl.startsWith('https://video.twimg.com/')) {
    return `/api/image-proxy?url=${encodeURIComponent(videoUrl)}`;
  }
  return videoUrl;
}

function useImageDimensions(tweets: Tweet[]) {
  const [dimensions, setDimensions] = useState<Record<string, { width: number; height: number }>>({});

  useEffect(() => {
    const imageTweets = tweets.filter(t => !t.video_url && t.image_url);
    imageTweets.forEach(tweet => {
      if (dimensions[tweet.id]) return;
      const img = new Image();
      img.onload = () => {
        setDimensions(prev => ({
          ...prev,
          [tweet.id]: { width: img.naturalWidth, height: img.naturalHeight }
        }));
      };
      img.src = getProxiedImageUrl(tweet.image_url) || '';
    });
  }, [tweets]);

  return dimensions;
}

function pauseOtherVideos(currentVideo: HTMLVideoElement) {
  document.querySelectorAll('video').forEach(v => {
    if (v !== currentVideo && !v.paused) {
      v.pause();
    }
  });
}

function ImageCarousel({ images, tweetId, isSmall }: { images: string[], tweetId: string, isSmall: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  return (
    <div className="relative overflow-hidden bg-gray-800 group/carousel h-full" data-testid={`carousel-${tweetId}`}>
      <img
        src={getProxiedImageUrl(images[currentIndex]) || ''}
        alt=""
        className="w-full h-full object-cover transition-transform duration-300"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
      <button
        onClick={goPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-black/70"
        data-testid={`carousel-prev-${tweetId}`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-black/70"
        data-testid={`carousel-next-${tweetId}`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
            data-testid={`carousel-dot-${tweetId}-${idx}`}
          />
        ))}
      </div>
      {!isSmall && <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />}
    </div>
  );
}

function TweetsGrid({ tweets, language }: { tweets: Tweet[], language: string }) {
  const fontClass = language === 'ar' ? 'font-arabic' : 'font-sans';
  
  const tweetsWithContent = tweets.filter(tweet => {
    const cleanText = cleanTweetText(tweet.text);
    return cleanText.length > 5;
  });

  const getMediaId = (url: string | null | undefined): string | null => {
    if (!url) return null;
    const videoMatch = url.match(/(?:ext_tw_video|amplify_video)(?:_thumb)?\/(\d+)/);
    if (videoMatch) return videoMatch[1];
    const imgMatch = url.match(/\/([^\/]+)\.(jpg|jpeg|png|webp)/i);
    if (imgMatch) return imgMatch[1];
    return null;
  };

  const seenTexts = new Set<string>();
  const seenMediaIds = new Set<string>();
  const uniqueTweets = tweetsWithContent.filter((tweet) => {
    const cleanText = cleanTweetText(tweet.text);
    if (cleanText.length > 10 && seenTexts.has(cleanText)) return false;
    
    const thumbId = getMediaId(tweet.image_url);
    const videoId = getMediaId(tweet.video_url);
    if (thumbId && seenMediaIds.has(thumbId)) return false;
    if (videoId && seenMediaIds.has(videoId)) return false;
    
    if (cleanText.length > 10) seenTexts.add(cleanText);
    if (thumbId) seenMediaIds.add(thumbId);
    if (videoId) seenMediaIds.add(videoId);
    return true;
  });

  const imageDims = useImageDimensions(uniqueTweets);

  const videoTweets = uniqueTweets.filter(t => t.video_url);
  const imageTweets = uniqueTweets.filter(t => !t.video_url && t.image_url);
  const textOnlyTweets = uniqueTweets.filter(t => !t.video_url && !t.image_url);

  const tallImageTweets = imageTweets.filter(t => {
    const dim = imageDims[t.id];
    if (!dim) return true;
    return dim.height >= dim.width;
  });
  const smallImageTweets = imageTweets.filter(t => {
    const dim = imageDims[t.id];
    if (!dim) return false;
    return dim.height < dim.width;
  });

  const largeTweets = [...videoTweets, ...tallImageTweets];
  const smallTweets = [...smallImageTweets, ...textOnlyTweets];

  const renderTweetCard = (tweet: Tweet, index: number, isSmall: boolean) => {
    const cleanText = cleanTweetText(tweet.text);
    
    const openTweet = (e: React.MouseEvent) => {
      e.preventDefault();
      const webUrl = `https://twitter.com/NajranCluster/status/${tweet.id}`;
      window.open(webUrl, '_blank');
    };

    return (
      <div
        key={tweet.id}
        onClick={tweet.video_url ? undefined : openTweet}
        className={`group rounded-2xl overflow-hidden bg-black/20 dark:bg-black/50 backdrop-blur-md border border-white/20 hover:border-[#2BAAE2]/50 transition-all duration-300 flex flex-col h-[380px] ${tweet.video_url ? '' : 'cursor-pointer'}`}
        data-testid={`tweet-card-${tweet.id}-${index}`}
      >
        {tweet.video_url ? (
          <div className="relative overflow-hidden bg-gray-900 flex-1 min-h-0">
            <video 
              src={getProxiedVideoUrl(tweet.video_url) || ''} 
              controls
              controlsList="nodownload"
              preload="auto"
              playsInline
              poster={getProxiedImageUrl(tweet.image_url) || undefined}
              className="w-full h-full object-cover"
              onClick={(e) => e.stopPropagation()}
              onPlay={(e) => pauseOtherVideos(e.currentTarget)}
              data-testid={`video-tweet-${tweet.id}`}
            >
              <source src={getProxiedVideoUrl(tweet.video_url) || ''} type="video/mp4" />
            </video>
          </div>
        ) : tweet.image_urls && tweet.image_urls.length > 1 ? (
          <div className="flex-1 min-h-0">
            <ImageCarousel images={tweet.image_urls} tweetId={tweet.id} isSmall={isSmall} />
          </div>
        ) : tweet.image_url ? (
          <div className="relative overflow-hidden bg-gray-800 flex-1 min-h-0">
            <img 
              src={getProxiedImageUrl(tweet.image_url) || ''} 
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        ) : (
          <div className="flex-1 min-h-0" />
        )}
        
        <div className="p-4 flex flex-col h-[120px]">
          <p className={`text-white text-sm leading-relaxed mb-2 ${fontClass} line-clamp-3`}>
            {cleanText}
          </p>
          <div className="flex items-center gap-2 pt-2 border-t border-white/10 mt-auto">
            <a
              href={`https://twitter.com/NajranCluster/status/${tweet.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"
              onClick={(e) => e.stopPropagation()}
              data-testid={`link-tweet-${tweet.id}`}
            >
              <SiX className="w-3 h-3 text-white" />
            </a>
            <span className={`text-white/60 text-xs ${fontClass}`}>
              {formatArabicDate(tweet.created_at, language)}
            </span>
          </div>
        </div>
      </div>
    );
  };
  
  const allTweets = [...uniqueTweets];

  return (
    <div className="py-4 w-full px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 auto-rows-[1fr]">
        {allTweets.map((tweet, index) => renderTweetCard(tweet, index, false))}
      </div>
    </div>
  );
}

export default function News() {
  const { language } = useI18n();
  const fontClass = language === 'ar' ? 'font-arabic' : 'font-sans';
  const { data, isLoading } = useQuery<NewsResponse>({
    queryKey: ['/api/news'],
    refetchInterval: 12 * 60 * 60 * 1000,
    staleTime: 6 * 60 * 60 * 1000,
  });

  useSEO({
    path: '/news',
    titleAr: 'الأخبار والفعاليات | تجمع نجران الصحي',
    titleEn: 'News & Events | Najran Health Cluster',
    descriptionAr: 'آخر أخبار وفعاليات تجمع نجران الصحي - تغطية شاملة للأحداث والمبادرات الصحية في منطقة نجران.',
    descriptionEn: 'Latest news and events from Najran Health Cluster - comprehensive coverage of health events and initiatives in Najran Region.',
  }, language);

  const tweets = data?.tweets || [];

  return (
    <div className="min-h-screen relative" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="fixed inset-0 z-0">
        <img
          src={heroImage}
          alt=""
          data-nosnippet="true"
          className="w-full h-full object-cover dark-bg-image"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/45" />
      </div>

      <Header />
      
      <main className="relative z-10">
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/15 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 najran-geometric-bg opacity-20"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              
              
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-6">
                <Newspaper className="w-10 h-10 text-[#2BAAE2] brand-icon" />
              </div>
              <h1 className={`text-4xl md:text-5xl font-bold text-white mb-4 ${fontClass}`}>
                {language === 'ar' ? 'أخبار التجمع' : 'Cluster News'}
              </h1>
              <p className={`text-white text-xl ${fontClass}`}>
                {language === 'ar' ? 'تابع آخر أخبار وفعاليات تجمع نجران الصحي' : 'Follow the latest news and events from Najran Health Cluster'}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-black/35 dark:bg-black/65 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 najran-geometric-bg opacity-20"></div>
          
          <div className="relative">
            <motion.div
              
              
              
            >
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="w-12 h-12 border-4 border-white/30 border-t-[#2BAAE2] rounded-full animate-spin"></div>
                </div>
              ) : tweets.length > 0 ? (
                <TweetsGrid tweets={tweets} language={language} />
              ) : (
                <div className="text-center py-12">
                  <p className={`text-white/90 ${fontClass}`}>
                    {language === 'ar' ? 'لا توجد أخبار حالياً' : 'No news available'}
                  </p>
                </div>
              )}
            </motion.div>
            
            <div className="container mx-auto px-4 mt-8 text-center">
              <a
                href="https://twitter.com/NajranCluster"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 bg-black/20 dark:bg-black/50 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors ${fontClass}`}
                data-testid="link-twitter-profile"
              >
                <SiX className="w-5 h-5" />
                <span>{language === 'ar' ? 'تابعنا على منصة X' : 'Follow us on X'}</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      
      <style>{`
        @keyframes scrollNews {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .news-ticker-track {
          animation: scrollNews 60s linear infinite;
        }
        .news-ticker-track:hover {
          animation-play-state: paused;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
