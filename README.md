# Leo Growth - 儿童学习成长助手

> 📚 智能辅导作业 | 📖 规划学习路径 | 🏃 科学训练体能

[![Version](https://img.shields.io/badge/version-v1.4.0-blue.svg)](https://github.com/senlypan/leo-growth/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://adoptium.net/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)

---

## 📖 项目简介

**Leo Growth** 是一款专为儿童设计的学习成长管理微信小程序，集作业辅导、学业规划、体能训练于一体，帮助孩子科学学习、健康成长。

### 核心功能

- **📚 作业辅导员** - 智能管理作业，拍照提交，家长检查，错题本
- **📖 学业规划师** - 能力评估，学习路径规划，目标管理（开发中）
- **🏃 体能规划师** - 体测记录，运动计划，训练打卡（规划中）

### 适用人群

- 小学 1-6 年级学生
- 关注孩子学习的家长
- 需要科学学习规划的家庭

---

## 🎯 版本迭代记录

### v1.4.0 (2026-03-12) - 学习报告功能 ✅

**新增功能:**
- 📊 学习报告主页（周期选择/概览/统计/分析/建议）
- 📈 学习概览（总作业/完成率/平均分/错题复习率）
- 📉 科目统计（语数英三科进度条可视化）
- 🎯 错题分析（薄弱知识点 TOP5）
- 💡 智能学习建议（优势/改进/鼓励）

**后端 API:**
- `GET /report/overview` - 学习概览
- `GET /report/homework-stats` - 作业统计
- `GET /report/accuracy-trend` - 正确率趋势
- `GET /report/mistake-analysis` - 错题分析
- `GET /report/suggestions` - 学习建议
- `GET /report/full-report` - 完整报告聚合接口

**技术亮点:**
- 数据可视化（进度条/网格布局）
- 智能建议生成（基于规则引擎）
- 完整的数据统计和分析

**文件变更:**
- 新增 `ReportController.java`
- 新增 `ReportService.java` + `ReportServiceImpl.java`
- 新增 `pages/report/report.*` 前端页面
- 新增 `test-report-api.ps1` 测试脚本

---

### v1.3.0 (2026-03-12) - 作业提交功能 ✅

**新增功能:**
- 📸 拍照上传作业（最多 9 张，自动压缩）
- 📝 文字说明（可选）
- 📋 提交记录查看（时间线展示）
- 👨‍🏫 家长检查确认（正确性/评分/反馈）
- ⭐ 1-5 星评分系统

**后端 API:**
- `POST /homework/{id}/submit` - 提交作业
- `GET /homework/{id}/submissions` - 获取提交记录
- `POST /homework/{id}/check` - 检查作业

**前端页面:**
- `pages/homework/submit/submit.*` - 作业提交页
- `pages/homework/submission/submission.*` - 提交记录页
- `pages/homework/check/check.*` - 家长检查页

**技术亮点:**
- 多图上传和预览
- 完整作业流程闭环（查看→提交→检查→反馈）
- 状态机管理（pending→completed→checked）

**文件变更:**
- 新增 `pages/homework/submit/*`
- 新增 `pages/homework/submission/*`
- 新增 `pages/homework/check/*`
- 完善 `HomeworkServiceImpl.java`

---

### v1.2.0 (2026-03-12) - 错题本功能 ✅

**新增功能:**
- ❌ 错题列表（科目/状态筛选）
- 📝 错题详情（题目/答案/解析）
- ➕ 错题录入（拍照/文字/错误类型/知识点）
- ✅ 复习标记（待复习/已掌握）
- 🗑️ 错题删除

**后端 API:**
- `GET /mistakes` - 获取错题列表
- `GET /mistakes/{id}` - 获取错题详情
- `POST /mistakes` - 记录错题
- `PUT /mistakes/{id}/review` - 标记复习
- `DELETE /mistakes/{id}` - 删除错题
- `GET /mistakes/statistics` - 获取统计数据

**技术亮点:**
- 5 种错误类型分类（计算/知识点/记忆/粗心/理解）
- 知识点标记功能
- 科目配色系统（语文红/数学蓝/英语橙）
- 复习状态跟踪

**文件变更:**
- 新增 `MistakeController.java`
- 新增 `MistakeServiceImpl.java`
- 新增 `pages/mistakes/*` 前端页面
- 数据库 `mistakes` 表完善

---

### v1.1.0 (2026-03-12) - 作业列表功能 ✅

**新增功能:**
- 📝 作业列表（科目/状态筛选）
- 📅 日期选择（今天/明天/自定义）
- 📖 作业详情
- ⏰ 截止日期提醒

**后端 API:**
- `GET /homework` - 作业列表
- `GET /homework/{id}` - 作业详情
- `POST /homework` - 创建作业

**技术亮点:**
- 多维度筛选（科目/状态/日期）
- 响应式布局
- 空状态和加载状态优化

**文件变更:**
- 新增 `HomeworkController.java`
- 新增 `HomeworkServiceImpl.java`
- 新增 `pages/homework/*` 前端页面

---

### v1.0.0 (2026-03-12) - 基础框架 ✅

**新增功能:**
- 🏗️ 项目初始化（前后端分离架构）
- 🎨 全局样式和主题
- 📡 API 封装
- 🏠 首页设计
- 🗄️ 数据库设计

**技术栈:**
- **后端:** Spring Boot 3.x + MyBatis-Plus + MySQL 8.0
- **前端:** 微信小程序原生开发
- **数据库:** MySQL 8.0 (utf8mb4)

**文件变更:**
- 项目基础结构搭建
- `LeoGrowthApplication.java`
- `application.yml` 配置
- `init.sql` 数据库初始化脚本
- `pages/index/*` 首页

---

## 📅 开发计划

### v1.5.0 (开发中) - 作业辅导员完成 🎉
- [x] 模块整合优化
- [x] 首页入口完善
- [x] 文档完善（README/CHANGELOG/STARTUP_GUIDE）
- [x] .gitignore 配置
- [ ] GitHub/GitLab 推送 🔄
- [ ] 真机测试

### v2.0.0 (开发中) - 学业规划师 📖
- [x] 能力评估功能（前端 + 后端 API）
  - [x] 评估页面（科目选择/答题界面/结果展示）
  - [x] AssessmentController（5 个 API）
  - [x] AssessmentService（评估逻辑）
  - [x] 数据库表（assessments/assessment_questions）
- [x] 学习路径功能（后端 API）
  - [x] LearningPathController（4 个 API）
  - [x] LearningPathService（路径逻辑）
  - [x] 数据库表（knowledge_points）
- [ ] 目标管理功能
- [ ] 进度跟踪

### v3.0.0 (规划中) - 体能规划师 🏃
- [ ] 体测数据记录
- [ ] 运动计划制定
- [ ] 训练打卡
- [ ] 数据统计分析

---

## 🛠️ 技术架构

### 后端技术栈
- **框架:** Spring Boot 3.x
- **ORM:** MyBatis-Plus
- **数据库:** MySQL 8.0
- **构建工具:** Maven 3.8+
- **JDK:** Java 17+

### 前端技术栈
- **平台:** 微信小程序
- **开发工具:** 微信开发者工具
- **UI:** 原生组件 + 自定义样式

### 开发环境
- **IDE:** IntelliJ IDEA / VS Code
- **数据库工具:** MySQL Workbench / Navicat
- **API 测试:** Postman / PowerShell 脚本

---

## 🚀 快速开始

### 环境要求
- JDK 17+
- Maven 3.8+
- MySQL 8.0+
- 微信开发者工具

### 1. 克隆项目
```bash
git clone https://github.com/senlypan/leo-growth.git
cd leo-growth
```

### 2. 数据库配置
```sql
CREATE DATABASE `leo_growth` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `leo_growth`;
SOURCE backend/src/main/resources/db/init.sql;
```

### 3. 后端配置
编辑 `backend/src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/leo_growth?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai
    username: root
    password: your_password
```

### 4. 启动后端
```bash
cd backend
mvn spring-boot:run
```

### 5. 前端配置
1. 打开微信开发者工具
2. 导入 `frontend` 目录
3. 修改 `utils/api.js` 中的 API 地址
4. 编译运行

---

## 📁 项目结构

```
leo-growth/
├── backend/                    # 后端 Spring Boot 项目
│   ├── src/main/java/
│   │   └── com/leo/growth/
│   │       ├── controller/    # 控制器层
│   │       ├── service/       # 服务层
│   │       ├── mapper/        # 数据访问层
│   │       └── entity/        # 实体类
│   ├── src/main/resources/
│   │   ├── application.yml    # 配置文件
│   │   └── db/init.sql        # 数据库初始化脚本
│   └── pom.xml                # Maven 配置
├── frontend/                   # 前端微信小程序
│   ├── pages/                 # 页面
│   │   ├── index/            # 首页
│   │   ├── homework/         # 作业模块
│   │   ├── mistakes/         # 错题本
│   │   └── report/           # 学习报告
│   ├── utils/                # 工具类
│   └── app.*                 # 小程序配置
├── scripts/                   # 脚本工具
│   └── test-report-api.ps1   # API 测试脚本
├── docs/                      # 文档
├── README.md                  # 项目说明
└── STARTUP_GUIDE.md          # 启动指南
```

---

## 📊 分支管理

### 分支策略
```
main (生产分支)
  ↑
test (测试分支)
  ↑
feature/* (功能分支)
```

### 开发流程
1. 从 `main` 创建 `feature` 分支
2. 在 `feature` 分支开发功能
3. 合并到 `test` 分支测试
4. 测试通过后合并到 `main` 分支

### 分支命名
- `feature/homework-submit` - 作业提交功能
- `feature/mistake-book` - 错题本功能
- `feature/learning-report` - 学习报告功能

---

## 🧪 测试

### 后端 API 测试
```powershell
cd scripts
.\test-report-api.ps1
```

### 前端测试
1. 微信开发者工具导入项目
2. 真机预览
3. 功能测试

---

## 📝 开发文档

- [启动指南](STARTUP_GUIDE.md) - 详细的启动配置说明
- [迭代计划](leo-growth/ITERATION_PLAN.md) - 详细的迭代开发计划
- [完成报告](leo-growth/V1.4_COMPLETE.md) - v1.4 完成报告

---

## 👨‍💻 开发者

- **开发者:** 小主人
- **目标用户:** 潘灏成（二年级）
- **开发时间:** 2026-03-12 开始

---

## 📄 许可证

MIT License

---

## 🌟 特性预览

### 作业管理
- ✅ 作业列表和筛选
- ✅ 拍照提交作业
- ✅ 家长检查评分
- ✅ 提交记录查看

### 错题本
- ✅ 错题录入和分类
- ✅ 错题详情和解析
- ✅ 复习状态跟踪
- ✅ 薄弱知识点分析

### 学习报告
- ✅ 学习概览统计
- ✅ 科目成绩可视化
- ✅ 错题分析
- ✅ 智能学习建议

### 能力评估
- ✅ 语数英三科评估
- ✅ Canvas 雷达图展示
- ✅ 优势/薄弱点分析
- ✅ 个性化学习建议

### 学习路径
- ✅ 知识点地图
- ✅ 学习进度可视化
- ✅ 下一步推荐
- ✅ 标记已掌握

### 目标管理
- ✅ 短期/长期目标
- ✅ 进度跟踪
- ✅ 目标统计
- ✅ 完成庆祝

---

## 👧👦 小学生友好设计

### 设计理念
- **简单** - 一页一事，操作简单
- **有趣** - 游戏化，有奖励
- **直观** - 一看就懂，一点就会
- **鼓励** - 正面反馈，建立自信

### 设计特点
- 🎨 **大字体** - 30-40rpx，清晰易读
- 🎯 **大按钮** - 88-96rpx 高度，方便点击
- 🌈 **明亮色彩** - 温暖明亮，吸引注意力
- 💬 **简单语言** - 孩子能懂，没有术语
- 🎉 **即时鼓励** - 每次操作都有正面反馈
- 🏆 **游戏化** - 积分、成就、徽章系统

### 鼓励语示例
```
✅ "太棒了！"
✅ "真厉害！"
✅ "继续加油！"
✅ "你又进步了！"
✅ "老师相信你可以的！"
```

**目标:** 让 7 岁孩子也能独立使用！🎉

---

**🎉 作业辅导员模块 100% 完成！**

**下一步:** v2.0 学业规划师开发中...
