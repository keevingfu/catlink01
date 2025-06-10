# CatLink Growth System API Documentation

## Base URL
```
http://localhost:5000/api
```

## Table of Contents
- [Health Check](#health-check)
- [Content Routes](#content-routes)
- [Audience Routes](#audience-routes)
- [Campaign Routes](#campaign-routes)
- [Trends Routes](#trends-routes)
- [Influencer Routes](#influencer-routes)
- [Analytics Routes](#analytics-routes)
- [Dashboard Routes](#dashboard-routes)
- [Error Responses](#error-responses)
- [Authentication](#authentication)
- [Rate Limiting](#rate-limiting)
- [CORS](#cors)

## Health Check

### GET /api/health
Check API status

**Response:**
```json
{
  "status": "ok",
  "message": "API is running"
}
```

## Content Routes

### GET /api/content/performance
Get content performance metrics across all platforms

**Query Parameters:**
- `platform` (string, optional): Filter by platform (e.g., "youtube", "tiktok", "instagram")
- `startDate` (string, optional): Start date in ISO format (e.g., "2024-01-01")
- `endDate` (string, optional): End date in ISO format
- `limit` (number, optional): Number of results to return (default: 20, max: 100)
- `sort` (string, optional): Sort by field (e.g., "engagement_rate", "view_count")

**Response:**
```json
{
  "message": "Get content performance",
  "data": [
    {
      "content_id": 123,
      "platform": "youtube",
      "title": "Product Review - Summer Collection",
      "view_count": 45000,
      "like_count": 3200,
      "comment_count": 450,
      "share_count": 120,
      "engagement_rate": 7.12,
      "completion_rate": 68.5,
      "published_at": "2024-06-15T10:30:00Z"
    }
  ]
}
```

### GET /api/content/performance/trends
Get content performance trends over time

**Query Parameters:**
- `metric` (string, required): Metric to track (e.g., "views", "engagement", "conversions")
- `interval` (string, optional): Time interval ("daily", "weekly", "monthly", default: "daily")
- `startDate` (string, required): Start date in ISO format
- `endDate` (string, required): End date in ISO format
- `platform` (string, optional): Filter by platform

**Response:**
```json
{
  "message": "Get performance trends",
  "data": [
    {
      "date": "2024-06-01",
      "views": 12500,
      "engagement_rate": 6.8,
      "average_watch_time": 145.2
    },
    {
      "date": "2024-06-02",
      "views": 13200,
      "engagement_rate": 7.1,
      "average_watch_time": 152.7
    }
  ]
}
```

### GET /api/content/performance/comparison
Compare content performance across platforms

**Response:**
```json
{
  "message": "Get platform comparison"
}
```

### GET /api/content/roi
Get content return on investment analysis

**Response:**
```json
{
  "message": "Get content ROI"
}
```

### GET /api/content/roi/products
Get ROI analysis for product-related content

**Response:**
```json
{
  "message": "Get product content ROI"
}
```

### GET /api/content/creative-elements
Analyze creative elements in content

**Response:**
```json
{
  "message": "Get creative elements"
}
```

### GET /api/content/creative-elements/viral
Get analysis of viral content elements

**Response:**
```json
{
  "message": "Get viral elements"
}
```

### GET /api/content
Get all content with filtering and pagination

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 20, max: 100)
- `platform` (string, optional): Filter by platform
- `type` (string, optional): Content type (e.g., "video", "image", "story")
- `status` (string, optional): Content status (e.g., "active", "archived")
- `search` (string, optional): Search in title and description

**Response:**
```json
{
  "message": "Get all content",
  "data": [
    {
      "id": 1,
      "platform": "tiktok",
      "content_id": "7123456789",
      "title": "Quick Makeup Tutorial",
      "description": "5-minute makeup routine for busy mornings",
      "type_key": "video",
      "published_at": "2024-06-20T14:30:00Z",
      "url": "https://www.tiktok.com/@user/video/7123456789",
      "thumbnail_url": "https://p16-sign.tiktok.com/...",
      "duration_seconds": 58,
      "hashtags": ["#makeup", "#tutorial", "#quicktips"],
      "performance": {
        "view_count": 125000,
        "like_count": 9800,
        "engagement_rate": 8.2
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "totalPages": 8
  }
}
```

### GET /api/content/:id
Get specific content by ID with full details

**Parameters:**
- `id` (string): Content ID

**Response:**
```json
{
  "message": "Get content 123",
  "data": {
    "id": 123,
    "platform": "youtube",
    "content_id": "dQw4w9WgXcQ",
    "title": "Product Launch Announcement",
    "description": "Introducing our new summer collection...",
    "type_key": "video",
    "published_at": "2024-06-15T10:30:00Z",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "thumbnail_url": "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "duration_seconds": 180,
    "language": "en",
    "hashtags": ["#newcollection", "#summer2024", "#fashion"],
    "mentions": ["@influencer1", "@partner_brand"],
    "creator": {
      "id": 456,
      "username": "fashionbrand",
      "platform_id": "UC123456789"
    },
    "performance": {
      "view_count": 45000,
      "like_count": 3200,
      "comment_count": 450,
      "share_count": 120,
      "save_count": 89,
      "engagement_rate": 7.12,
      "reach": 38000,
      "impressions": 52000,
      "click_through_rate": 3.4,
      "average_watch_time": 124.5,
      "completion_rate": 68.5
    }
  }
}
```

### GET /api/content/:id/performance-history
Get historical performance data for specific content

**Parameters:**
- `id` (string): Content ID

**Response:**
```json
{
  "message": "Get content performance history"
}
```

### GET /api/content/:id/preview
Get video preview for specific content

**Parameters:**
- `id` (string): Content ID

**Response:**
```json
{
  "message": "Get video preview"
}
```

## Audience Routes

### GET /api/audience/personas
Get all audience personas with demographic and behavioral data

**Query Parameters:**
- `active` (boolean, optional): Filter by active status
- `platform` (string, optional): Filter by preferred platform

**Response:**
```json
{
  "message": "Get all personas",
  "data": [
    {
      "id": 1,
      "persona_name": "Young Professionals",
      "age_range": "25-34",
      "gender": "mixed",
      "location": {
        "countries": ["US", "UK", "CA"],
        "urban_percentage": 85
      },
      "interests": ["technology", "fashion", "travel", "wellness"],
      "behaviors": {
        "shopping_frequency": "weekly",
        "brand_loyalty": "medium",
        "price_sensitivity": "low"
      },
      "preferred_platforms": ["instagram", "youtube", "tiktok"],
      "content_preferences": {
        "video_length": "short",
        "content_types": ["tutorials", "reviews", "behind-the-scenes"]
      },
      "active_times": {
        "weekdays": ["12:00-13:00", "18:00-22:00"],
        "weekends": ["10:00-12:00", "14:00-18:00"]
      },
      "segment_size": 45000
    }
  ]
}
```

### GET /api/audience/personas/:id
Get specific persona details

**Parameters:**
- `id` (string): Persona ID

**Response:**
```json
{
  "message": "Get persona {id}"
}
```

### GET /api/audience/content-affinity
Get content affinity data for audience segments

**Response:**
```json
{
  "message": "Get content affinity data"
}
```

### GET /api/audience/sentiment
Get audience sentiment analysis

**Response:**
```json
{
  "message": "Get sentiment analysis"
}
```

### GET /api/audience/comment-topics
Get analysis of comment topics from audience

**Response:**
```json
{
  "message": "Get comment topics"
}
```

## Campaign Routes

### GET /api/campaigns
Get all campaigns

**Response:**
```json
{
  "message": "Get all campaigns"
}
```

### GET /api/campaigns/:id
Get specific campaign details

**Parameters:**
- `id` (string): Campaign ID

**Response:**
```json
{
  "message": "Get campaign {id}"
}
```

### GET /api/campaigns/:id/performance
Get campaign performance metrics with daily breakdown

**Parameters:**
- `id` (string): Campaign ID

**Query Parameters:**
- `startDate` (string, optional): Start date for performance data
- `endDate` (string, optional): End date for performance data
- `groupBy` (string, optional): Group results by "day", "week", or "platform"

**Response:**
```json
{
  "message": "Get campaign 789 performance",
  "data": {
    "campaign_id": 789,
    "overall_performance": {
      "impressions": 850000,
      "clicks": 42500,
      "conversions": 850,
      "spend": 8500.00,
      "revenue": 29750.00,
      "click_through_rate": 5.0,
      "conversion_rate": 2.0,
      "cost_per_click": 0.20,
      "cost_per_conversion": 10.00,
      "return_on_ad_spend": 3.5
    },
    "daily_performance": [
      {
        "date": "2024-07-01",
        "impressions": 28000,
        "clicks": 1400,
        "conversions": 28,
        "spend": 280.00,
        "revenue": 980.00
      }
    ],
    "platform_breakdown": {
      "instagram": {
        "impressions": 500000,
        "clicks": 30000,
        "conversions": 600
      },
      "tiktok": {
        "impressions": 350000,
        "clicks": 12500,
        "conversions": 250
      }
    }
  }
}
```

### POST /api/campaigns
Create a new campaign

**Request Body:**
```json
{
  "campaign_name": "Summer Sale 2024",
  "campaign_type": "conversion",
  "objective": "drive_sales",
  "budget": 10000.00,
  "currency": "USD",
  "start_date": "2024-07-01T00:00:00Z",
  "end_date": "2024-07-31T23:59:59Z",
  "target_metrics": {
    "impressions": 1000000,
    "clicks": 50000,
    "conversions": 1000,
    "roas": 3.5
  },
  "targeting": {
    "personas": [1, 2],
    "platforms": ["instagram", "tiktok"],
    "geos": ["US", "CA"]
  }
}
```

**Response:**
```json
{
  "message": "Campaign created successfully",
  "data": {
    "id": 789,
    "campaign_name": "Summer Sale 2024",
    "status": "draft",
    "created_at": "2024-06-25T10:30:00Z"
  }
}
```

### PUT /api/campaigns/:id
Update existing campaign

**Parameters:**
- `id` (string): Campaign ID

**Request Body:**
```json
{
  // Updated campaign details
}
```

**Response:**
```json
{
  "message": "Update campaign {id}"
}
```

## Trends Routes

### GET /api/trends
Get trending topics and patterns

**Response:**
```json
{
  "message": "Get trends"
}
```

### GET /api/trends/keywords
Get trending keywords and hashtags

**Query Parameters:**
- `platform` (string, optional): Filter by platform
- `category` (string, optional): Filter by category
- `timeframe` (string, optional): Time period ("24h", "7d", "30d", default: "7d")
- `limit` (number, optional): Number of results (default: 20)

**Response:**
```json
{
  "message": "Get keywords",
  "data": [
    {
      "keyword": "#summervibes",
      "trend_score": 92.5,
      "growth_rate": 45.2,
      "volume": 125000,
      "platforms": {
        "tiktok": 75000,
        "instagram": 50000
      },
      "related_keywords": ["#summer2024", "#beachlife", "#vacation"],
      "peak_time": "2024-06-20T15:00:00Z"
    },
    {
      "keyword": "sustainable fashion",
      "trend_score": 88.3,
      "growth_rate": 32.1,
      "volume": 98000,
      "platforms": {
        "youtube": 45000,
        "instagram": 53000
      }
    }
  ]
}
```

### GET /api/trends/predictions
Get trend predictions

**Response:**
```json
{
  "message": "Get predictions"
}
```

## Influencer Routes

### GET /api/influencers
Get all influencers

**Response:**
```json
{
  "message": "Get all influencers"
}
```

### GET /api/influencers/self-koc
Get self Key Opinion Consumer (KOC) data

**Response:**
```json
{
  "message": "Get self KOC data"
}
```

### GET /api/influencers/:id
Get specific influencer details

**Parameters:**
- `id` (string): Influencer ID

**Response:**
```json
{
  "message": "Get influencer {id}"
}
```

## Analytics Routes

### GET /api/analytics/content-features
Get content feature analysis

**Response:**
```json
{
  "message": "Get content features"
}
```

### GET /api/analytics/content-clusters
Get content clustering analysis

**Response:**
```json
{
  "message": "Get content clusters"
}
```

### GET /api/analytics/video/:id
Get video analytics for specific content

**Parameters:**
- `id` (string): Video ID

**Response:**
```json
{
  "message": "Get video analysis for {id}"
}
```

### GET /api/analytics/cross-platform
Get cross-platform analytics

**Response:**
```json
{
  "message": "Get cross-platform analysis"
}
```

## Dashboard Routes

### GET /api/dashboard/kpis
Get key performance indicators for the dashboard

**Query Parameters:**
- `period` (string, optional): Time period ("today", "week", "month", "quarter", default: "month")
- `compare` (boolean, optional): Include comparison with previous period

**Response:**
```json
{
  "message": "Get KPIs",
  "data": {
    "overview": {
      "total_reach": {
        "value": 2500000,
        "change": 15.2,
        "trend": "up"
      },
      "engagement_rate": {
        "value": 6.8,
        "change": 0.5,
        "trend": "up"
      },
      "conversion_rate": {
        "value": 2.3,
        "change": -0.2,
        "trend": "down"
      },
      "revenue": {
        "value": 125000,
        "change": 22.5,
        "trend": "up"
      }
    },
    "platform_performance": {
      "youtube": {
        "reach": 1200000,
        "engagement_rate": 5.2
      },
      "tiktok": {
        "reach": 800000,
        "engagement_rate": 8.9
      },
      "instagram": {
        "reach": 500000,
        "engagement_rate": 6.3
      }
    },
    "top_content": [
      {
        "id": 123,
        "title": "Summer Collection Launch",
        "views": 450000,
        "engagement_rate": 9.2
      }
    ],
    "active_campaigns": 5,
    "content_published": 42,
    "period": "month",
    "last_updated": "2024-06-25T10:00:00Z"
  }
}
```

### GET /api/dashboard/insights
Get dashboard insights

**Response:**
```json
{
  "message": "Get insights"
}
```

### GET /api/dashboard/alerts
Get system alerts

**Response:**
```json
{
  "message": "Get alerts"
}
```

### GET /api/dashboard/recommendations
Get AI-powered recommendations

**Response:**
```json
{
  "message": "Get recommendations"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Invalid request parameters"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Authentication
Currently, the API endpoints are not implementing authentication. In production, you should implement proper authentication using JWT tokens or OAuth.

### Recommended Authentication Flow
1. User logs in with credentials
2. Server validates credentials and returns JWT token
3. Client includes token in Authorization header for subsequent requests
4. Server validates token on each request

**Example Authorization Header:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Rate Limiting
The API includes rate limiting middleware. Default limits should be configured based on your requirements.

### Default Rate Limits
- General endpoints: 100 requests per minute
- Data-intensive endpoints: 20 requests per minute
- Write operations: 30 requests per minute

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1624564800
```

## CORS
Cross-Origin Resource Sharing (CORS) should be configured to allow requests from your frontend domain.

### CORS Configuration
```javascript
{
  origin: ['http://localhost:3000', 'https://app.catlink.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
```

## API Versioning
The API uses URL-based versioning. The current version is v1, accessed via `/api/v1/`.

### Version Strategy
- Current version: v1
- Deprecated versions will be supported for 6 months
- Version changes will be announced 3 months in advance

## Best Practices

### Request Guidelines
1. **Use appropriate HTTP methods**
   - GET for retrieving data
   - POST for creating resources
   - PUT for updating resources
   - DELETE for removing resources

2. **Include proper headers**
   ```
   Content-Type: application/json
   Accept: application/json
   ```

3. **Handle pagination**
   - Use `page` and `limit` parameters
   - Check `pagination` object in responses
   - Default limit is 20, maximum is 100

4. **Use query parameters efficiently**
   - Filter data server-side when possible
   - Combine multiple filters in a single request
   - Use date ranges to limit data volume

### Response Handling
1. **Check status codes**
   - 2xx: Success
   - 4xx: Client errors
   - 5xx: Server errors

2. **Handle errors gracefully**
   - Parse error messages from response body
   - Implement retry logic for 5xx errors
   - Show user-friendly error messages

3. **Cache responses when appropriate**
   - Cache GET requests for static data
   - Respect cache headers from the server
   - Invalidate cache on data updates

### Performance Tips
1. **Batch requests when possible**
   - Use bulk endpoints for multiple operations
   - Reduce number of API calls

2. **Request only needed fields**
   - Use field selection parameters when available
   - Minimize response payload size

3. **Use compression**
   - Enable gzip compression
   - Reduces bandwidth usage

### Security Recommendations
1. **Always use HTTPS in production**
2. **Store tokens securely**
   - Use httpOnly cookies or secure storage
   - Never store tokens in localStorage for sensitive data
3. **Validate input on client and server**
4. **Implement request signing for sensitive operations**

## Webhooks (Future Implementation)
Webhooks will be available for real-time event notifications:
- Campaign status changes
- Content performance milestones
- Trend alerts
- System notifications

## SDK Support (Future Implementation)
Official SDKs are planned for:
- JavaScript/TypeScript
- Python
- PHP
- Ruby