# GitHub Release 发布说明模板

## v1.5.0 - 作业辅导员完成 🎉

**发布日期:** 2026-03-12  
**版本类型:** Minor Release (次版本号)

---

## 🎉 亮点

**作业辅导员模块 100% 完成！**

经过一天的密集开发，我们完成了从 v1.0 到 v1.5 的所有功能，实现了完整的作业管理、错题本和学习报告系统。

---

## ✨ 新增功能

### v1.4.0 学习报告
- 📊 学习概览（总作业/完成率/平均分/错题复习率）
- 📈 科目统计（语数英三科进度条可视化）
- 🎯 错题分析（薄弱知识点 TOP5）
- 💡 智能学习建议（优势/改进/鼓励）

### v1.3.0 作业提交
- 📸 拍照上传作业（最多 9 张）
- 📝 文字说明（可选）
- 📋 提交记录查看
- 👨‍🏫 家长检查确认（正确性/评分/反馈）
- ⭐ 1-5 星评分系统

### v1.2.0 错题本
- ❌ 错题列表（科目/状态筛选）
- 📝 错题详情（题目/答案/解析）
- ➕ 错题录入（拍照/文字/错误类型/知识点）
- ✅ 复习标记（待复习/已掌握）
- 🗑️ 错题删除

### v1.1.0 作业列表
- 📝 作业列表（科目/状态筛选）
- 📅 日期选择（今天/明天/自定义）
- 📖 作业详情
- ⏰ 截止日期提醒

---

## 🔧 技术栈

- **后端:** Spring Boot 3.x + MyBatis-Plus + MySQL 8.0
- **前端:** 微信小程序原生开发
- **JDK:** Java 17
- **构建工具:** Maven 3.9.6

---

## 📦 安装指南

### 1. 环境要求
- JDK 17+
- Maven 3.8+
- MySQL 8.0+
- 微信开发者工具

### 2. 快速开始
```bash
# 克隆项目
git clone https://github.com/senlypan/leo-growth.git
cd leo-growth

# 数据库配置
mysql -u root -p < backend/src/main/resources/db/init.sql

# 启动后端
cd backend
mvn spring-boot:run

# 前端
# 用微信开发者工具打开 frontend 目录
```

详细指南请参考 [STARTUP_GUIDE.md](STARTUP_GUIDE.md)

---

## 📊 统计数据

- **代码量:** ~4500 行
- **页面数:** 9 个
- **API 接口:** 18 个
- **开发时间:** 1 天
- **Git 提交:** 10+ 次

---

## 🐛 已知问题

- [ ] 后端需要安装 Maven 才能启动
- [ ] 前端需要真机测试验证
- [ ] GitHub 推送可能因网络问题失败

---

## 📝 变更日志

完整变更日志请查看 [CHANGELOG.md](CHANGELOG.md)

---

## 🙏 致谢

- **开发者:** 小主人
- **目标用户:** 潘灏成（二年级）
- **特别感谢:** 所有支持和帮助项目的人

---

## 📄 许可证

MIT License

---

## 🔗 相关链接

- [项目主页](https://github.com/senlypan/leo-growth)
- [问题反馈](https://github.com/senlypan/leo-growth/issues)
- [文档](https://github.com/senlypan/leo-growth/blob/main/README.md)

---

**🎉 作业辅导员模块完成！下一步：v2.0 学业规划师**
