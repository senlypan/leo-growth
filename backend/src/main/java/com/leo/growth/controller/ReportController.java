package com.leo.growth.controller;

import com.leo.growth.common.Result;
import com.leo.growth.service.ReportService;
import com.leo.growth.service.ReportService.HomeworkStats;
import com.leo.growth.service.ReportService.MistakeAnalysis;
import com.leo.growth.service.ReportService.LearningOverview;
import com.leo.growth.service.ReportService.LearningSuggestion;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 * 学习报告控制器
 * @author 小主人
 * @since 2026-03-12
 */
@Slf4j
@RestController
@RequestMapping("/report")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    /**
     * 获取学习概览
     * @param studentId 学生 ID
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @return 学习概览数据
     */
    @GetMapping("/overview")
    public Result<LearningOverview> overview(
            @RequestParam Long studentId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        
        LearningOverview overview = reportService.getLearningOverview(studentId, startDate, endDate);
        return Result.success(overview);
    }

    /**
     * 获取作业统计
     * @param studentId 学生 ID
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @return 作业统计数据
     */
    @GetMapping("/homework-stats")
    public Result<HomeworkStats> homeworkStats(
            @RequestParam Long studentId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        
        HomeworkStats stats = reportService.getHomeworkStats(studentId, startDate, endDate);
        return Result.success(stats);
    }

    /**
     * 获取正确率趋势
     * @param studentId 学生 ID
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @return 正确率趋势数据
     */
    @GetMapping("/accuracy-trend")
    public Result<List<Map<String, Object>>> accuracyTrend(
            @RequestParam Long studentId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        
        List<Map<String, Object>> trend = reportService.getAccuracyTrend(studentId, startDate, endDate);
        return Result.success(trend);
    }

    /**
     * 获取错题分析
     * @param studentId 学生 ID
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @return 错题分析数据
     */
    @GetMapping("/mistake-analysis")
    public Result<MistakeAnalysis> mistakeAnalysis(
            @RequestParam Long studentId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        
        MistakeAnalysis analysis = reportService.getMistakeAnalysis(studentId, startDate, endDate);
        return Result.success(analysis);
    }

    /**
     * 获取学习建议
     * @param studentId 学生 ID
     * @return 学习建议列表
     */
    @GetMapping("/suggestions")
    public Result<List<LearningSuggestion>> suggestions(@RequestParam Long studentId) {
        List<LearningSuggestion> suggestions = reportService.generateSuggestions(studentId);
        return Result.success(suggestions);
    }

    /**
     * 获取完整报告（聚合所有数据）
     * @param studentId 学生 ID
     * @param period 报告周期：daily/weekly/monthly
     * @return 完整报告数据
     */
    @GetMapping("/full-report")
    public Result<Map<String, Object>> fullReport(
            @RequestParam Long studentId,
            @RequestParam String period) {
        
        Map<String, Object> report = reportService.getFullReport(studentId, period);
        return Result.success(report);
    }
}
