/**
 * Video Parser Utility
 * Detects platform from URL and generates proper embed URLs
 * Supports: YouTube, Vimeo, TikTok, Bilibili, Instagram, Direct URLs
 */

// Platform detection patterns
const PLATFORM_PATTERNS = {
  youtube: [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/
  ],
  vimeo: [
    /vimeo\.com\/(\d+)/,
    /vimeo\.com\/channels\/[\w]+\/(\d+)/,
    /vimeo\.com\/groups\/[\w]+\/videos\/(\d+)/
  ],
  tiktok: [
    /tiktok\.com\/@[\w.-]+\/video\/(\d+)/,
    /tiktok\.com\/embed\/v2\/(\d+)/,
    /vm\.tiktok\.com\/(\w+)/
  ],
  bilibili: [
    /bilibili\.com\/video\/(BV[\w]+)/,
    /bilibili\.com\/video\/av(\d+)/,
    /b23\.tv\/(BV[\w]+)/,
    /b23\.tv\/av(\d+)/
  ],
  instagram: [
    /instagram\.com\/p\/([a-zA-Z0-9_-]+)/,
    /instagram\.com\/reel\/([a-zA-Z0-9_-]+)/,
    /instagram\.com\/tv\/([a-zA-Z0-9_-]+)/
  ],
  directVideo: [
    /\.(mp4|webm|ogg|mov|avi|mkv|flv|wmv)$/i
  ]
};

// Embed URL generators
const EMBED_GENERATORS = {
  youtube: (id) => `https://www.youtube.com/embed/${id}`,
  vimeo: (id) => `https://player.vimeo.com/video/${id}`,
  tiktok: (id) => `https://www.tiktok.com/embed/v2/${id}`,
  bilibili: (id) => {
    // Handle both BV and av formats
    if (id.startsWith('BV')) {
      return `https://player.bilibili.com/player.html?bvid=${id}`;
    }
    return `https://player.bilibili.com/player.html?aid=${id}`;
  },
  instagram: (id) => `https://www.instagram.com/p/${id}/embed`,
  directVideo: (url) => url
};

// Thumbnail generators
const THUMBNAIL_GENERATORS = {
  youtube: (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
  vimeo: async (id) => {
    // Vimeo requires API call for thumbnail
    try {
      const response = await fetch(`https://vimeo.com/api/v2/video/${id}.json`);
      const data = await response.json();
      return data[0]?.thumbnail_large || null;
    } catch {
      return null;
    }
  },
  tiktok: () => null, // TikTok doesn't provide easy thumbnail access
  bilibili: (id) => {
    // Bilibili thumbnails require more complex API calls
    return null;
  },
  instagram: () => null, // Instagram embeds include their own thumbnail
  directVideo: () => null // Direct videos need to be loaded to generate thumbnail
};

/**
 * Detects the platform from a video URL
 * @param {string} url - The video URL
 * @returns {Object} Platform info { platform, id, isValid }
 */
export const detectPlatform = (url) => {
  if (!url || typeof url !== 'string') {
    return { platform: null, id: null, isValid: false };
  }

  // Check each platform's patterns
  for (const [platform, patterns] of Object.entries(PLATFORM_PATTERNS)) {
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        if (platform === 'directVideo') {
          return { platform, id: url, isValid: true };
        }
        return { platform, id: match[1], isValid: true };
      }
    }
  }

  return { platform: null, id: null, isValid: false };
};

/**
 * Generates embed URL for a video
 * @param {string} url - The original video URL
 * @returns {Object} { embedUrl, platform, id, isValid }
 */
export const generateEmbedUrl = (url) => {
  const { platform, id, isValid } = detectPlatform(url);

  if (!isValid) {
    return { embedUrl: null, platform: null, id: null, isValid: false };
  }

  const generator = EMBED_GENERATORS[platform];
  const embedUrl = generator ? generator(id) : null;

  return { embedUrl, platform, id, isValid: true };
};

/**
 * Gets video thumbnail URL
 * @param {string} url - The video URL
 * @returns {Promise<string|null>} Thumbnail URL or null
 */
