package com.leo.growth.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 学习目标实体
 * @author 小主人
 * @since 2026-03-12
 */
@Data
@TableName("learning_goals")
public class LearningGoal implements Serializable {

    private static final long serialVersionUID = 1L;

    /** 主键 ID */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /** 学生 ID */
    private Long studentId;

    /** 目标类型：long-term-长期，short-term-短期 */
    private String goalType;

    /** 目标标题 */
    private String goalTitle;

    /** 目标描述 */
    private String goalDescription;

    /** 目标日期 */
    private LocalDateTime targetDate;

    /** 进度 0-100 */
    private Integer progress;

    /** 状态：active-进行中，completed-已完成，abandoned-已放弃 */
    private String status;

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
