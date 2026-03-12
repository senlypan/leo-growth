package com.leo.growth.controller;

import com.leo.growth.common.Result;
import com.leo.growth.service.LearningPathService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 学习路径控制器
 * @author 小主人
 * @since 2026-03-12
 */
@Slf4j
@RestController
@RequestMapping("/learning")
@RequiredArgsConstructor
public class LearningPathController {

    private final LearningPathService learningPathService;

    /**
     * 获取学习路径
     */
    @GetMapping("/path")
    public Result<Map<String, Object>> getPath(
            @RequestParam Long studentId,
            @RequestParam String subject) {
        
        Map<String, Object> path = learningPathService.getPath(studentId, subject);
        return Result.success(path);
    }

    /**
     * 获取知识点地图
     */
    @GetMapping("/knowledge-map")
    public Result<List<Map<String, Object>>> getKnowledgeMap(
            @RequestParam String subject,
            @RequestParam(required = false, defaultValue = "2") Integer grade) {
        
        List<Map<String, Object>> map = learningPathService.getKnowledgeMap(subject, grade);
        return Result.success(map);
    }

    /**
     * 标记已掌握
     */
    @PostMapping("/mark-learned")
    public Result<String> markLearned(@RequestBody Map<String, Object> request) {
        Long studentId = Long.valueOf(request.get("studentId").toString());
        Long pointId = Long.valueOf(request.get("pointId").toString());
        
        boolean success = learningPathService.markLearned(studentId, pointId);
        return success ? Result.success("标记成功") : Result.error("标记失败");
    }

    /**
     * 获取下一步推荐
     */
    @GetMapping("/next-step")
    public Result<Map<String, Object>> getNextStep(
            @RequestParam Long studentId,
            @RequestParam String subject) {
        
        Map<String, Object> nextStep = learningPathService.getNextStep(studentId, subject);
        return Result.success(nextStep);
    }
}
