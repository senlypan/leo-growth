package com.leo.growth.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;

/**
 * 评估题目实体
 * @author 小主人
 * @since 2026-03-12
 */
@Data
@TableName("assessment_questions")
public class AssessmentQuestion implements Serializable {

    private static final long serialVersionUID = 1L;

    /** 主键 ID */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /** 科目 */
    private String subject;

    /** 题目类型 */
    private String questionType;

    /** 题目内容 */
    private String questionContent;

    /** 选项（JSON） */
    private String options;

    /** 正确答案 */
    private String correctAnswer;

    /** 分数 */
    private Integer score;

    /** 难度等级 1-5 */
    private Integer difficulty;

    /** 逻辑删除 */
    @TableLogic
    private Integer deleted;
}
