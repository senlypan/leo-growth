package com.leo.growth.controller;

import com.leo.growth.common.Result;
import com.leo.growth.entity.LearningGoal;
import com.leo.growth.service.LearningGoalService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 学习目标控制器
 * @author 小主人
 * @since 2026-03-12
 */
@Slf4j
@RestController
@RequestMapping("/goals")
@RequiredArgsConstructor
public class LearningGoalController {

    private final LearningGoalService goalService;

    /**
     * 获取目标列表
     */
    @GetMapping
    public Result<List<LearningGoal>> getGoals(
            @RequestParam Long studentId,
            @RequestParam(required = false) String status) {
        
        List<LearningGoal> goals = goalService.getGoals(studentId, status);
        return Result.success(goals);
    }

    /**
     * 创建目标
     */
    @PostMapping
    public Result<Long> createGoal(@RequestBody LearningGoal goal) {
        Long id = goalService.createGoal(goal);
        return Result.success("目标创建成功", id);
    }

    /**
     * 更新目标
     */
    @PutMapping("/{id}")
    public Result<String> updateGoal(
            @PathVariable Long id,
            @RequestBody LearningGoal goal) {
        
        boolean success = goalService.updateGoal(id, goal);
        return success ? Result.success("目标更新成功") : Result.error("更新失败");
    }

    /**
     * 更新进度
     */
    @PutMapping("/{id}/progress")
    public Result<String> updateProgress(
            @PathVariable Long id,
            @RequestBody Map<String, Object> request) {
        
        Integer progress = Integer.valueOf(request.get("progress").toString());
        boolean success = goalService.updateProgress(id, progress);
        return success ? Result.success("进度更新成功") : Result.error("更新失败");
    }

    /**
     * 删除目标
     */
    @DeleteMapping("/{id}")
    public Result<String> deleteGoal(@PathVariable Long id) {
        boolean success = goalService.deleteGoal(id);
        return success ? Result.success("目标已删除") : Result.error("删除失败");
    }

    /**
     * 获取目标统计
     */
    @GetMapping("/stats")
    public Result<Map<String, Object>> getStats(@RequestParam Long studentId) {
        Map<String, Object> stats = goalService.getStats(studentId);
        return Result.success(stats);
    }
}
