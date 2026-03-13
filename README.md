# Leo Growth - 学生学习管理助手

> K12 学生学习管理助手 - 作业辅导 + 错题本 + 能力评估 + 学习报告

[![Status](https://img.shields.io/badge/status-developing-blue)](https://github.com/senlypan/leo-growth)
[![WeChat](https://img.shields.io/badge/platform-WeChat-07C160)](https://developers.weixin.qq.com/miniprogram/dev/framework/)
[![Progress](https://img.shields.io/badge/progress-65%25-yellow)](https://github.com/senlypan/leo-growth)

---

## 📱 项目简介

Leo Growth 是一款专为 K12 学生设计的学习管理助手，通过智能化的作业管理、错题整理和能力评估，帮助学生高效学习，让家长轻松监督。

### 核心功能

- 📚 **作业辅导** - 拍照录入、AI 识别、智能批改
- ❌ **错题本** - 智能整理、艾宾浩斯复习
- 📊 **能力评估** - 全面测评、精准提升
- 📈 **学习报告** - 数据分析、学习建议

---

## 🎯 功能闭环

### ✅ 已完成（65%）

#### 作业辅导（100%）
```
作业列表 → 录入作业 → 查看详情 → 完成提交 → 家长批改 → 完成反馈
   ✓           ✓           ✓           ✓           ✓           ✓
```

#### 错题本（95%）
```
错题列表 → 录入错题 → 查看详情 → 智能复习 → 掌握确认
   ✓           ✓           ✓           ✓           ✓
```

#### 学习报告（40%）
```
报告概览 → 科目详情 → 学习建议 → 计划追踪
   ✓           ❌           ❌           ❌
```

#### 能力评估（30%）
```
评估入口 → 答题页面 → 评估报告 → 提升计划
   ✓           ❌           ✓           ❌
```

---

## 🚀 快速开始

### 环境要求

- 微信开发者工具 v1.6+
- Node.js 14+
- 小程序基础库 2.19+

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/senlypan/leo-growth.git
cd leo-growth/frontend
```

2. **导入项目**
   - 打开微信开发者工具
   - 导入项目，选择 `frontend` 目录
   - 填写 AppID（或使用测试号）

3. **编译运行**
   - 点击编译按钮
   - 查看效果

---

## 📁 项目结构

```
leo-growth/
├── frontend/                    # 小程序前端
│   ├── pages/                   # 页面
│   │   ├── index/               # 首页
│   │   ├── homework/            # 作业辅导
│   │   │   ├── homework.wxml    # 作业列表
│   │   │   ├── add/             # 作业录入
│   │   │   ├── detail/          # 作业详情
│   │   │   ├── submit/          # 提交作业
│   │   │   ├── check/           # 家长批改
│   │   │   └── completed/       # 完成页
│   │   ├── mistakes/            # 错题本
│   │   │   ├── mistakes.wxml    # 错题列表
│   │   │   ├── submit/          # 录入错题
│   │   │   ├── detail/          # 错题详情
│   │   │   └── review/          # 智能复习
│   │   ├── report/              # 学习报告
│   │   ├── assessment/          # 能力评估
│   │   └── ...
│   ├── components/              # 组件
│   ├── data/                    # 数据
│   │   └── mock.js              # Mock 数据库
│   ├── utils/                   # 工具
│   ├── styles/                  # 全局样式
│   ├── app.wxss                 # 全局样式
│   ├── app.json                 # 全局配置
│   └── app.js                   # 全局逻辑
├── docs/                        # 文档
└── README.md                    # 项目说明
```

---

## 💾 数据存储

### 本地存储（当前）

```javascript
// Mock 数据库
wx.setStorageSync('homework', [...])   // 作业数据
wx.setStorageSync('mistakes', [...])   // 错题数据
wx.setStorageSync('points', {...})     // 积分数据
wx.setStorageSync('user', {...})       // 用户信息
wx.setStorageSync('settings', {...})   // 设置
```

### 云端同步（计划）

```javascript
// 未来实现
POST /api/homework          // 作业管理
POST /api/mistakes          // 错题管理
GET  /api/report            // 学习报告
POST /api/assessment        // 能力评估
```

---

## 🎨 设计规范

### 设计原则
- **简洁** - 少即是多
- **克制** - 去除多余装饰
- **统一** - 一致的视觉语言
- **精致** - 细节决定品质

### 颜色系统
```css
--primary: #07C160;        /* 微信绿 - 唯一主色 */
--text-1: #1A1A1A;         /* 主文字 */
--text-2: #666666;         /* 次文字 */
--text-3: #999999;         /* 辅助文字 */
--bg-1: #F7F8FA;           /* 页面背景 */
--bg-2: #FFFFFF;           /* 卡片背景 */
```

### UI 组件
- 无 emoji，使用纯色块图标
- 统一圆角（8/12/16rpx）
- 统一间距（8 倍数）
- 极简阴影

---

## 📊 开发进度

| 模块 | 进度 | 状态 |
|------|------|------|
| 作业辅导 | 100% | ✅ 完成 |
| 错题本 | 95% | ✅ 完成 |
| 学习报告 | 40% | ⚠️ 进行中 |
| 能力评估 | 30% | ⚠️ 进行中 |
| 学业规划 | 40% | ⚠️ 进行中 |
| 目标管理 | 40% | ⚠️ 进行中 |

**整体进度：65%**

---

## 📋 待办事项

### P0 - 核心功能
- [ ] AI 识别集成（OCR）
- [ ] 学习报告详细页
- [ ] 能力评估答题页
- [ ] 云端同步

### P1 - 重要功能
- [ ] 错题导出 PDF
- [ ] 积分商城
- [ ] 家长端
- [ ] 用户设置

### P2 - 优化体验
- [ ] 骨架屏加载
- [ ] 动画效果
- [ ] 手势操作
- [ ] 主题切换

---

## 📖 文档

- [功能闭环设计文档](./frontend/功能闭环设计文档.md)
- [完整开发计划](./frontend/完整开发计划.md)
- [高级 UI 设计规范](./frontend/高级 UI 设计规范.md)
- [使用指南](./frontend/使用指南.md)
- [开发进度](./frontend/开发进度 -20260313.md)

---

## 🛠️ 技术栈

- **前端框架**: 微信小程序原生
- **数据存储**: 本地存储（wx.Storage）
- **UI 风格**: 微信极简风
- **开发模式**: 敏捷开发

---

## 📝 开发规范

### 分支管理
```
main (master)
├── test          # 测试分支
└── prd           # 生产分支
    └── feature/* # 功能分支
```

### 提交规范
```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式
refactor: 重构
perf: 性能优化
test: 测试
chore: 构建/工具
```

---

## 📄 License

MIT License

---

## 👥 团队

- **开发**: Leo Team
- **设计**: Leo Team
- **产品**: Leo Team

---

**让学习更高效，让成长更清晰！** 🌟
