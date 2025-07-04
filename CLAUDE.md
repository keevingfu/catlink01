# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Catlink Content-Driven Growth Decision System - A comprehensive analytics platform for content marketing, social media analytics (especially TikTok/Douyin), influencer management, and business intelligence. The system provides multi-dimensional content analysis, audience insights, campaign optimization, and AI-powered predictions.

## Commands

### Quick Development Start
```bash
# From project root - starts both frontend and backend
# Note: This script kills processes on ports 3000/5001 and handles graceful shutdown
./start.sh
```

### Backend Development
```bash
cd backend
npm install
npm run dev      # Development with nodemon (port 5001)
npm start        # Production mode
npm test         # Run tests
```

### Frontend Development
```bash
cd frontend
npm install
npm start        # Development server (port 3000) with proxy to backend
npm run build    # Production build
npm test         # Run tests
npm run eject    # Eject from Create React App (irreversible)
```

### Database Location
The SQLite database is located at: `data/catlink.db` (contains production data)

### Linting and Type Checking
```bash
# Currently no linting/type checking scripts configured
# TypeScript dependencies are installed but not actively used
# Consider adding ESLint configuration
```

## Architecture

### Tech Stack
- **Frontend**: React 18 with Create React App, Redux Toolkit, Ant Design 5, Recharts, React Router v6, React Player, React Query
- **Backend**: Node.js (ES Modules), Express, Sequelize ORM with SQLite
- **Database**: SQLite with existing production data (migration-ready for PostgreSQL)
- **Authentication**: JWT with dual-token strategy (15min access, 7d refresh)
- **Security**: Helmet, CORS, rate limiting, bcrypt, express-validator
- **Additional**: Morgan logging, compression, Axios with interceptors

### Project Structure
```
catlink-growth-system/
├── backend/
│   └── src/
│       ├── api/              # Route definitions grouped by domain
│       ├── config/           # Database and app configuration
│       ├── controllers/      # Request handlers
│       ├── middleware/       # Auth, error handling, validation
│       ├── models/          # Sequelize models (30+ tables)
│       ├── services/        # Business logic layer
│       └── utils/          # Helper utilities
├── frontend/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/          # Route-based page components
│       ├── services/       # API service layer with Axios
│       ├── store/          # Redux store and slices
│       ├── hooks/          # Custom React hooks
│       └── utils/          # Helper functions
└── data/
    └── catlink.db          # SQLite database file
```

### API Endpoints

Base URL: `http://localhost:5001/api`

- **Auth**: `/api/auth` - login, register, refresh, logout
- **Content**: `/api/content` - content analysis, performance metrics, ROI
- **Audience**: `/api/audience` - personas, sentiment, content affinity
- **Campaigns**: `/api/campaigns` - campaign management, A/B testing
- **Trends**: `/api/trends` - trend forecasting, keyword analysis
- **Influencers**: `/api/influencers` - KOL/KOC performance, account matrix
- **Analytics**: `/api/analytics` - cross-platform analysis, clustering
- **Dashboard**: `/api/dashboard` - KPIs, business insights

### Authentication Architecture

**Token Flow**:
1. Login returns access token (15min) + refresh token (7d)
2. Access token stored in localStorage
3. Refresh token in httpOnly cookie
4. Axios interceptor adds token to requests
5. On 401, automatic refresh attempt
6. Failed refresh redirects to login

**Security Implementation**:
- Passwords hashed with bcrypt (10 rounds)
- Role-based access (user, admin, manager)
- Protected routes with authentication middleware
- Soft delete for user accounts (isActive flag)

### Frontend State Management

Redux store organized by domain:
- `auth` - User session and tokens
- `content` - Content data and performance
- `audience` - Personas and sentiment
- `campaign` - Campaign management
- `analytics` - Cross-platform metrics

Each slice follows pattern:
```javascript
{
  data/items: [],
  loading: false,
  error: null,
  filters: {}
}
```

### Database Schema

30+ tables in star schema pattern with core entities:
- User (UUID primary keys)
- Content, ContentPerformance
- Campaign, AdPerformance
- Audience, CommentSentimentAnalysis
- ContentFeature (AI analysis)

Sequelize configured with:
- Automatic timestamps (createdAt, updatedAt)
- Underscored naming convention
- Model validation
- Hooks for password hashing

### Environment Variables

Backend `.env`:
```
PORT=5001
NODE_ENV=development
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
DATABASE_URL=sqlite:./catlink.db

# Optional API Keys
OPENAI_API_KEY=your-openai-key
YOUTUBE_API_KEY=your-youtube-key
TIKTOK_API_KEY=your-tiktok-key

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

Frontend (configured in package.json proxy):
```
REACT_APP_API_URL=http://localhost:5001/api
```

## Key Development Patterns

### API Service Layer
- Centralized Axios instance with interceptors
- Automatic token injection
- Token refresh on 401 errors
- Consistent error handling

### Component Architecture
- Functional components with hooks
- Protected routes HOC
- Lazy loading for performance
- Ant Design for consistent UI

### Error Handling
- Global error middleware
- Consistent error response format
- Environment-aware logging
- Validation errors with field details

### Security Practices
- Input validation on all endpoints
- Rate limiting (100 req/15min)
- CORS with credentials
- Parameterized queries via Sequelize

## Testing

- Jest configured for both frontend and backend
- Test files: `*.test.js` or `*.spec.js`
- Backend: Unit tests for services and controllers
- Frontend: React Testing Library for components

## Deployment

### Frontend (Vercel)
Configured in `vercel.json`:
- Build command: `cd frontend && npm install && npm run build`
- Output directory: `frontend/build`
- SPA routing handled
- Environment variable: `@catlink-api-url`

### Backend
Requires separate deployment (Railway/Render recommended)
- Set production environment variables
- Consider PostgreSQL for production
- Update CORS_ORIGIN for frontend domain

## Important Notes

1. **Database**: Production data exists in SQLite file - handle with care
2. **Start Script**: `start.sh` kills existing processes on ports 3000/5001
3. **Language**: All UI must be in English, data may contain Chinese content
4. **Focus**: TikTok/Douyin analytics with multi-platform support
5. **Video**: All video content requires preview functionality (React Player)
6. **Real-time**: Dashboard expects live data updates
7. **Authentication**: Required for all API endpoints except auth routes
8. **Python Scripts**: Available for data import/processing (TSV/CSV to SQLite)