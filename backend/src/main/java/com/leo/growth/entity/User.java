package com.leo.growth.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 用户实体
 * @author 小主人
 * @since 2026-03-11
 */
@Data
@TableName("users")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    /** 主键 ID */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /** 微信 openid */
    private String openid;

    /** 角色：parent-家长，student-学生 */
    private String role;

    /** 姓名 */
    private String name;

    /** 头像 URL */
    private String avatar;

    /** 手机号 */
    private String phone;

    /** 积分 */
    private Integer points;

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
