package com.leo.growth.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.leo.growth.entity.User;
import org.apache.ibatis.annotations.Mapper;

/**
 * 用户 Mapper 接口
 * @author 小主人
 * @since 2026-03-11
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

}
