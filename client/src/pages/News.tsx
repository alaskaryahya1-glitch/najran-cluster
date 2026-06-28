import { useEffect, useState, useCallback } from "react";
import { useVideoAutoplay } from "@/hooks/useVideoAutoplay";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { useSEO } from "@/hooks/useSEO";
import { motion } from "framer-motion";
import { Newspaper, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { SiX } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";
import heroImage from "@assets/Emarah_palace_stairs_in_Aba_Alsaud_historical…_1768895221719.jpg";
import newsHeroVideo from "@assets/news-hero.mp4";

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
    const title = cleanText.slice(0, 100);
    const excerpt = cleanText.length > 100 ? cleanText.slice(100, 230) : '';

    const openTweet = (e: React.MouseEvent) => {
      e.preventDefault();
      window.open(`https://twitter.com/NajranCluster/status/${tweet.id}`, '_blank');
    };

    return (
      <div
        key={tweet.id}
        onClick={tweet.video_url ? undefined : openTweet}
        className={`group rounded-xl overflow-hidden bg-white border border-gray-200 hover:shadow-[0_8px_24px_rgba(0,93,71,0.12)] hover:-translate-y-1 hover:border-[#005d47]/30 transition-all duration-300 flex flex-col ${tweet.video_url ? '' : 'cursor-pointer'}`}
        data-testid={`tweet-card-${tweet.id}-${index}`}
      >
        {/* Image / Video */}
        <div className="relative overflow-hidden bg-gray-100 h-48 flex-shrink-0">
          {tweet.video_url ? (
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
          ) : tweet.image_urls && tweet.image_urls.length > 1 ? (
            <ImageCarousel images={tweet.image_urls} tweetId={tweet.id} isSmall={isSmall} />
          ) : tweet.image_url ? (
            <img
              src={getProxiedImageUrl(tweet.image_url) || ''}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#005d47]/10 to-[#2BAAE2]/10 flex items-center justify-center">
              <Newspaper className="w-12 h-12 text-[#005d47]/30" />
            </div>
          )}
          <span className={`absolute bottom-2 right-2 bg-[#005d47] text-white text-xs px-3 py-1 rounded ${fontClass}`}>
            {language === 'ar' ? 'أخبار التجمع' : 'Cluster News'}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="mb-2">
            <span className={`text-gray-400 text-xs ${fontClass}`}>
              📅 {formatArabicDate(tweet.created_at, language)}
            </span>
          </div>
          <h3 className={`text-gray-800 font-bold text-base mb-2 line-clamp-2 ${fontClass}`}>
            {title}
          </h3>
          {excerpt && (
            <p className={`text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1 ${fontClass}`}>
              {excerpt}
            </p>
          )}
          <a
            href={`https://twitter.com/NajranCluster/status/${tweet.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 mt-3 text-[#2BAAE2] font-bold text-sm hover:underline ${fontClass}`}
            onClick={(e) => e.stopPropagation()}
            data-testid={`link-tweet-${tweet.id}`}
          >
            {language === 'ar' ? 'قراءة المزيد ←' : 'Read More →'}
          </a>
        </div>
      </div>
    );
  };

  const allTweets = [...uniqueTweets];

  return (
    <div className="container-custom py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allTweets.map((tweet, index) => renderTweetCard(tweet, index, false))}
      </div>
    </div>
  );
}