export const getVideoThumbnail = async (url) => {
  const { platform, id, isValid } = detectPlatform(url);

  if (!isValid) {
    return null;
  }

  const generator = THUMBNAIL_GENERATORS[platform];
  if (!generator) {
    return null;
  }

  // Handle async thumbnail generators
  if (generator.constructor.name === 'AsyncFunction') {
    return await generator(id);
  }

  return generator(id);
};

/**
 * Validates if a URL is a supported video URL
 * @param {string} url - The URL to validate
 * @returns {boolean}
 */
export const isValidVideoUrl = (url) => {
  const { isValid } = detectPlatform(url);
  return isValid;
};

/**
 * Gets platform-specific player configuration
 * @param {string} platform - The video platform
 * @returns {Object} Player configuration
 */
export const getPlayerConfig = (platform) => {
  const configs = {
    youtube: {
      playerVars: {
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        fs: 1,
        iv_load_policy: 3
      }
    },
    vimeo: {
      playerOptions: {
        color: '1890ff',
        title: false,
        byline: false,
        portrait: false
      }
    },
    tiktok: {
      attributes: {
        'data-video-id': true,
        'data-embed-from': 'catlink'
      }
    },
    bilibili: {
      attributes: {
        allowfullscreen: 'true',
        scrolling: 'no',
        border: '0',
        frameborder: 'no',
        framespacing: '0'
      }
    },
    instagram: {
      attributes: {
        frameborder: '0',
        scrolling: 'no',
        allowtransparency: 'true'
      }
    },
    directVideo: {
      attributes: {
        controls: true,
        preload: 'metadata'
      }
    }
  };

  return configs[platform] || {};
};

/**
 * Extracts video metadata from URL (if available)
 * @param {string} url - The video URL
 * @returns {Promise<Object>} Video metadata
 */
export const getVideoMetadata = async (url) => {
  const { platform, id, isValid } = detectPlatform(url);

  if (!isValid) {
    return {
      platform: null,
      id: null,
      title: null,
      thumbnail: null,
      duration: null,
      isValid: false
    };
  }

  const thumbnail = await getVideoThumbnail(url);

  // For now, return basic metadata
  // In a real implementation, you might want to call platform APIs
  return {
    platform,
    id,
    title: null, // Would require API calls to get actual title
    thumbnail,
    duration: null, // Would require API calls to get actual duration
    embedUrl: generateEmbedUrl(url).embedUrl,
    originalUrl: url,
    isValid: true
  };
};

/**
 * Formats platform name for display
 * @param {string} platform - The platform identifier
 * @returns {string} Formatted platform name
 */
export const formatPlatformName = (platform) => {
  const names = {
    youtube: 'YouTube',
    vimeo: 'Vimeo',
    tiktok: 'TikTok',
    bilibili: 'Bilibili',
    instagram: 'Instagram',
    directVideo: 'Direct Video'
  };

  return names[platform] || platform;
};

/**
 * Gets platform-specific embed dimensions
 * @param {string} platform - The platform identifier
 * @returns {Object} { width, height, aspectRatio }
 */
export const getPlatformDimensions = (platform) => {
  const dimensions = {
    youtube: { width: '100%', height: '100%', aspectRatio: '16:9' },
    vimeo: { width: '100%', height: '100%', aspectRatio: '16:9' },
    tiktok: { width: '100%', height: '100%', aspectRatio: '9:16' }, // Vertical
    bilibili: { width: '100%', height: '100%', aspectRatio: '16:9' },
    instagram: { width: '100%', height: '100%', aspectRatio: '1:1' }, // Square by default
    directVideo: { width: '100%', height: '100%', aspectRatio: '16:9' }
  };

  return dimensions[platform] || dimensions.youtube;
};

// Export all utilities
export default {
  detectPlatform,
  generateEmbedUrl,
  getVideoThumbnail,
  isValidVideoUrl,
  getPlayerConfig,
  getVideoMetadata,
  formatPlatformName,
  getPlatformDimensions
};