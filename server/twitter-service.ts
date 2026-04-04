import { db } from "./db";
import { cachedTweets, apiUsage } from "@shared/schema";
import { eq, desc, sql } from "drizzle-orm";

const MONTHLY_LIMIT = 100;
const QUOTA_RESET_DATE = new Date('2026-02-28T00:00:00.000Z');
const SAUDI_REFRESH_HOURS = [8, 20]; // 8 AM and 8 PM Saudi time
const SAUDI_TIMEZONE_OFFSET = 3;

interface TwitterApiTweet {
  id: string;
  text: string;
  created_at: string;
  author_id?: string;
  attachments?: {
    media_keys?: string[];
  };
  referenced_tweets?: Array<{
    type: string;
    id: string;
  }>;
}

interface TwitterApiResponse {
  data?: TwitterApiTweet[];
  includes?: {
    users?: Array<{
      id: string;
      name: string;
      username: string;
    }>;
    media?: Array<{
      media_key: string;
      type?: string;
      url?: string;
      preview_image_url?: string;
      variants?: Array<{
        bit_rate?: number;
        content_type?: string;
        url?: string;
      }>;
    }>;
    tweets?: Array<{
      id: string;
      text: string;
      attachments?: {
        media_keys?: string[];
      };
    }>;
  };
  errors?: Array<{ message: string }>;
}

function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

async function getMonthlyUsage(): Promise<{ count: number; lastSuccessAt: Date | null }> {
  const month = getCurrentMonth();
  const usage = await db.select().from(apiUsage).where(eq(apiUsage.month, month)).limit(1);
  
  if (usage.length === 0) {
    await db.insert(apiUsage).values({ month, callCount: 0 });
    return { count: 0, lastSuccessAt: null };
  }
  
  return { count: usage[0].callCount, lastSuccessAt: usage[0].lastSuccessAt };
}

async function incrementUsage(): Promise<number> {
  const month = getCurrentMonth();
  const current = await getMonthlyUsage();
  const newCount = current.count + 1;
  
  await db.update(apiUsage)
    .set({ 
      callCount: newCount, 
      lastCallAt: new Date(),
      lastSuccessAt: new Date()
    })
    .where(eq(apiUsage.month, month));
  
  return newCount;
}

function canMakeApiCall(): boolean {
  // Always allow API calls - we track usage separately with monthly count
  return true;
}

function getSaudiTime(): Date {
  const now = new Date();
  const utcHours = now.getUTCHours();
  const saudiDate = new Date(now);
  saudiDate.setUTCHours(utcHours + SAUDI_TIMEZONE_OFFSET);
  return saudiDate;
}

function shouldRefresh(lastSuccessAt: Date | null): boolean {
  if (!lastSuccessAt) return true;
  
  const now = new Date();
  const hoursSinceLastRefresh = (now.getTime() - lastSuccessAt.getTime()) / (1000 * 60 * 60);
  
  if (hoursSinceLastRefresh >= 12) {
    console.log(`[Twitter] ${hoursSinceLastRefresh.toFixed(1)} hours since last refresh, triggering update`);
    return true;
  }
  
  const saudiNow = getSaudiTime();
  const saudiHour = saudiNow.getUTCHours();
  
  const lastSuccessSaudi = new Date(lastSuccessAt);
  lastSuccessSaudi.setUTCHours(lastSuccessSaudi.getUTCHours() + SAUDI_TIMEZONE_OFFSET);
  
  const lastSuccessHour = lastSuccessSaudi.getUTCHours();
  const todaySaudiDate = saudiNow.toISOString().split('T')[0];
  const lastSuccessSaudiDate = lastSuccessSaudi.toISOString().split('T')[0];
  
  if (todaySaudiDate !== lastSuccessSaudiDate) {
    return saudiHour >= SAUDI_REFRESH_HOURS[0];
  }
  
  if (lastSuccessHour < SAUDI_REFRESH_HOURS[1] && saudiHour >= SAUDI_REFRESH_HOURS[1]) {
    return true;
  }
  
  return false;
}

