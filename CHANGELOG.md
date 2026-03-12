# 变更日志

所有重要的项目变更都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

---

## [未发布]

### 规划中
- v2.0.0 学业规划师
  - 能力评估功能
  - 学习路径规划
  - 目标管理
- v3.0.0 体能规划师
  - 体测数据记录
  - 运动计划制定
  - 训练打卡

---

## [1.5.0] - 2026-03-12

### 新增
- 首页模块入口完善
- 导航优化
- 用户体验提升

### 优化
- 代码性能优化
- 错误处理完善
- 加载状态优化

### 修复
- Bug 修复
- 兼容性问题修复

---

## [1.4.0] - 2026-03-12

### 新增
- 学习报告功能
  - 学习概览（总作业/完成率/平均分/错题复习率）
  - 科目统计（语数英三科进度条可视化）
  - 错题分析（薄弱知识点 TOP5）
  - 智能学习建议（优势/改进/鼓励）
- 后端报告 API
  - `GET /report/overview` - 学习概览
  - `GET /report/homework-stats` - 作业统计
  - `GET /report/accuracy-trend` - 正确率趋势
  - `GET /report/mistake-analysis` - 错题分析
  - `GET /report/suggestions` - 学习建议
  - `GET /report/full-report` - 完整报告
- 前端报告页面 `pages/report/report.*`
- API 测试脚本 `test-report-api.ps1`
- 启动指南 `STARTUP_GUIDE.md`

### 技术亮点
- 数据可视化（进度条/网格布局）
- 智能建议生成（基于规则引擎）
- 完整的数据统计和分析

---

## [1.3.0] - 2026-03-12

### 新增
- 作业提交功能
  - 拍照上传（最多 9 张，自动压缩）
  - 文字说明（可选）
  - 提交记录查看
  - 家长检查确认（正确性/评分/反馈）
  - 1-5 星评分系统
- 后端提交 API
  - `POST /homework/{id}/submit` - 提交作业
  - `GET /homework/{id}/submissions` - 获取提交记录
  - `POST /homework/{id}/check` - 检查作业
- 前端页面
  - `pages/homework/submit/submit.*` - 作业提交页
  - `pages/homework/submission/submission.*` - 提交记录页
  - `pages/homework/check/check.*` - 家长检查页

### 优化
- 作业列表添加操作按钮（提交/检查/记录）
- 作业详情页操作栏完善
- 页面跳转逻辑优化

### 技术亮点
- 多图上传和预览
- 完整作业流程闭环
- 状态机管理（pending→completed→checked）

---

## [1.2.0] - 2026-03-12

### 新增
- 错题本功能
  - 错题列表（科目/状态筛选）
  - 错题详情（题目/答案/解析）
  - 错题录入（拍照/文字/错误类型/知识点）
  - 复习标记（待复习/已掌握）
  - 错题删除
- 后端错题 API
  - `GET /mistakes` - 获取错题列表
  - `GET /mistakes/{id}` - 获取错题详情
  - `POST /mistakes` - 记录错题
  - `PUT /mistakes/{id}/review` - 标记复习
  - `DELETE /mistakes/{id}` - 删除错题
  - `GET /mistakes/statistics` - 获取统计数据
- 前端页面
  - `pages/mistakes/mistakes.*` - 错题列表页
  - `pages/mistakes/detail/detail.*` - 错题详情页
  - `pages/mistakes/submit/submit.*` - 错题录入页

### 技术亮点
- 5 种错误类型分类
- 知识点标记功能
- 科目配色系统
- 复习状态跟踪

---

## [1.1.0] - 2026-03-12

### 新增
- 作业列表功能
  - 作业列表（科目/状态筛选）
  - 日期选择（今天/明天/自定义）
  - 作业详情
  - 截止日期提醒
- 后端作业 API
  - `GET /homework` - 作业列表
  - `GET /homework/{id}` - 作业详情
  - `POST /homework` - 创建作业
- 前端页面 `pages/homework/homework.*`

### 技术亮点
- 多维度筛选
- 响应式布局
- 空状态和加载状态优化

---

## [1.0.0] - 2026-03-12

### 新增
- 项目初始化
- 基础框架搭建
- 数据库设计
- 首页设计

### 技术栈
- 后端：Spring Boot 3.x + MyBatis-Plus + MySQL 8.0
- 前端：微信小程序原生开发
- 数据库：MySQL 8.0 (utf8mb4)

### 文件
- `LeoGrowthApplication.java`
- `application.yml`
- `init.sql`
- `pages/index/*`

---

## 版本说明

### 语义化版本格式

- **主版本号（Major）**: 不兼容的 API 修改
- **次版本号（Minor）**: 向下兼容的功能性新增
- **修订号（Patch）**: 向下兼容的问题修正

### 发布类型

- **🎉 完成**: 模块完成版本
- **✨ 功能**: 新功能发布
- **🐛 修复**: Bug 修复版本
- **⚡ 性能**: 性能优化版本
- **📝 文档**: 文档更新版本

---

**最新状态:** v1.4.0 学习报告功能完成 ✅  
**下一步:** v1.5.0 作业辅导员完成 🎉
