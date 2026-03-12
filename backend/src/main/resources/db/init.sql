-- Leo Growth 数据库初始化脚本
-- 数据库：leo_growth
-- 创建日期：2026-03-11

-- 创建数据库
CREATE DATABASE IF NOT EXISTS `leo_growth` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `leo_growth`;

-- 用户表
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键 ID',
    `openid` VARCHAR(64) NOT NULL COMMENT '微信 openid',
    `role` VARCHAR(20) NOT NULL DEFAULT 'student' COMMENT '角色：parent-家长，student-学生',
    `name` VARCHAR(50) NOT NULL COMMENT '姓名',
    `avatar` VARCHAR(255) DEFAULT NULL COMMENT '头像 URL',
    `phone` VARCHAR(20) DEFAULT NULL COMMENT '手机号',
    `points` INT DEFAULT 100 COMMENT '积分',
    `deleted` TINYINT DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_openid` (`openid`),
    KEY `idx_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 作业表
DROP TABLE IF EXISTS `homeworks`;
CREATE TABLE `homeworks` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键 ID',
    `student_id` BIGINT NOT NULL COMMENT '学生 ID',
    `subject` VARCHAR(20) NOT NULL COMMENT '科目：chinese-语文，math-数学，english-英语',
    `content` TEXT NOT NULL COMMENT '作业内容',
    `status` VARCHAR(20) NOT NULL DEFAULT 'pending' COMMENT '状态：pending-未完成，completed-已完成，checked-已检查',
    `assign_date` DATE NOT NULL COMMENT '布置日期',
    `due_date` DATE DEFAULT NULL COMMENT '截止日期',
    `deleted` TINYINT DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_subject` (`subject`),
    KEY `idx_status` (`status`),
    KEY `idx_assign_date` (`assign_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='作业表';