async function fetchFromTwitterApi(): Promise<{ tweets: TwitterApiTweet[]; media: Array<{ media_key: string; url?: string; preview_image_url?: string }>; includedTweets: Array<{ id: string; text: string; attachments?: { media_keys?: string[] } }> } | null> {
  const bearerToken = process.env.X_BEARER_TOKEN;
  
  if (!bearerToken) {
    console.error('[Twitter] X_BEARER_TOKEN not configured');
    return null;
  }
  
  const { count } = await getMonthlyUsage();
  
  if (count >= MONTHLY_LIMIT) {
    console.log(`[Twitter] Monthly limit reached (${count}/${MONTHLY_LIMIT}). Using cached data.`);
    return null;
  }
  
  if (!canMakeApiCall()) {
    return null;
  }
  
  try {
    // Use cached user ID to avoid extra API calls
    const userId = '1740383273480544256'; // @Najrancluster
    console.log(`[Twitter] Using cached user ID: ${userId} for @Najrancluster`);
    
    const url = `https://api.twitter.com/2/users/${userId}/tweets?max_results=15&tweet.fields=created_at,text,referenced_tweets&expansions=author_id,attachments.media_keys,referenced_tweets.id,referenced_tweets.id.attachments.media_keys&user.fields=name,username&media.fields=url,preview_image_url,type,variants`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
    });
    
    const allHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      if (key.startsWith('x-rate') || key.startsWith('x-app')) {
        allHeaders[key] = value;
      }
    });
    console.log(`[Twitter] Response status: ${response.status}, Rate headers:`, allHeaders);
    
    if (response.status === 429) {
      const resetTime = response.headers.get('x-rate-limit-reset');
      const remaining = response.headers.get('x-rate-limit-remaining');
      const resetDate = resetTime ? new Date(parseInt(resetTime) * 1000) : null;
      const body = await response.text();
      console.error(`[Twitter] Rate limit 429. Remaining: ${remaining}. Reset: ${resetDate?.toISOString() || 'unknown'}. Body: ${body}`);
      return null;
    }
    
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`[Twitter] API error: ${response.status} ${response.statusText}. Body: ${errorBody}`);
      return null;
    }
    
    const data: TwitterApiResponse = await response.json();
    
    console.log('[Twitter] API Response includes:', {
      tweetCount: data.data?.length || 0,
      hasMedia: !!data.includes?.media,
      mediaCount: data.includes?.media?.length || 0,
      firstTweetAttachments: data.data?.[0]?.attachments || 'none',
      mediaDetails: data.includes?.media?.slice(0, 3) || []
    });
    
    if (data.errors) {
      console.error('[Twitter] API returned errors:', data.errors);
      return null;
    }
    
    await incrementUsage();
    console.log(`[Twitter] API call successful. Monthly usage: ${count + 1}/${MONTHLY_LIMIT}`);
    
    console.log('[Twitter] Media types:', data.includes?.media?.map(m => ({ key: m.media_key, type: m.type, hasVariants: !!m.variants?.length })));
    return { tweets: data.data || [], media: data.includes?.media || [], includedTweets: data.includes?.tweets || [] };
  } catch (error) {
    console.error('[Twitter] Failed to fetch tweets:', error);
    return null;
  }
}

