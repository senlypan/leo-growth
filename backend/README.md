# Leo Growth Backend - Java SpringBoot

潘灏成成长规划系统后端服务 - Java SpringBoot 3.2.0 + MyBatis-Plus

## 技术栈

- **Java**: 17
- **Spring Boot**: 3.2.0
- **MyBatis-Plus**: 3.5.4
- **MySQL**: 8.0+
- **JWT**: 0.12.3
- **Maven**: 3.8+

## 项目结构

```
backend/
├── pom.xml                           # Maven 配置
├── src/
│   ├── main/
│   │   ├── java/com/leo/growth/
│   │   │   ├── LeoGrowthApplication.java    # 启动类
│   │   │   ├── common/                      # 通用类
│   │   │   │   └── Result.java              # 统一响应结果
│   │   │   ├── config/                      # 配置类
│   │   │   ├── controller/                  # 控制器层
│   │   │   │   ├── AuthController.java      # 认证控制器
│   │   │   │   ├── HomeworkController.java  # 作业控制器
│   │   │   │   ├── MistakeController.java   # 错题控制器
│   │   │   │   └── ReportController.java    # 报告控制器
│   │   │   ├── dto/                         # 数据传输对象
│   │   │   ├── entity/                      # 实体类
│   │   │   │   ├── User.java                # 用户实体
│   │   │   │   ├── Homework.java            # 作业实体
│   │   │   │   └── Mistake.java             # 错题实体
│   │   │   ├── mapper/                      # Mapper 层
│   │   │   │   ├── UserMapper.java
│   │   │   │   ├── HomeworkMapper.java
│   │   │   │   └── MistakeMapper.java
│   │   │   └── service/                     # 服务层
│   │   │       ├── UserService.java
│   │   │       ├── HomeworkService.java
│   │   │       ├── MistakeService.java
│   │   │       └── impl/                    # 服务实现
│   │   └── resources/
│   │       ├── application.yml              # 应用配置
│   │       └── db/
│   │           └── init.sql                 # 数据库初始化脚本
│   └── test/java/                           # 测试代码
└── README.md
```

## 快速开始

### 1. 环境要求
- JDK 17+
- MySQL 8.0+
- Maven 3.8+

### 2. 数据库初始化
```bash
# 登录 MySQL
mysql -u root -p

# 执行初始化脚本
source src/main/resources/db/init.sql
```

### 3. 配置修改
编辑 `src/main/resources/application.yml`：
```yaml
spring:
  datasource:
    username: root
    password: your_password_here  # 修改为你的数据库密码

jwt:
  secret: your_jwt_secret_key_here  # 修改为安全的密钥

wechat:
  app-id: your_wechat_app_id
  app-secret: your_wechat_app_secret
```

### 4. 启动应用
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

启动成功后会看到：
```
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   🌟 Leo Growth Backend API Service                    ║
║   潘灏成成长规划系统后端服务                            ║
║                                                        ║
║   SpringBoot 3.2.0 + MyBatis-Plus                      ║
║   Server running on port 3000                          ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

## API 接口

### 认证接口
- `POST /api/auth/login` - 微信登录
- `POST /api/auth/logout` - 登出
- `GET /api/auth/profile` - 获取用户信息

### 作业接口
- `GET /api/homework?studentId=1` - 获取作业列表
- `GET /api/homework/{id}` - 获取作业详情
- `POST /api/homework` - 创建作业
- `POST /api/homework/{id}/submit` - 提交作业
- `POST /api/homework/{id}/check` - 检查作业

### 错题接口
- `GET /api/mistakes?studentId=1` - 获取错题列表
- `GET /api/mistakes/{id}` - 获取错题详情
- `POST /api/mistakes` - 记录错题
- `PUT /api/mistakes/{id}/review` - 标记已复习
- `DELETE /api/mistakes/{id}` - 删除错题
- `GET /api/mistakes/statistics?studentId=1` - 错题统计

### 报告接口
- `GET /api/reports/daily?studentId=1` - 日报
- `GET /api/reports/weekly?studentId=1` - 周报
- `GET /api/reports/monthly?studentId=1` - 月报

## 开发进度

### ✅ 已完成
- [x] SpringBoot 项目初始化
- [x] Maven 依赖配置
- [x] 数据库设计（5 张表）
- [x] Entity 实体类（User, Homework, Mistake）
- [x] Mapper 接口（MyBatis-Plus）
- [x] Service 接口和实现
- [x] Controller 控制器（4 个）
- [x] 统一响应结果 Result
- [x] 数据库初始化脚本

### 📋 待完成
- [ ] JWT 认证过滤器
- [ ] 微信登录 API 对接
- [ ] 文件上传功能
- [ ] AI 服务集成
- [ ] 单元测试
- [ ] 部署配置

## 数据库表

| 表名 | 说明 |
|------|------|
| users | 用户表 |
| homeworks | 作业表 |
| homework_submissions | 作业提交表 |
| mistakes | 错题表 |
| learning_reports | 学习报告表 |

---

**创建日期:** 2026-03-11  
**作者:** 小主人  
**目标用户:** 潘灏成（二年级）
