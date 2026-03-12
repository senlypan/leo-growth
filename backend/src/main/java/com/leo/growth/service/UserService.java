package com.leo.growth.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.leo.growth.entity.User;

/**
 * 用户服务接口
 * @author 小主人
 * @since 2026-03-11
 */
public interface UserService extends IService<User> {

    /**
     * 微信登录
     * @param code 微信登录 code
     * @return 用户信息
     */
    User wxLogin(String code);

    /**
     * 根据 openid 获取用户
     * @param openid 微信 openid
     * @return 用户信息
     */
    User getByOpenid(String openid);
}