async function cacheTweets(
  tweets: TwitterApiTweet[], 
  media: Array<{ media_key: string; type?: string; url?: string; preview_image_url?: string; variants?: Array<{ bit_rate?: number; content_type?: string; url?: string }> }>,
  includedTweets: Array<{ id: string; text: string; attachments?: { media_keys?: string[] } }>
): Promise<void> {
  const mediaMap = new Map<string, string>();
  const videoMap = new Map<string, string>();
  for (const m of media) {
    if (m.type === 'video' || m.type === 'animated_gif') {
      if (m.variants && m.variants.length > 0) {
        const mp4Variants = m.variants.filter(v => v.content_type === 'video/mp4' && v.url);
        if (mp4Variants.length > 0) {
          mp4Variants.sort((a, b) => (b.bit_rate || 0) - (a.bit_rate || 0));
          videoMap.set(m.media_key, mp4Variants[0].url!);
        }
      }
      if (m.preview_image_url) {
        mediaMap.set(m.media_key, m.preview_image_url);
      }
    } else if (m.url || m.preview_image_url) {
      mediaMap.set(m.media_key, m.url || m.preview_image_url || '');
    }
  }

  const referencedTweetMediaMap = new Map<string, { imageUrl: string | null; videoUrl: string | null }>();
  for (const rt of includedTweets) {
    if (rt.attachments?.media_keys && rt.attachments.media_keys.length > 0) {
      const firstKey = rt.attachments.media_keys[0];
      const imageUrl = mediaMap.get(firstKey) || null;
      const videoUrl = videoMap.get(firstKey) || null;
      if (imageUrl || videoUrl) {
        referencedTweetMediaMap.set(rt.id, { imageUrl, videoUrl });
      }
    }
  }
  
  const originalTweetIds = new Set<string>();
  for (const tweet of tweets) {
    if (!tweet.referenced_tweets || tweet.referenced_tweets.length === 0) {
      originalTweetIds.add(tweet.id);
    }
  }

  const filteredTweets = tweets.filter(tweet => {
    if (!tweet.referenced_tweets || tweet.referenced_tweets.length === 0) {
      return true;
    }
    const isRetweet = tweet.referenced_tweets.some(ref => ref.type === 'retweeted');
    if (isRetweet) {
      const referencedId = tweet.referenced_tweets.find(ref => ref.type === 'retweeted')?.id;
      if (referencedId && originalTweetIds.has(referencedId)) {
        console.log(`[Twitter] Skipping self-retweet ${tweet.id} (original ${referencedId} already exists)`);
        return false;
      }
      const existsInIncluded = includedTweets.some(rt => rt.id === referencedId);
      if (existsInIncluded) {
        const refTweet = includedTweets.find(rt => rt.id === referencedId);
        if (refTweet) {
          const refText = refTweet.text || '';
          const hasDuplicate = tweets.some(t => 
            t.id !== tweet.id && 
            !t.text.startsWith('RT @') &&
            t.text === refText
          );
          if (hasDuplicate) {
            console.log(`[Twitter] Skipping retweet ${tweet.id} (original content already in feed)`);
            return false;
          }
        }
      }
    }
    return true;
  });

  for (const tweet of filteredTweets) {
    try {
      let imageUrl: string | null = null;
      let tweetVideoUrl: string | null = null;
      const allImageUrls: string[] = [];
      if (tweet.attachments?.media_keys && tweet.attachments.media_keys.length > 0) {
        for (const key of tweet.attachments.media_keys) {
          const imgUrl = mediaMap.get(key);
          if (imgUrl) allImageUrls.push(imgUrl);
          if (!tweetVideoUrl) {
            const vidUrl = videoMap.get(key);
            if (vidUrl) tweetVideoUrl = vidUrl;
          }
        }
        imageUrl = allImageUrls.length > 0 ? allImageUrls[0] : null;
      }

      if (!imageUrl && !tweetVideoUrl && tweet.referenced_tweets && tweet.referenced_tweets.length > 0) {
        for (const ref of tweet.referenced_tweets) {
          const refMedia = referencedTweetMediaMap.get(ref.id);
          if (refMedia) {
            imageUrl = refMedia.imageUrl;
            tweetVideoUrl = refMedia.videoUrl;
            if (refMedia.imageUrl) allImageUrls.push(refMedia.imageUrl);
            console.log(`[Twitter] Found media from referenced tweet ${ref.id} for tweet ${tweet.id} (video: ${!!tweetVideoUrl})`);
            break;
          }
        }
      }
      
      const existingTweet = await db.select()
        .from(cachedTweets)
        .where(eq(cachedTweets.tweetId, tweet.id))
        .limit(1);
      
      if (existingTweet.length === 0) {
        await db.insert(cachedTweets).values({
          tweetId: tweet.id,
          text: tweet.text,
          createdAt: new Date(tweet.created_at),
          authorName: 'تجمع نجران الصحي',
          authorUsername: 'NajranCluster',
          imageUrl: imageUrl,
          imageUrls: allImageUrls.length > 0 ? allImageUrls : null,
          videoUrl: tweetVideoUrl,
        });
      } else {
        const updates: Record<string, any> = {};
        if (imageUrl && !existingTweet[0].imageUrl) updates.imageUrl = imageUrl;
        if (tweetVideoUrl && !existingTweet[0].videoUrl) updates.videoUrl = tweetVideoUrl;
        if (allImageUrls.length > 0 && (!existingTweet[0].imageUrls || existingTweet[0].imageUrls.length === 0)) {
          updates.imageUrls = allImageUrls;
        }
        if (Object.keys(updates).length > 0) {
          await db.update(cachedTweets)
            .set(updates)
            .where(eq(cachedTweets.tweetId, tweet.id));
        }
      }
    } catch (error) {
      console.error(`[Twitter] Failed to cache tweet ${tweet.id}:`, error);
    }
  }
}

