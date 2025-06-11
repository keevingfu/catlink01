# Catlink Growth System - 部署指南

## 📋 部署架构

本项目采用前后端分离架构：
- **前端**：React 应用，部署到 Vercel
- **后端**：Express API，需要单独部署

## 🚀 前端部署到 Vercel

### 方法1：通过 Vercel Dashboard（推荐）

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "Add New Project"
3. 导入 GitHub 仓库：`https://github.com/keevingfu/catlink01`
4. 配置部署设置：
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

5. 添加环境变量：
   - `REACT_APP_API_URL`: 你的后端 API 地址（例如：`https://your-api.railway.app/api`）

6. 点击 "Deploy"

### 方法2：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 在项目根目录
vercel

# 按提示操作：
# - Set up and deploy: Y
# - Which scope: 选择你的账号
# - Link to existing project: N
# - Project name: catlink-frontend
# - In which directory: ./frontend
# - Override settings: N
```

## 🔧 后端部署选项

### 选项1：部署到 Railway（推荐）

1. 访问 [Railway](https://railway.app/)
2. 使用 GitHub 登录
3. 新建项目 > Deploy from GitHub repo
4. 选择 `catlink01` 仓库
5. 配置：
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`

6. 添加环境变量：
   ```
   NODE_ENV=production
   PORT=5001
   JWT_SECRET=your-production-secret
   JWT_REFRESH_SECRET=your-refresh-secret
   CORS_ORIGIN=https://catlink.vercel.app
   ```

7. 部署后获取 API URL，更新 Vercel 的环境变量

### 选项2：部署到 Render

1. 访问 [Render](https://render.com/)
2. New > Web Service
3. 连接 GitHub 仓库
4. 配置：
   - **Name**: catlink-api
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. 添加环境变量（同上）

### 选项3：部署到 Vercel Functions（需要改造）

需要将 Express 应用改造为 Serverless 函数。

## 📝 部署前准备

### 1. 更新生产环境配置

确保以下文件已正确配置：
- `/frontend/.env.production` - 生产环境 API 地址
- `/backend/.env` - 不要提交到 Git

### 2. 数据库考虑

当前使用 SQLite，生产环境建议：
- PostgreSQL (Supabase, Neon, 或 Railway)
- MySQL (PlanetScale)

需要更新 `backend/src/config/database.js`：

```javascript
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});
```

### 3. 安全检查

- [ ] 更新所有生产环境密钥
- [ ] 配置 CORS 只允许前端域名
- [ ] 启用 HTTPS
- [ ] 设置速率限制

## 🔄 持续部署

### GitHub Actions 自动部署

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      # Vercel 会自动处理前端部署
      
      # 后端部署（如使用 Railway）
      # - name: Deploy to Railway
      #   uses: bervProject/railway-deploy@main
      #   with:
      #     railway_token: ${{ secrets.RAILWAY_TOKEN }}
```

## 🌐 部署后验证

1. **前端检查**：
   - 访问 Vercel 提供的 URL
   - 检查是否能正常加载
   - 尝试登录功能

2. **API 检查**：
   - 测试健康检查端点：`GET /api/health`
   - 测试认证端点：`POST /api/auth/login`

3. **集成测试**：
   - 确保前端能正确调用后端 API
   - 检查 CORS 是否正确配置

## 🆘 常见问题

### 1. CORS 错误
确保后端的 `CORS_ORIGIN` 环境变量设置为前端域名。

### 2. 数据库连接失败
- 检查 `DATABASE_URL` 格式是否正确
- 确保数据库服务已启动

### 3. 环境变量未生效
- Vercel：在项目设置中添加环境变量
- Railway/Render：在服务设置中添加

### 4. 构建失败
- 检查 Node.js 版本兼容性
- 确保所有依赖都在 `package.json` 中

## 📞 支持

如遇到问题，可以：
1. 查看部署平台的日志
2. 检查 GitHub Actions 的运行状态
3. 参考平台文档：
   - [Vercel Docs](https://vercel.com/docs)
   - [Railway Docs](https://docs.railway.app/)
   - [Render Docs](https://render.com/docs)