package com.leo.growth.controller;

import cn.hutool.core.util.StrUtil;
import com.leo.growth.common.Result;
import com.leo.growth.entity.Homework;
import com.leo.growth.service.HomeworkService;
import com.leo.growth.service.HomeworkService.HomeworkCheckResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 作业管理控制器
 * @author 小主人
 * @since 2026-03-11
 */
@Slf4j
@RestController
@RequestMapping("/homework")
@RequiredArgsConstructor
public class HomeworkController {

    private final HomeworkService homeworkService;

    /**
     * 获取作业列表
     */
    @GetMapping
    public Result<List<Homework>> list(
            @RequestParam Long studentId,
            @RequestParam(required = false) String subject,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        
        List<Homework> homeworks = homeworkService.getStudentHomeworks(studentId, subject, status, date);
        return Result.success(homeworks);
    }

    /**
     * 获取作业详情
     */
    @GetMapping("/{id}")
    public Result<Homework> detail(@PathVariable Long id) {
        Homework homework = homeworkService.getById(id);
        if (homework == null) {
            return Result.error(404, "作业不存在");
        }
        return Result.success(homework);
    }

    /**
     * 创建作业
     */
    @PostMapping
    public Result<Long> create(@RequestBody Homework homework) {
        if (homework.getStudentId() == null || StrUtil.isBlank(homework.getSubject()) 
            || StrUtil.isBlank(homework.getContent())) {
            return Result.error(400, "缺少必填参数");
        }
        
        Long id = homeworkService.createHomework(homework);
        return Result.success("作业创建成功", id);
    }

    /**
     * 提交作业
     */
    @PostMapping("/{id}/submit")
    public Result<String> submit(
            @PathVariable Long id,
            @RequestBody Map<String, Object> request) {
        
        Long studentId = (Long) request.get("studentId");
        String content = (String) request.get("content");
        @SuppressWarnings("unchecked")
        List<String> images = (List<String>) request.get("images");
        
        boolean success = homeworkService.submitHomework(id, studentId, content, images);
        
        if (success) {
            return Result.success("作业提交成功");
        } else {
            return Result.error("作业提交失败");
        }
    }

    /**
     * 检查作业
     */
    @PostMapping("/{id}/check")
    public Result<HomeworkCheckResult> check(
            @PathVariable Long id,
            @RequestBody Map<String, Object> request) {
        
        Boolean isCorrect = (Boolean) request.get("isCorrect");
        Integer score = (Integer) request.get("score");
        String feedback = (String) request.get("feedback");
        
        // TODO: 传递参数到服务层
        HomeworkCheckResult result = homeworkService.checkHomework(id);
        
        if (result != null) {
            result.setIsCorrect(isCorrect);
            result.setScore(score);
            result.setFeedback(feedback);
            return Result.success(result);
        } else {
            return Result.error("检查失败");
        }
    }

    /**
     * 获取提交记录
     */
    @GetMapping("/{id}/submissions")
    public Result<List<Map<String, Object>>> submissions(@PathVariable Long id) {
        // TODO: 实现获取提交记录
        return Result.success(List.of());
    }
}
