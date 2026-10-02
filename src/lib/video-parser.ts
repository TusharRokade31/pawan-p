export interface ParsedVideo {
  originalUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
  platform: 'youtube' | 'instagram' | 'vimeo' | 'direct' | 'other';
  videoId?: string;
}

export function parseVideoUrl(url: string, customThumbnail?: string): ParsedVideo {
  const cleanUrl = (url || '').trim();

  if (!cleanUrl) {
    return {
      originalUrl: '',
      embedUrl: '',
      thumbnailUrl: customThumbnail || '',
      platform: 'other',
    };
  }

  // 1. YouTube Shorts: https://www.youtube.com/shorts/VIDEO_ID
  const shortsMatch = cleanUrl.match(/(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/i);
  if (shortsMatch && shortsMatch[1]) {
    const videoId = shortsMatch[1];
    return {
      originalUrl: cleanUrl,
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
      thumbnailUrl: customThumbnail || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      platform: 'youtube',
      videoId,
    };
  }

  // 2. YouTube Standard Watch: https://www.youtube.com/watch?v=VIDEO_ID
  const ytWatchMatch = cleanUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/i);
  if (ytWatchMatch && ytWatchMatch[1]) {
    const videoId = ytWatchMatch[1];
    return {
      originalUrl: cleanUrl,
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
      thumbnailUrl: customThumbnail || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      platform: 'youtube',
      videoId,
    };
  }

  // 3. Instagram Reels: https://www.instagram.com/reel/REEL_ID/
  const igMatch = cleanUrl.match(/instagram\.com\/(?:reel|p)\/([a-zA-Z0-9_-]+)/i);
  if (igMatch && igMatch[1]) {
    const reelId = igMatch[1];
    return {
      originalUrl: cleanUrl,
      embedUrl: `https://www.instagram.com/reel/${reelId}/embed/captioned`,
      thumbnailUrl: customThumbnail || '',
      platform: 'instagram',
      videoId: reelId,
    };
  }

  // 4. Vimeo: https://vimeo.com/VIDEO_ID
  const vimeoMatch = cleanUrl.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)/i);
  if (vimeoMatch && vimeoMatch[3]) {
    const videoId = vimeoMatch[3];
    return {
      originalUrl: cleanUrl,
      embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1`,
      thumbnailUrl: customThumbnail || '',
      platform: 'vimeo',
      videoId,
    };
  }

  // 5. Direct / already embed URL or file
  return {
    originalUrl: cleanUrl,
    embedUrl: cleanUrl,
    thumbnailUrl: customThumbnail || '',
    platform: 'direct',
  };
}
