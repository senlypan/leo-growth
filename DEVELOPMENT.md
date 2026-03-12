# Leo Growth 开发说明

> 项目开发指南和注意事项

## 📋 已完成的工作

### 1. 项目规划 ✅
- [x] 项目整体规划（PROJECT_PLAN.md）
- [x] 功能模块设计
- [x] 技术架构设计
- [x] 开发计划制定

### 2. 后端框架 ✅
- [x] Spring Boot 项目初始化
- [x] Maven 配置（pom.xml）
- [x] 应用配置（application.yml）
- [x] 启动类（LeoGrowthApplication.java）
- [x] 统一响应结果（Result.java）
- [x] 实体类（User, Homework, Mistake）
- [x] Mapper 接口
- [x] Service 接口和实现
- [x] Controller 控制器
- [x] 数据库初始化脚本（init.sql）

### 3. 前端框架 ✅
- [x] 小程序项目初始化
- [x] 项目配置（project.config.json）
- [x] 应用配置（app.json）
- [x] 入口文件（app.js）
- [x] 全局样式（app.wxss）
- [x] 首页设计（pages/index）
- [x] API 封装（utils/api.js）
- [x] 前端文档（README.md）

## 📁 当前项目结构

```
leo-growth/
├── PROJECT_PLAN.md           # 项目规划文档
├── README.md                 # 项目说明
├── backend/                  # 后端（Java SpringBoot）
│   ├── pom.xml
│   ├── src/
│   │   └── main/
│   │       ├── java/com/leo/growth/
│   │       │   ├── LeoGrowthApplication.java
│   │       │   ├── common/Result.java
│   │       │   ├── controller/
│   │       │   ├── service/
│   │       │   ├── mapper/
│   │       │   └── entity/
│   │       └── resources/
│   │           ├── application.yml
│   │           └── db/init.sql
│   └── README.md
│
└── frontend/                 # 前端（微信小程序）
    ├── app.js
    ├── app.json
    ├── app.wxss
    ├── project.config.json
    ├── sitemap.json
    ├── images/
    ├── utils/api.js
    ├── pages/
    │   └── index/
    │       ├── index.wxml
    │       ├── index.js
    │       └── index.wxss
    ├── homework-tutor/       # 待整合
    ├── study-planner/        # 待整合
    └── fitness-planner/      # 待整合
```

## 🎯 下一步工作

### 优先级 P0（必须）
1. **整合作业辅导员模块**
   - 将 homework-tutor 目录整合到 pages/
   - 创建作业列表、详情、提交页面
   - 实现拍照上传功能

2. **完善后端 API**
   - 实现微信登录接口
   - 实现作业 CRUD 接口
   - 实现错题 CRUD 接口

3. **数据库连接**
   - 安装 MySQL
   - 执行 init.sql 创建数据库
   - 配置数据库连接

### 优先级 P1（重要）
1. **错题本功能**
   - 错题列表页面
   - 错题详情页面
   - 错题分类筛选

2. **学习报告功能**
   - 数据统计
   - 图表展示
   - 学习建议

3. **学业规划模块**
   - 能力评估问卷
   - 学习路径展示
   - 目标管理

### 优先级 P2（可选）
1. **体能规划模块**
2. **UI/UX 优化**
3. **性能优化**

## 🔧 开发环境配置

### 后端环境
1. 安装 JDK 17+
2. 安装 Maven 3.8+
3. 安装 MySQL 8.0+
4. 配置数据库连接

### 前端环境
1. 安装微信开发者工具
2. 配置 AppID
3. 配置 API 地址

## 📝 开发注意事项

### 1. 数据库
- 使用 UTF-8 编码
- 表名使用复数形式（users, homeworks）
- 所有表包含 created_at, updated_at, deleted 字段

### 2. API 设计
- RESTful 风格
- 统一响应格式（Result 类）
- 使用 JWT 认证

### 3. 小程序开发
- 使用 ES6+ 语法
- 使用 async/await 处理异步
- 注意页面栈限制（10 层）

### 4. 代码管理
- 使用 Git 版本控制
- 重要提交写清楚注释
- 定期推送到远程仓库

## 🐛 已知问题

1. **小程序图片资源**
   - 需要添加 tabBar 图标
   - 路径：frontend/images/

2. **后端数据库**
   - 需要安装 MySQL
   - 需要执行 init.sql

3. **API 地址**
   - 开发环境：http://localhost:3000
   - 生产环境：需要配置正式域名

## 📚 参考资料

- [微信小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [Spring Boot 官方文档](https://spring.io/projects/spring-boot)
- [MyBatis-Plus 文档](https://baomidou.com/)
- [项目规划文档](PROJECT_PLAN.md)

---

**最后更新:** 2026-03-12  
**版本:** v1.0
