# Leo Growth 后端启动指南

> 🚀 如何启动和测试后端服务

---

## 📋 前置要求

### 必需软件
1. **Java 17+** - OpenJDK 或 Oracle JDK
2. **Maven 3.8+** - 构建工具
3. **MySQL 8.0+** - 数据库

### 可选工具
- **IntelliJ IDEA** - Java IDE
- **Postman** - API 测试
- **PowerShell** - 运行测试脚本

---

## 🔧 安装步骤

### 1. 安装 Java 17
```bash
# Windows (使用 Chocolatey)
choco install openjdk17

# 或者下载安装
# https://adoptium.net/
```

### 2. 安装 Maven
```bash
# Windows (使用 Chocolatey)
choco install maven

# 或者下载
# https://maven.apache.org/download.cgi
```

### 3. 验证安装
```bash
java -version
mvn --version
```

---

## 🗄️ 数据库配置

### 1. 创建数据库
```sql
CREATE DATABASE `leo_growth` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. 初始化表结构
```bash
# 执行 init.sql
mysql -u root -p leo_growth < src/main/resources/db/init.sql
```

### 3. 配置数据库连接
编辑 `src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/leo_growth?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai
    username: root
    password: your_password
```

---

## 🚀 启动服务

### 方法 1: Maven 命令行
```bash
cd leo-growth/backend
mvn spring-boot:run
```

### 方法 2: Maven 打包后运行
```bash
# 打包
mvn clean package -DskipTests

# 运行
java -jar target/leo-growth-0.0.1-SNAPSHOT.jar
```

### 方法 3: IDE 运行
1. 用 IntelliJ IDEA 打开 `leo-growth/backend`
2. 找到 `LeoGrowthApplication.java`
3. 点击运行按钮

---

## ✅ 验证服务

### 1. 检查服务状态
服务启动成功后，应该看到：
```
Started LeoGrowthApplication in X.XXX seconds
Tomcat started on port(s): 8080 (http)
```

### 2. 访问健康检查
```bash
curl http://localhost:8080/actuator/health
```

### 3. 测试 API
```bash
# 学习概览
curl "http://localhost:8080/report/overview?studentId=1&startDate=2026-03-04&endDate=2026-03-10"

# 完整报告
curl "http://localhost:8080/report/full-report?studentId=1&period=weekly"
```

### 4. 运行测试脚本
```powershell
cd leo-growth/scripts
.\test-report-api.ps1
```

---

## 📊 API 端点

### 学习报告
| 端点 | 方法 | 说明 |
|------|------|------|
| `/report/overview` | GET | 学习概览 |
| `/report/homework-stats` | GET | 作业统计 |
| `/report/accuracy-trend` | GET | 正确率趋势 |
| `/report/mistake-analysis` | GET | 错题分析 |
| `/report/suggestions` | GET | 学习建议 |
| `/report/full-report` | GET | 完整报告 |

### 作业管理
| 端点 | 方法 | 说明 |
|------|------|------|
| `/homework` | GET | 作业列表 |
| `/homework/{id}` | GET | 作业详情 |
| `/homework/{id}/submit` | POST | 提交作业 |
| `/homework/{id}/check` | POST | 检查作业 |

### 错题管理
| 端点 | 方法 | 说明 |
|------|------|------|
| `/mistakes` | GET | 错题列表 |
| `/mistakes/{id}` | GET | 错题详情 |
| `/mistakes` | POST | 记录错题 |
| `/mistakes/{id}/review` | PUT | 标记复习 |

---

## 🐛 常见问题

### 1. 端口被占用
**错误:** `Port 8080 was already in use`

**解决:**
```bash
# 查找占用端口的进程
netstat -ano | findstr :8080

# 结束进程（替换 PID）
taskkill /F /PID <PID>
```

### 2. 数据库连接失败
**错误:** `Communications link failure`

**解决:**
- 检查 MySQL 服务是否启动
- 验证数据库用户名密码
- 确认数据库 `leo_growth` 已创建

### 3. Maven 构建失败
**错误:** `Could not resolve dependencies`

**解决:**
```bash
# 清理本地仓库缓存
rm -rf ~/.m2/repository/com/leo

# 重新构建
mvn clean install -U
```

---

## 📝 开发日志

### v1.4 测试记录
- [ ] 后端服务启动
- [ ] 数据库连接测试
- [ ] 报告 API 测试
- [ ] 前端联调测试

---

**文档版本:** 1.0  
**更新时间:** 2026-03-12
