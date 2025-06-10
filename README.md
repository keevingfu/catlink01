# Catlink Content-Driven Growth Decision System

A comprehensive analytics platform for content marketing, audience insights, and business intelligence.

## System Architecture

### Technology Stack
- **Frontend**: React 18, Redux Toolkit, Ant Design, Recharts
- **Backend**: Node.js, Express, Sequelize ORM
- **Database**: SQLite (using existing catlink.db)
- **Video**: React Player for video preview functionality

### Key Features

#### 1. Content Marketing Analysis
- Multi-dimensional content performance tracking
- Cross-platform content comparison
- Content ROI analysis
- Creative elements effectiveness analysis
- Video preview functionality for all video content

#### 2. Audience Behavior & Persona Analysis
- User persona building and management
- Comment sentiment analysis
- Audience-content affinity mapping
- Behavioral pattern recognition

#### 3. Ad Campaign Optimization
- Campaign performance tracking
- A/B testing analysis
- Target audience optimization
- Budget allocation insights

#### 4. Trends & Forecasting
- Real-time trend monitoring
- Keyword analysis and tracking
- AI-powered performance predictions
- Regional trend variations

#### 5. KOL/KOC Analysis
- Influencer performance metrics
- Self-operated account matrix analysis
- Cross-platform account synergy

#### 6. Content Intelligence
- Multi-modal content analysis (visual, audio, emotional)
- Content clustering and categorization
- Video segment analysis
- AI-driven content insights

#### 7. Cross-Platform Synergy
- Platform-specific metrics comparison
- Content propagation path analysis
- Optimal posting time recommendations

#### 8. Business Intelligence Dashboard
- Real-time KPI monitoring
- Comprehensive reporting
- Decision support analytics
- Competitive intelligence

## Installation

### Prerequisites
- Node.js 16+
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Project Structure

```
catlink-growth-system/
├── backend/
│   ├── src/
│   │   ├── api/          # API routes
│   │   ├── models/       # Database models
│   │   ├── services/     # Business logic
│   │   ├── middleware/   # Express middleware
│   │   └── config/       # Configuration files
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── store/        # Redux store
│   │   └── utils/        # Utility functions
│   └── package.json
└── shared/               # Shared types/constants
```

## API Endpoints

### Content APIs
- `GET /api/content` - Get all content
- `GET /api/content/performance` - Get performance metrics
- `GET /api/content/roi` - Get ROI analysis
- `GET /api/content/:id/preview` - Get video preview

### Audience APIs
- `GET /api/audience/personas` - Get user personas
- `GET /api/audience/sentiment` - Get sentiment analysis
- `GET /api/audience/content-affinity` - Get content preferences

### Campaign APIs
- `GET /api/campaigns` - Get all campaigns
- `GET /api/campaigns/:id/performance` - Get campaign performance

### Analytics APIs
- `GET /api/analytics/content-features` - Get content features
- `GET /api/analytics/cross-platform` - Get cross-platform analysis

## Development Guidelines

1. All UI text must be in English
2. Video content must include preview functionality
3. Use TypeScript for type safety
4. Follow React best practices
5. Implement responsive design
6. Ensure real-time data updates

## Security Considerations
- JWT authentication
- Rate limiting
- Input validation
- CORS configuration
- Environment variables for sensitive data

## Performance Optimization
- Lazy loading for components
- Data caching with React Query
- Image optimization
- Code splitting
- Database query optimization