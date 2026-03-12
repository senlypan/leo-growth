package com.leo.growth.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 错题实体
 * @author 小主人
 * @since 2026-03-11
 */
@Data
@TableName("mistakes")
public class Mistake implements Serializable {

    private static final long serialVersionUID = 1L;

    /** 主键 ID */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /** 学生 ID */
    private Long studentId;

    /** 作业 ID */
    private Long homeworkId;

    /** 科目 */
    private String subject;

    /** 题目内容 */
    private String question;

    /** 用户答案 */
    private String userAnswer;

    /** 正确答案 */
    private String correctAnswer;

    /** 错误类型 */
    private String errorType;

    /** 知识点 */
    private String knowledgePoint;

    /** 是否已复习 */
    private Boolean reviewed;

    /** 逻辑删除 */
    @TableLogic
    private Integer deleted;

    /** 创建时间 */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    /** 更新时间 */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
