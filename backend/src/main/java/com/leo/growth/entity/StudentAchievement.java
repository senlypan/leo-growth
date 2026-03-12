package com.leo.growth.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 学生成就实体
 * @author 小主人
 * @since 2026-03-12
 */
@Data
@TableName("student_achievements")
public class StudentAchievement implements Serializable {

    private static final long serialVersionUID = 1L;

    /** 主键 ID */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /** 学生 ID */
    private Long studentId;

    /** 成就 ID */
    private Long achievementId;

    /** 获得时间 */
    private LocalDateTime achievedAt;

    /** 进度 */
    private Integer progress;

    /** 是否已完成 */
    private Boolean completed;

    /** 逻辑删除 */
    @TableLogic
    private Integer deleted;

    /** 创建时间 */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
}
