package com.leo.growth.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 作业实体
 * @author 小主人
 * @since 2026-03-11
 */
@Data
@TableName("homeworks")
public class Homework implements Serializable {

    private static final long serialVersionUID = 1L;

    /** 主键 ID */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /** 学生 ID */
    private Long studentId;

    /** 科目：chinese-语文，math-数学，english-英语 */
    private String subject;

    /** 作业内容 */
    private String content;

    /** 状态：pending-未完成，completed-已完成，checked-已检查 */
    private String status;

    /** 布置日期 */
    private LocalDate assignDate;

    /** 截止日期 */
    private LocalDate dueDate;

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
