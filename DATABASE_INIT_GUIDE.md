# 数据库初始化说明

> 📊 统一使用 `init.sql` 进行数据库初始化

---

## ✅ 统一说明

**重要：** 项目已统一使用 **`init.sql`** 作为唯一的数据库初始化脚本。

**文件位置:** `backend/src/main/resources/db/init.sql`

---

## 🗄️ 数据库表

**init.sql 包含以下 12 张表：**

### 1. 用户模块
- `users` - 用户表

### 2. 作业管理模块
- `homeworks` - 作业表
- `homework_submissions` - 作业提交表

### 3. 错题本模块
- `mistakes` - 错题表

### 4. 学习报告模块
- `learning_reports` - 学习报告表

### 5. 能力评估模块
- `assessments` - 能力评估表
- `assessment_questions` - 评估题目表

### 6. 目标管理模块
- `learning_goals` - 学习目标表

### 7. 积分成就模块
- `student_points` - 学生积分表
- `point_records` - 积分记录表
- `achievements` - 成就徽章表
- `student_achievements` - 学生成就表

---

## 🚀 初始化步骤

### 方法 1: 命令行执行

```bash
# MySQL 命令行
mysql -u root -p leo_growth < backend/src/main/resources/db/init.sql
```

### 方法 2: MySQL Workbench

1. 打开 MySQL Workbench
2. 连接到数据库
3. 打开 `backend/src/main/resources/db/init.sql`
4. 执行脚本

### 方法 3: 其他工具

```bash
# 使用 source 命令
mysql -u root -p
USE leo_growth;
SOURCE backend/src/main/resources/db/init.sql;
```

---

## 📋 脚本内容

### 包含内容
- ✅ 创建数据库（如果不存在）
- ✅ 创建 12 张表（包含所有模块）
- ✅ 创建索引和约束
- ✅ 插入测试数据

### 测试数据
- 1 个测试用户（潘灏成）
- 3 个测试作业
- 2 个测试错题
- 初始积分记录
- 3 个测试成就

---

## ⚠️ 注意事项

### 1. 数据库字符集
```sql
CREATE DATABASE `leo_growth` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
- 使用 `utf8mb4` 字符集（支持 emoji）
- 使用 `utf8mb4_unicode_ci` 排序规则

### 2. 表引擎
- 所有表使用 `InnoDB` 引擎
- 支持事务和外键

### 3. 逻辑删除
- 所有表都有 `deleted` 字段
- 使用逻辑删除，不物理删除数据

### 4. 时间字段
- `create_time` - 创建时间（自动填充）
- `update_time` - 更新时间（自动更新）

---

## 📊 表结构说明

### 通用字段

所有表都包含以下通用字段：

```sql
`id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键 ID'
`deleted` TINYINT DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除'
`create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
`update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
```

### 索引命名规范

```
PRIMARY KEY - 主键索引
uk_*        - 唯一索引（如 uk_openid）
idx_*       - 普通索引（如 idx_student_id）
```

---

## 🔄 历史说明

### 之前的情况
- `init.sql` - 旧版本（225 行，部分表）
- `init-full.sql` - 新版本（283 行，完整表）

### 现在的统一
- **`init.sql`** - 唯一版本（283 行，12 张完整表）
- 已删除 `init-full.sql`

### 为什么统一
- 避免混淆
- 减少维护成本
- 文档统一引用

---

## 📁 相关文件

### 数据库相关
- `backend/src/main/resources/db/init.sql` - 数据库初始化脚本 ✅
- `backend/src/main/resources/application.yml` - 数据库配置

### 文档相关
- `STARTUP_GUIDE.md` - 启动指南（包含数据库配置说明）
- `README.md` - 项目说明
- `OPTIMIZATION_SUGGESTIONS.md` - 优化建议

---

## ✅ 检查清单

初始化完成后，检查以下内容：

- [ ] 数据库 `leo_growth` 已创建
- [ ] 12 张表已创建
- [ ] 测试数据已插入
- [ ] 索引已创建
- [ ] 字符集正确（utf8mb4）

---

**最后更新:** 2026-03-12 22:15  
**版本:** v2.0.0  
**维护者:** 小主人