export default function News() {
  const { language } = useI18n();
  const fontClass = language === 'ar' ? 'font-arabic' : 'font-sans';
  const videoRef = useVideoAutoplay();
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
    <div className="min-h-screen overflow-x-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main>
        {/* Hero */}
        <section className="hero-section relative py-32 overflow-hidden w-full" style={{ backgroundColor: '#004070', minHeight: '65vh' }}>
          <video ref={videoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
            <source src={newsHeroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 dark:bg-black/50 pointer-events-none z-[2] transition-colors duration-300"></div>

          <div className="container-custom relative z-10">
            <motion.div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 mb-6">
                <Newspaper className="w-10 h-10 text-[#2BAAE2] brand-icon" />
              </div>
              <h1 className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 ${fontClass}`}>
                {language === 'ar' ? 'أخبار التجمع' : 'Cluster News'}
              </h1>
              <p className={`text-white/80 text-lg ${fontClass}`}>
                {language === 'ar' ? 'تابع آخر أخبار وفعاليات تجمع نجران الصحي' : 'Follow the latest news and events from Najran Health Cluster'}
              </p>
            </motion.div>
          </div>

          {/* White panel at bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-[100]">
            <div className="bg-white rounded-t-[40px] shadow-[0_-12px_40px_rgba(0,0,0,0.18)] px-3 pt-4 md:px-8 md:pt-8 pb-0">
              <div className="container-custom">
                <div className="grid grid-cols-3 gap-2 md:gap-6 -translate-y-6">
                  {[
                    { titleAr: 'عن التجمع', titleEn: 'About Us', subtitleAr: 'تعرف على تجمع نجران الصحي', subtitleEn: 'Learn about Najran Health Cluster', href: '/about' },
                    { titleAr: 'خدمات الموظفين', titleEn: 'Employee Services', subtitleAr: 'خدمات إدارية للموظفين', subtitleEn: 'Services for employees', href: '/employee-services' },
                    { titleAr: 'الخدمات الإلكترونية', titleEn: 'E-Services', subtitleAr: 'منصات رقمية للخدمات الصحية', subtitleEn: 'Digital health platforms', href: '/e-services' },
                  ].map((card, idx) => (
                    <a key={idx} href={card.href} className="group block bg-white rounded-2xl border border-gray-100 shadow-sm p-2.5 md:p-5 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(43,170,226,0.15)] hover:border-[#2BAAE2] transition-all duration-300 overflow-hidden relative">
                      <div className="h-1 bg-[#2BAAE2] absolute top-0 left-0 right-0 rounded-t-2xl"></div>
                      <div className="flex items-center justify-between gap-1 md:gap-4 pt-2">
                        <div className={`flex-1 min-w-0 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                          <h3 className={`text-xs md:text-base font-bold text-gray-900 ${fontClass} group-hover:text-[#2BAAE2] transition-colors leading-tight`}>{language === 'ar' ? card.titleAr : card.titleEn}</h3>
                          <p className={`text-gray-500 text-xs ${fontClass} mt-0.5 hidden sm:block`}>{language === 'ar' ? card.subtitleAr : card.subtitleEn}</p>
                        </div>
                        <div className="w-6 h-6 md:w-9 md:h-9 rounded-full bg-[#2BAAE2]/10 flex items-center justify-center group-hover:bg-[#2BAAE2] transition-colors flex-shrink-0">
                          <svg className="w-3 h-3 md:w-4 md:h-4 text-[#2BAAE2] group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ transform: language === 'ar' ? 'none' : 'rotate(180deg)' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tweets section */}
        <section className="relative pt-24 md:pt-28 pb-16 overflow-hidden" style={{ backgroundColor: '#f7f8f9' }}>
          <div className="absolute inset-0 najran-geometric-bg-light opacity-[0.06] pointer-events-none"></div>
          <video autoPlay loop muted playsInline aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none">
            <source src="https://www.health.sa/common/pattern-1.mp4" type="video/mp4" />
          </video>

          <div className="relative z-10">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-[#2BAAE2] rounded-full animate-spin"></div>
              </div>
            ) : tweets.length > 0 ? (
              <TweetsGrid tweets={tweets} language={language} />
            ) : (
              <div className="text-center py-12">
                <p className={`text-gray-500 ${fontClass}`}>
                  {language === 'ar' ? 'لا توجد أخبار حالياً' : 'No news available'}
                </p>
              </div>
            )}

            <div className="container-custom mt-8 text-center">
              <a
                href="https://twitter.com/NajranCluster"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-gray-200 text-gray-700 hover:bg-[#2BAAE2] hover:text-white hover:border-[#2BAAE2] transition-all duration-300 shadow-sm ${fontClass}`}
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
