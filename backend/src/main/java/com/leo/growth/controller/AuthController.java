package com.leo.growth.controller;

import com.leo.growth.common.Result;
import com.leo.growth.entity.User;
import com.leo.growth.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * 认证控制器
 * @author 小主人
 * @since 2026-03-11
 */
@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    /**
     * 微信登录
     */
    @PostMapping("/login")
    public Result<Map<String, Object>> login(@RequestBody Map<String, String> request) {
        String code = request.get("code");
        
        if (StrUtil.isBlank(code)) {
            return Result.error(400, "缺少微信登录 code");
        }
        
        try {
            User user = userService.wxLogin(code);
            
            Map<String, Object> data = new HashMap<>();
            data.put("token", "mock_jwt_token_" + user.getId());
            data.put("user", user);
            
            return Result.success("登录成功", data);
        } catch (Exception e) {
            log.error("登录失败", e);
            return Result.error("登录失败");
        }
    }

    /**
     * 登出
     */
    @PostMapping("/logout")
    public Result<String> logout() {
        // TODO: 实现 token 黑名单
        return Result.success("登出成功");
    }

    /**
     * 获取用户信息
     */
    @GetMapping("/profile")
    public Result<User> getProfile(@RequestHeader("Authorization") String token) {
        // TODO: 从 token 中解析用户 ID
        Long userId = 1L; // 模拟
        
        User user = userService.getById(userId);
        if (user == null) {
            return Result.error(404, "用户不存在");
        }
        
        return Result.success(user);
    }
}
