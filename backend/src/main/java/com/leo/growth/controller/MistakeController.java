package com.leo.growth.controller;

import cn.hutool.core.util.StrUtil;
import com.leo.growth.common.Result;
import com.leo.growth.entity.Mistake;
import com.leo.growth.service.MistakeService;
import com.leo.growth.service.MistakeService.MistakeStatistics;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 错题管理控制器
 * @author 小主人
 * @since 2026-03-11
 */
@Slf4j
@RestController
@RequestMapping("/mistakes")
@RequiredArgsConstructor
public class MistakeController {

    private final MistakeService mistakeService;

    /**
     * 获取错题列表
     */
    @GetMapping
    public Result<List<Mistake>> list(
            @RequestParam Long studentId,
            @RequestParam(required = false) String subject,
            @RequestParam(required = false) Boolean reviewed) {
        
        List<Mistake> mistakes = mistakeService.getStudentMistakes(studentId, subject, reviewed);
        return Result.success(mistakes);
    }

    /**
     * 获取错题详情
     */
    @GetMapping("/{id}")
    public Result<Mistake> detail(@PathVariable Long id) {
        Mistake mistake = mistakeService.getById(id);
        if (mistake == null) {
            return Result.error(404, "错题不存在");
        }
        return Result.success(mistake);
    }

    /**
     * 记录错题
     */
    @PostMapping
    public Result<Long> add(@RequestBody Mistake mistake) {
        if (mistake.getStudentId() == null || StrUtil.isBlank(mistake.getSubject()) 
            || StrUtil.isBlank(mistake.getQuestion())) {
            return Result.error(400, "缺少必填参数");
        }
        
        if (mistake.getReviewed() == null) {
            mistake.setReviewed(false);
        }
        
        Long id = mistakeService.addMistake(mistake);
        return Result.success("错题记录成功", id);
    }

    /**
     * 标记错题已复习
     */
    @PutMapping("/{id}/review")
    public Result<String> review(@PathVariable Long id) {
        boolean success = mistakeService.markReviewed(id);
        if (success) {
            return Result.success("错题已标记为已复习");
        } else {
            return Result.error("更新失败");
        }
    }

    /**
     * 删除错题
     */
    @DeleteMapping("/{id}")
    public Result<String> delete(@PathVariable Long id) {
        boolean success = mistakeService.removeMistake(id);
        if (success) {
            return Result.success("错题已删除");
        } else {
            return Result.error("删除失败");
        }
    }

    /**
     * 获取错题统计
     */
    @GetMapping("/statistics")
    public Result<MistakeStatistics> statistics(@RequestParam Long studentId) {
        MistakeStatistics stats = mistakeService.getStatistics(studentId);
        return Result.success(stats);
    }
}
