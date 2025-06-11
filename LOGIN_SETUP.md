# Catlink Growth System - 登录功能设置说明

## ✅ 系统状态
登录功能已经完全实现并正常运行！

## 🚀 启动方式

### 方法1：使用启动脚本（推荐）
```bash
./start.sh
```

### 方法2：分别启动

1. **启动后端服务**
```bash
cd backend
npm start
```

2. **启动前端服务**（新终端窗口）
```bash
cd frontend
npm start
```

## 📍 访问地址
- **前端应用**: http://localhost:3000
- **后端API**: http://localhost:5001

## 🔑 测试账号
- 用户名: `testuser`
- 密码: `Test123`

## 📋 功能列表
- ✅ 用户注册（支持用户名、邮箱、密码验证）
- ✅ 用户登录（支持用户名或邮箱登录）
- ✅ JWT Token 认证
- ✅ Token 自动刷新机制
- ✅ 路由保护（未登录自动跳转）
- ✅ 登录状态持久化

## 🛠 技术实现
- **前端**: React + Redux Toolkit + Ant Design
- **后端**: Node.js + Express + Sequelize + SQLite
- **认证**: JWT (Access Token + Refresh Token)
- **安全**: bcrypt 密码加密、CORS、Rate Limiting

## 📝 API 端点
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出
- `GET /api/auth/me` - 获取当前用户信息
- `POST /api/auth/refresh-token` - 刷新Token

## ⚠️ 注意事项
1. 确保端口 3000（前端）和 5001（后端）未被占用
2. 首次运行需要安装依赖：`npm install`
3. 环境变量配置在 `backend/.env` 文件中

## 🐛 常见问题
1. **端口占用错误**: 使用 `lsof -ti:5001 | xargs kill -9` 关闭占用端口的进程
2. **数据库连接错误**: 确保 SQLite 数据库文件存在于正确路径
3. **CORS错误**: 检查前端请求地址是否正确配置

---
系统已经可以正常使用！如有问题请查看日志文件：
- 后端日志: `backend/backend.log`
- 前端日志: 浏览器控制台