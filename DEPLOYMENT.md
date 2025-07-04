# Deployment Guide

## Frontend Deployment (Vercel)

### Environment Variables Setup

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add the following variable:
     - Name: `REACT_APP_API_URL`
     - Value: Your backend API URL (e.g., `https://your-backend-api.com/api`)
     - Environment: Production/Preview/Development as needed

2. **Alternative: Using Vercel CLI:**
   ```bash
   vercel env add REACT_APP_API_URL production
   # Enter your backend API URL when prompted
   ```

### Deploy Command
```bash
vercel --prod
```

## Backend Deployment

### Recommended Platforms
- Railway
- Render
- Heroku
- DigitalOcean App Platform

### Environment Variables Required
```
PORT=5001
NODE_ENV=production
JWT_SECRET=your-production-secret-key
JWT_REFRESH_SECRET=your-production-refresh-secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=https://your-frontend-domain.vercel.app
DATABASE_URL=your-database-url
```

### Database Migration
For production, consider migrating from SQLite to PostgreSQL:
1. Export data from SQLite
2. Update DATABASE_URL to PostgreSQL connection string
3. Run Sequelize migrations

## Important Notes

1. **CORS Configuration**: Update `CORS_ORIGIN` in backend to match your frontend domain
2. **API URL**: Ensure frontend `REACT_APP_API_URL` points to your deployed backend
3. **HTTPS**: Both frontend and backend should use HTTPS in production
4. **Secrets**: Never commit secrets to version control