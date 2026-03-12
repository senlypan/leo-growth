package com.leo.growth.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.leo.growth.entity.User;
import com.leo.growth.mapper.UserMapper;
import com.leo.growth.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 用户服务实现类
 * @author 小主人
 * @since 2026-03-11
 */
@Slf4j
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Override
    public User wxLogin(String code) {
        log.info("微信登录，code: {}", code);
        
        // TODO: 调用微信 API 获取 openid
        // String openid = wechatService.getOpenid(code);
        
        // 模拟 openid
        String openid = "mock_openid_" + code;
        
        // 查询用户是否存在
        User user = getByOpenid(openid);
        
        if (user == null) {
            // 创建新用户
            user = new User();
            user.setOpenid(openid);
            user.setRole("student");
            user.setName("潘灏成");
            user.setPoints(100);
            save(user);
            log.info("创建新用户：{}", user.getId());
        }
        
        return user;
    }

    @Override
    public User getByOpenid(String openid) {
        if (StrUtil.isBlank(openid)) {
            return null;
        }
        
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getOpenid, openid);
        return getOne(wrapper);
    }
}
