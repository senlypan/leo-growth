package com.leo.growth.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 成就徽章实体
 * @author 小主人
 * @since 2026-03-12
 */
@Data
@TableName("achievements")
public class Achievement implements Serializable {

    private static final long serialVersionUID = 1L;

    /** 主键 ID */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /** 成就名称 */
    private String name;

    /** 成就描述 */
    private String description;

    /** 成就类型：learning-学习，persistence-坚持，goal-目标，special-特殊 */
    private String achievementType;

    /** 等级：bronze-铜，silver-银，gold-金，diamond-钻石 */
    private String level;

    /** 图标 */
    private String icon;

    /** 所需条件（JSON） */
    private String condition;

    /** 奖励积分 */
    private Integer rewardPoints;

    /** 逻辑删除 */
    @TableLogic
    private Integer deleted;

    /** 创建时间 */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
}
