# Leo Growth - 微信小程序前端

潘灏成成长规划系统 - 微信小程序前端项目

## 📁 项目结构

```
frontend/
├── app.js                    # 小程序入口
├── app.json                  # 小程序配置
├── app.wxss                  # 全局样式
├── project.config.json       # 项目配置
├── sitemap.json              # 站点地图
├── images/                   # 图片资源
├── utils/                    # 工具函数
│   ├── api.js               # API 请求封装
│   └── ...
├── pages/                    # 页面
│   ├── index/               # 首页
│   │   ├── index.wxml
│   │   ├── index.js
│   │   └── index.wxss
│   ├── homework/            # 作业
│   ├── mistakes/            # 错题
│   └── report/              # 报告
└── components/              # 组件（待创建）
```

## 🚀 快速开始

### 1. 环境准备

- 微信开发者工具（最新版本）
- Node.js 16+（可选）

### 2. 配置项目

1. 打开微信开发者工具
2. 导入项目：选择 `frontend` 目录
3. 配置 AppID：
   - 测试：使用测试号
   - 生产：填写正式 AppID

4. 修改 `app.js` 中的 API 地址：
```javascript
globalData: {
  apiBaseUrl: 'http://your-server:3000/api'
}
```

### 3. 运行项目

- 点击"编译"按钮即可运行
- 使用"预览"在真机测试

## 📋 开发计划

### 第一阶段：基础框架 ✅
- [x] 项目初始化
- [x] 全局样式
- [x] API 封装
- [x] 首页设计

### 第二阶段：作业辅导员（进行中）
- [ ] 作业列表页面
- [ ] 作业详情页面
- [ ] 拍照上传功能
- [ ] 错题本功能
- [ ] 学习报告页面

### 第三阶段：学业规划师
- [ ] 能力评估问卷
- [ ] 学习路径展示
- [ ] 目标管理功能
- [ ] 进度跟踪页面

### 第四阶段：体能规划师
- [ ] 体测记录页面
- [ ] 运动计划展示
- [ ] 训练打卡功能
- [ ] 数据统计页面

## 🎨 UI 设计规范

### 主题色
- **主色:** #4ECDC4（青绿色）
- **辅助色:** #FF6B6B（珊瑚红）
- **成功色:** #2ECC71（绿色）
- **警告色:** #F39C12（橙色）
- **危险色:** #E74C3C（红色）

### 字体大小
- 标题：36rpx
- 正文：28rpx
- 辅助文字：24rpx
- 小字：22rpx

### 间距规范
- 小间距：10rpx
- 中间距：20rpx
- 大间距：30rpx
- 超大间距：40rpx

## 🔧 工具函数

### API 请求
```javascript
const api = require('../../utils/api.js')

// GET 请求
api.get('/homeworks', { studentId: 1 }).then(res => {
  console.log(res)
})

// POST 请求
api.post('/homeworks', { content: '作业内容' }).then(res => {
  console.log(res)
})

// 文件上传
api.uploadFile('/upload', filePath, 'image').then(res => {
  console.log(res)
})
```

## 📝 开发规范

### 命名规范
- 文件名：kebab-case（如：homework-list.wxml）
- 变量名：camelCase（如：studentName）
- 常量名：UPPER_SNAKE_CASE（如：API_BASE_URL）

### 代码规范
- 使用 ESLint 检查代码
- 遵循微信小程序开发规范
- 中文注释

### Git 规范
- 分支管理：main / dev / feature/*
- 提交信息：feat: 新增 / fix: 修复 / docs: 文档

## 📊 页面路由

### TabBar 页面
- `/pages/index/index` - 首页
- `/pages/homework/homework` - 作业
- `/pages/mistakes/mistakes` - 错题
- `/pages/report/report` - 报告

### 普通页面
- `/pages/study/assessment/assessment` - 能力评估
- `/pages/study/path/path` - 学习路径
- `/pages/study/goals/goals` - 目标管理
- `/pages/fitness/test/test` - 体测记录
- `/pages/fitness/plan/plan` - 运动计划

## 🔗 相关文档

- [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [Vant Weapp 组件库](https://youzan.github.io/vant-weapp/)
- [项目总规划](../PROJECT_PLAN.md)

---

**创建日期:** 2026-03-12  
**版本:** v1.0 - 初始版本
