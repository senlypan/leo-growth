package com.leo.growth.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 积分记录实体
 * @author 小主人
 * @since 2026-03-12
 */
@Data
@TableName("point_records")
public class PointRecord implements Serializable {

    private static final long serialVersionUID = 1L;

    /** 主键 ID */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /** 学生 ID */
    private Long studentId;

    /** 积分变化（+/-） */
    private Integer points;

    /** 积分类型：homework-作业，assessment-评估，goal-目标，checkin-打卡 */
    private String pointType;

    /** 描述 */
    private String description;

    /** 关联 ID（作业 ID/评估 ID 等） */
    private Long relatedId;

    /** 逻辑删除 */
    @TableLogic
    private Integer deleted;

    /** 创建时间 */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
}
