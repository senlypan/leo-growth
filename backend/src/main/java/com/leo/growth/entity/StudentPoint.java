package com.leo.growth.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 学生积分实体
 * @author 小主人
 * @since 2026-03-12
 */
@Data
@TableName("student_points")
public class StudentPoint implements Serializable {

    private static final long serialVersionUID = 1L;

    /** 主键 ID */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /** 学生 ID */
    private Long studentId;

    /** 总积分 */
    private Integer totalPoints;

    /** 可用积分 */
    private Integer availablePoints;

    /** 等级 */
    private Integer level;

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