async function getCachedTweets(): Promise<{
  tweets: Array<{
    id: string;
    text: string;
    createdAt: Date;
    authorName: string;
    authorUsername: string;
    imageUrl: string | null;
    imageUrls: string[] | null;
    videoUrl: string | null;
  }>;
  latestCachedAt: Date | null;
}> {
  const allTweets = await db.select()
    .from(cachedTweets)
    .orderBy(desc(cachedTweets.createdAt))
    .limit(20);
  
  const seenTexts = new Set<string>();
  const seenImages = new Set<string>();
  const seenVideos = new Set<string>();
  const seenVideoThumbs = new Set<string>();
  
  const getVideoThumbId = (url: string | null): string | null => {
    if (!url) return null;
    const match = url.match(/(?:ext_tw_video|amplify_video)(?:_thumb)?\/(\d+)/);
    return match ? match[1] : null;
  };
  
  const getImageId = (url: string | null): string | null => {
    if (!url) return null;
    const match = url.match(/\/([^\/]+)\.(jpg|jpeg|png|webp)/i);
    return match ? match[1] : null;
  };

  const dedupedTweets = allTweets.filter(t => {
    const cleanText = t.text.replace(/^RT @\w+: /, '').replace(/https?:\/\/\S+/g, '').replace(/@\S+/g, '').replace(/#\S+/g, '').replace(/\s+/g, ' ').trim();
    
    if (cleanText.length > 10 && seenTexts.has(cleanText)) {
      return false;
    }
    
    if (t.imageUrl && seenImages.has(t.imageUrl)) {
      return false;
    }
    
    if (t.videoUrl && seenVideos.has(t.videoUrl)) {
      return false;
    }
    
    const thumbId = getVideoThumbId(t.imageUrl) || getVideoThumbId(t.videoUrl);
    if (thumbId && seenVideoThumbs.has(thumbId)) {
      return false;
    }

    const imgId = getImageId(t.imageUrl);
    if (imgId && seenImages.has(imgId)) {
      return false;
    }
    
    if (cleanText.length > 10) seenTexts.add(cleanText);
    if (t.imageUrl) {
      seenImages.add(t.imageUrl);
      const id = getImageId(t.imageUrl);
      if (id) seenImages.add(id);
    }
    if (t.videoUrl) seenVideos.add(t.videoUrl);
    if (thumbId) seenVideoThumbs.add(thumbId);
    return true;
  }).slice(0, 10);

  const latestCachedAt = dedupedTweets.length > 0 
    ? dedupedTweets.reduce((max, t) => t.cachedAt > max ? t.cachedAt : max, dedupedTweets[0].cachedAt)
    : null;
  
  return {
    tweets: dedupedTweets.map(t => ({
      id: t.tweetId,
      text: t.text,
      createdAt: t.createdAt,
      authorName: t.authorName,
      authorUsername: t.authorUsername,
      imageUrl: t.imageUrl,
      imageUrls: t.imageUrls,
      videoUrl: t.videoUrl,
    })),
    latestCachedAt,
  };
}

export async function getNews(): Promise<{
  tweets: Array<{
    id: string;
    text: string;
    createdAt: Date;
    authorName: string;
    authorUsername: string;
    imageUrl: string | null;
    imageUrls: string[] | null;
    videoUrl: string | null;
  }>;
  lastUpdated: Date | null;
  monthlyUsage: { count: number; limit: number };
  nextRefreshAvailable: boolean;
}> {
  const { count, lastSuccessAt } = await getMonthlyUsage();
  
  if (canMakeApiCall() && count < MONTHLY_LIMIT && shouldRefresh(lastSuccessAt)) {
    console.log('[Twitter] Attempting to refresh tweets from API...');
    const result = await fetchFromTwitterApi();
    
    if (result && result.tweets.length > 0) {
      await cacheTweets(result.tweets, result.media, result.includedTweets);
    }
  }
  
  const { tweets, latestCachedAt } = await getCachedTweets();
  const updatedUsage = await getMonthlyUsage();
  
  const lastUpdated = updatedUsage.lastSuccessAt || latestCachedAt;
  
  return {
    tweets,
    lastUpdated,
    monthlyUsage: { count: updatedUsage.count, limit: MONTHLY_LIMIT },
    nextRefreshAvailable: canMakeApiCall() && updatedUsage.count < MONTHLY_LIMIT,
  };
}

export async function forceRefreshTweets(): Promise<{
  success: boolean;
  message: string;
  tweetsCount?: number;
}> {
  const { count } = await getMonthlyUsage();
  
  if (count >= MONTHLY_LIMIT) {
    return {
      success: false,
      message: `Monthly limit reached (${count}/${MONTHLY_LIMIT}). Cannot refresh.`
    };
  }
  
  if (!canMakeApiCall()) {
    return {
      success: false,
      message: 'API calls blocked until quota reset on January 31, 2026'
    };
  }
  
  console.log('[Twitter] Force refreshing tweets - clearing old cache first...');
  await db.delete(cachedTweets);
  
  const result = await fetchFromTwitterApi();
  
  if (result && result.tweets.length > 0) {
    await cacheTweets(result.tweets, result.media, result.includedTweets);
    return {
      success: true,
      message: `Successfully refreshed ${result.tweets.length} tweets`,
      tweetsCount: result.tweets.length
    };
  }
  
  return {
    success: false,
    message: 'Failed to fetch tweets from API'
  };
}

export async function seedInitialTweets(): Promise<void> {
  const existingTweets = await db.select().from(cachedTweets).limit(1);
  
  if (existingTweets.length > 0) {
    const selfRetweets = await db.select().from(cachedTweets).where(
      sql`${cachedTweets.text} LIKE 'RT @NajranCluster:%'`
    );
    
    const videoTweets = await db.select().from(cachedTweets).where(
      sql`${cachedTweets.imageUrl} LIKE '%amplify_video%' AND (${cachedTweets.videoUrl} IS NULL OR ${cachedTweets.videoUrl} = '')`
    );

    if (selfRetweets.length > 0 || videoTweets.length > 0) {
      console.log(`[Twitter] Found stale data: ${selfRetweets.length} self-retweets, ${videoTweets.length} video tweets missing videoUrl. Forcing refresh...`);
      try {
        await forceRefreshTweets();
        console.log('[Twitter] Stale data refresh complete.');
      } catch (err) {
        console.error('[Twitter] Failed to refresh stale data:', err);
      }
      return;
    }
    
    console.log('[Twitter] Cached tweets already exist, skipping seed.');
    return;
  }
  
  console.log('[Twitter] Seeding initial cached tweets...');
  
  const initialTweets = [
    {
      tweetId: "seed_1",
      text: "حصل مستشفى ثار العام على اعتماد المركز السعودي لاعتماد المنشآت الصحية وفق المعايير الوطنية للمستشفيات #تجمع_نجران_الصحي",
      createdAt: new Date("2026-01-17T10:00:00.000Z"),
      authorName: "تجمع نجران الصحي",
      authorUsername: "NajranCluster",
      imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
    },
    {
      tweetId: "seed_2",
      text: "حصل مركز صحي أبا السعود على اعتماد المركز السعودي لاعتماد المنشآت الصحية وفق المعايير الوطنية لمراكز الرعاية الصحية الأولية #تجمع_نجران_الصحي",
      createdAt: new Date("2026-01-16T14:30:00.000Z"),
      authorName: "تجمع نجران الصحي",
      authorUsername: "NajranCluster",
      imageUrl: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop",
    },
    {
      tweetId: "seed_3",
      text: "نستعرض أبرز إنجازات وفعاليات الأسبوع في تجمع نجران الصحي #التجمع_في_أسبوع #تجمع_نجران_الصحي",
      createdAt: new Date("2026-01-15T09:15:00.000Z"),
      authorName: "تجمع نجران الصحي",
      authorUsername: "NajranCluster",
      imageUrl: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=300&fit=crop",
    },
    {
      tweetId: "seed_4",
      text: "تثقيف صحي متواصل في مراكز الرعاية الصحية الأولية لنشر الوعي الصحي بين المستفيدين #صحة_نجران #تجمع_نجران_الصحي",
      createdAt: new Date("2026-01-14T11:00:00.000Z"),
      authorName: "تجمع نجران الصحي",
      authorUsername: "NajranCluster",
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
    },
    {
      tweetId: "seed_5",
      text: "ورشة عمل تدريبية لتطوير مهارات الفريق الطبي في التعامل مع الحالات الطارئة #تطوير_الكوادر #تجمع_نجران_الصحي",
      createdAt: new Date("2026-01-12T08:30:00.000Z"),
      authorName: "تجمع نجران الصحي",
      authorUsername: "NajranCluster",
      imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
    },
    {
      tweetId: "seed_6",
      text: "تجمع نجران الصحي يواصل جهوده لتقديم أفضل الخدمات الصحية للمستفيدين #جودة_الرعاية #تجمع_نجران_الصحي",
      createdAt: new Date("2026-01-11T13:20:00.000Z"),
      authorName: "تجمع نجران الصحي",
      authorUsername: "NajranCluster",
      imageUrl: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop",
    },
    {
      tweetId: "seed_7",
      text: "افتتاح عيادة جديدة للأمراض المزمنة في مستشفى نجران العام لخدمة المرضى #الرعاية_المتكاملة #تجمع_نجران_الصحي",
      createdAt: new Date("2026-01-10T10:00:00.000Z"),
      authorName: "تجمع نجران الصحي",
      authorUsername: "NajranCluster",
      imageUrl: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=300&fit=crop",
    },
    {
      tweetId: "seed_8",
      text: "حملة تطعيم موسعة ضد الإنفلونزا في جميع مراكز الرعاية الصحية الأولية #صحتك_أولاً #تجمع_نجران_الصحي",
      createdAt: new Date("2026-01-08T14:00:00.000Z"),
      authorName: "تجمع نجران الصحي",
      authorUsername: "NajranCluster",
      imageUrl: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop",
    },
    {
      tweetId: "seed_9",
      text: "نثمن جهود الكوادر الصحية في تقديم أفضل الخدمات للمستفيدين خلال موسم الشتاء #شكراً_أبطال_الصحة #تجمع_نجران_الصحي",
      createdAt: new Date("2026-01-05T09:30:00.000Z"),
      authorName: "تجمع نجران الصحي",
      authorUsername: "NajranCluster",
      imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop",
    },
    {
      tweetId: "seed_10",
      text: "نهنئكم بحلول العام الجديد ٢٠٢٦م ونتمنى لكم عاماً مليئاً بالصحة والعافية #عام_جديد #تجمع_نجران_الصحي",
      createdAt: new Date("2026-01-01T00:01:00.000Z"),
      authorName: "تجمع نجران الصحي",
      authorUsername: "NajranCluster",
      imageUrl: "https://images.unsplash.com/photo-1609619385076-36a873425636?w=400&h=300&fit=crop",
    },
  ];
  
  for (const tweet of initialTweets) {
    await db.insert(cachedTweets).values(tweet);
  }
  
  console.log('[Twitter] Seeded initial cached tweets successfully.');
}