-- 作业提交表
DROP TABLE IF EXISTS `homework_submissions`;
CREATE TABLE `homework_submissions` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键 ID',
    `homework_id` BIGINT NOT NULL COMMENT '作业 ID',
    `student_id` BIGINT NOT NULL COMMENT '学生 ID',
    `content` TEXT COMMENT '提交内容',
    `images` JSON DEFAULT NULL COMMENT '图片 URL 列表',
    `submit_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '提交时间',
    `is_correct` TINYINT DEFAULT NULL COMMENT '是否正确：0-错误，1-正确',
    `score` INT DEFAULT NULL COMMENT '分数',
    `feedback` TEXT COMMENT '反馈',
    `checked_at` DATETIME DEFAULT NULL COMMENT '检查时间',
    `deleted` TINYINT DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_homework_id` (`homework_id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_submit_time` (`submit_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='作业提交表';

-- 错题表
DROP TABLE IF EXISTS `mistakes`;
CREATE TABLE `mistakes` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键 ID',
    `student_id` BIGINT NOT NULL COMMENT '学生 ID',
    `homework_id` BIGINT DEFAULT NULL COMMENT '作业 ID',
    `subject` VARCHAR(20) NOT NULL COMMENT '科目',
    `question` TEXT NOT NULL COMMENT '题目内容',
    `user_answer` TEXT COMMENT '用户答案',
    `correct_answer` TEXT COMMENT '正确答案',
    `error_type` VARCHAR(50) DEFAULT NULL COMMENT '错误类型',
    `knowledge_point` VARCHAR(100) DEFAULT NULL COMMENT '知识点',
    `reviewed` TINYINT DEFAULT 0 COMMENT '是否已复习：0-未复习，1-已复习',
    `deleted` TINYINT DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_homework_id` (`homework_id`),
    KEY `idx_subject` (`subject`),
    KEY `idx_reviewed` (`reviewed`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='错题表';

-- 学习报告表
DROP TABLE IF EXISTS `learning_reports`;
CREATE TABLE `learning_reports` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键 ID',
    `student_id` BIGINT NOT NULL COMMENT '学生 ID',
    `report_type` VARCHAR(20) NOT NULL COMMENT '报告类型：daily-日报，weekly-周报，monthly-月报',
    `report_date` DATE NOT NULL COMMENT '报告日期',
    `report_data` JSON NOT NULL COMMENT '报告数据',
    `deleted` TINYINT DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_report_type` (`report_type`),
    KEY `idx_report_date` (`report_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='学习报告表';

-- 能力评估表
DROP TABLE IF EXISTS `assessments`;
CREATE TABLE `assessments` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键 ID',
    `student_id` BIGINT NOT NULL COMMENT '学生 ID',
    `subject` VARCHAR(20) NOT NULL COMMENT '科目',
    `assessment_type` VARCHAR(50) NOT NULL COMMENT '评估类型',
    `score` INT NOT NULL COMMENT '分数',
    `result_data` JSON COMMENT '评估结果数据',
    `deleted` TINYINT DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_subject` (`subject`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='能力评估表';

-- 评估题目表
DROP TABLE IF EXISTS `assessment_questions`;
CREATE TABLE `assessment_questions` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键 ID',
    `subject` VARCHAR(20) NOT NULL COMMENT '科目',
    `question_type` VARCHAR(50) NOT NULL COMMENT '题目类型',
    `question_content` TEXT NOT NULL COMMENT '题目内容',
    `options` JSON COMMENT '选项',
    `correct_answer` VARCHAR(500) NOT NULL COMMENT '正确答案',
    `score` INT NOT NULL DEFAULT 5 COMMENT '分数',
    `difficulty` INT DEFAULT 1 COMMENT '难度等级 1-5',
    `deleted` TINYINT DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
    PRIMARY KEY (`id`),
    KEY `idx_subject` (`subject`),
    KEY `idx_difficulty` (`difficulty`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='评估题目表';

-- 学习目标表
DROP TABLE IF EXISTS `learning_goals`;
CREATE TABLE `learning_goals` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键 ID',
    `student_id` BIGINT NOT NULL COMMENT '学生 ID',
    `goal_type` VARCHAR(20) NOT NULL COMMENT '目标类型：long-term-长期，short-term-短期',
    `goal_title` VARCHAR(200) NOT NULL COMMENT '目标标题',
    `goal_description` TEXT COMMENT '目标描述',
    `target_date` DATETIME COMMENT '目标日期',
    `progress` INT DEFAULT 0 COMMENT '进度 0-100',
    `status` VARCHAR(20) DEFAULT 'active' COMMENT '状态：active-进行中，completed-已完成，abandoned-已放弃',
    `deleted` TINYINT DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='学习目标表';

-- 学生积分表
DROP TABLE IF EXISTS `student_points`;
CREATE TABLE `student_points` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键 ID',
    `student_id` BIGINT NOT NULL COMMENT '学生 ID',
    `total_points` INT DEFAULT 0 COMMENT '总积分',
    `available_points` INT DEFAULT 0 COMMENT '可用积分',
    `level` INT DEFAULT 1 COMMENT '等级',
    `deleted` TINYINT DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_student_id` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='学生积分表';

-- 积分记录表
DROP TABLE IF EXISTS `point_records`;
CREATE TABLE `point_records` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键 ID',
    `student_id` BIGINT NOT NULL COMMENT '学生 ID',
    `points` INT NOT NULL COMMENT '积分变化（+/-）',
    `point_type` VARCHAR(50) NOT NULL COMMENT '积分类型：homework-作业，assessment-评估，goal-目标，checkin-打卡',
    `description` VARCHAR(500) COMMENT '描述',
    `related_id` BIGINT COMMENT '关联 ID（作业 ID/评估 ID 等）',
    `deleted` TINYINT DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_point_type` (`point_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='积分记录表';

-- 成就徽章表
DROP TABLE IF EXISTS `achievements`;
CREATE TABLE `achievements` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键 ID',
    `name` VARCHAR(100) NOT NULL COMMENT '成就名称',
    `description` VARCHAR(500) COMMENT '成就描述',
    `achievement_type` VARCHAR(50) NOT NULL COMMENT '成就类型：learning-学习，persistence-坚持，goal-目标，special-特殊',
    `level` VARCHAR(20) NOT NULL COMMENT '等级：bronze-铜，silver-银，gold-金，diamond-钻石',
    `icon` VARCHAR(100) COMMENT '图标 emoji',
    `condition` JSON COMMENT '所需条件',
    `reward_points` INT DEFAULT 0 COMMENT '奖励积分',
    `deleted` TINYINT DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    KEY `idx_type` (`achievement_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='成就徽章表';

-- 学生成就表
DROP TABLE IF EXISTS `student_achievements`;
CREATE TABLE `student_achievements` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键 ID',
    `student_id` BIGINT NOT NULL COMMENT '学生 ID',
    `achievement_id` BIGINT NOT NULL COMMENT '成就 ID',
    `achieved_at` DATETIME COMMENT '获得时间',
    `progress` INT DEFAULT 0 COMMENT '进度',
    `completed` TINYINT DEFAULT 0 COMMENT '是否已完成：0-未完成，1-已完成',
    `deleted` TINYINT DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_achievement_id` (`achievement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='学生成就表';

-- 插入测试数据
INSERT INTO `users` (`openid`, `role`, `name`, `points`) VALUES 
('mock_openid_001', 'student', '潘灏成', 100);

INSERT INTO `homeworks` (`student_id`, `subject`, `content`, `status`, `assign_date`) VALUES 
(1, 'chinese', '语文作业：完成练习册第 5 页', 'pending', '2026-03-11'),
(1, 'math', '数学作业：口算题卡 20 道', 'completed', '2026-03-11'),
(1, 'english', '英语作业：背诵单词 Unit 1', 'pending', '2026-03-11');

INSERT INTO `mistakes` (`student_id`, `subject`, `question`, `user_answer`, `correct_answer`, `error_type`, `knowledge_point`, `reviewed`) VALUES 
(1, 'math', '25 + 17 = ?', '32', '42', 'calculation_error', '两位数加法', 0),
(1, 'math', '8 × 7 = ?', '54', '56', 'calculation_error', '乘法口诀', 0);
