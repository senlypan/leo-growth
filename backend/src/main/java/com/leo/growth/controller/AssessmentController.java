package com.leo.growth.controller;

import com.leo.growth.common.Result;
import com.leo.growth.entity.Assessment;
import com.leo.growth.entity.AssessmentQuestion;
import com.leo.growth.service.AssessmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 能力评估控制器
 * @author 小主人
 * @since 2026-03-12
 */
@Slf4j
@RestController
@RequestMapping("/assessment")
@RequiredArgsConstructor
public class AssessmentController {

    private final AssessmentService assessmentService;

    /**
     * 获取评估题目列表
     */
    @GetMapping("/questions")
    public Result<List<AssessmentQuestion>> getQuestions(
            @RequestParam String subject,
            @RequestParam(required = false, defaultValue = "20") Integer limit) {
        
        List<AssessmentQuestion> questions = assessmentService.getQuestions(subject, limit);
        return Result.success(questions);
    }

    /**
     * 开始评估
     */
    @PostMapping("/start")
    public Result<Map<String, Object>> startAssessment(@RequestBody Map<String, Object> request) {
        Long studentId = Long.valueOf(request.get("studentId").toString());
        String subject = (String) request.get("subject");
        
        Map<String, Object> session = assessmentService.startAssessment(studentId, subject);
        return Result.success(session);
    }

    /**
     * 提交评估答案
     */
    @PostMapping("/submit")
    public Result<Map<String, Object>> submitAssessment(@RequestBody Map<String, Object> request) {
        Long studentId = Long.valueOf(request.get("studentId").toString());
        String subject = (String) request.get("subject");
        List<Map<String, Object>> answers = (List<Map<String, Object>>) request.get("answers");
        
        Map<String, Object> result = assessmentService.submitAssessment(studentId, subject, answers);
        return Result.success(result);
    }

    /**
     * 获取评估报告
     */
    @GetMapping("/report")
    public Result<Map<String, Object>> getReport(
            @RequestParam Long studentId,
            @RequestParam String subject) {
        
        Map<String, Object> report = assessmentService.getReport(studentId, subject);
        return Result.success(report);
    }

    /**
     * 获取评估历史
     */
    @GetMapping("/history")
    public Result<List<Assessment>> getHistory(
            @RequestParam Long studentId,
            @RequestParam(required = false) String subject) {
        
        List<Assessment> history = assessmentService.getHistory(studentId, subject);
        return Result.success(history);
    }
}
