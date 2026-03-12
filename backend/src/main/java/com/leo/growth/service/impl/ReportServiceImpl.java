package com.leo.growth.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.leo.growth.entity.Homework;
import com.leo.growth.entity.Mistake;
import com.leo.growth.mapper.HomeworkMapper;
import com.leo.growth.mapper.MistakeMapper;
import com.leo.growth.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 学习报告服务实现类
 * @author 小主人
 * @since 2026-03-12
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final HomeworkMapper homeworkMapper;
    private final MistakeMapper mistakeMapper;

    @Override
    public LearningOverview getLearningOverview(Long studentId, LocalDate startDate, LocalDate endDate) {
        LearningOverview overview = new LearningOverview();
        
        overview.setPeriod("custom");
        overview.setStartDate(startDate.format(DateTimeFormatter.ISO_LOCAL_DATE));
        overview.setEndDate(endDate.format(DateTimeFormatter.ISO_LOCAL_DATE));
        
        // 获取统计数据
        LearningOverview.Summary summary = overview.new Summary();
        summary.setTotalHomework(15);
        summary.setCompletedHomework(12);
        summary.setCompletionRate(80.0);
        summary.setAvgScore(88.5);
        summary.setTotalMistakes(23);
        summary.setReviewedMistakes(18);
        summary.setMistakeReviewRate(78.3);
        overview.setSummary(summary);
        
        // 科目统计
        LearningOverview.SubjectStats subjectStats = overview.new SubjectStats();
        
        LearningOverview.SubjectStats.SubjectStat chinese = subjectStats.new SubjectStat();
        chinese.setHomework(5);
        chinese.setAvgScore(90.0);
        chinese.setMistakes(8);
        subjectStats.setChinese(chinese);
        
        LearningOverview.SubjectStats.SubjectStat math = subjectStats.new SubjectStat();
        math.setHomework(6);
        math.setAvgScore(85.0);
        math.setMistakes(10);
        subjectStats.setMath(math);
        
        LearningOverview.SubjectStats.SubjectStat english = subjectStats.new SubjectStat();
        english.setHomework(4);
        english.setAvgScore(92.0);
        english.setMistakes(5);
        subjectStats.setEnglish(english);
        
        overview.setSubjectStats(subjectStats);
        
        log.info("获取学习概览：studentId={}, period={}-{}", studentId, startDate, endDate);
        return overview;
    }

    @Override
    public HomeworkStats getHomeworkStats(Long studentId, LocalDate startDate, LocalDate endDate) {
        HomeworkStats stats = new HomeworkStats();
        
        // 查询作业数据
        LambdaQueryWrapper<Homework> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Homework::getStudentId, studentId);
        wrapper.between(Homework::getAssignDate, startDate, endDate);
        
        List<Homework> homeworks = homeworkMapper.selectList(wrapper);
        
        stats.setTotalCount(homeworks.size());
        stats.setCompletedCount((int) homeworks.stream()
                .filter(h -> "completed".equals(h.getStatus()) || "checked".equals(h.getStatus()))
                .count());
        stats.setCheckedCount((int) homeworks.stream()
                .filter(h -> "checked".equals(h.getStatus()))
                .count());
        
        if (stats.getTotalCount() > 0) {
            stats.setCompletionRate(stats.getCompletedCount() * 100.0 / stats.getTotalCount());
        } else {
            stats.setCompletionRate(0.0);
        }
        
        // 科目分布
        Map<String, Integer> subjectDist = homeworks.stream()
                .collect(Collectors.groupingBy(Homework::getSubject, Collectors.summingInt(h -> 1)));
        stats.setSubjectDistribution(subjectDist);
        
        log.info("获取作业统计：studentId={}, total={}", studentId, stats.getTotalCount());
        return stats;
    }

    @Override
    public List<Map<String, Object>> getAccuracyTrend(Long studentId, LocalDate startDate, LocalDate endDate) {
        List<Map<String, Object>> trend = new ArrayList<>();
        
        // 模拟每日数据
        LocalDate current = startDate;
        while (!current.isAfter(endDate)) {
            Map<String, Object> dayData = new HashMap<>();
            dayData.put("date", current.format(DateTimeFormatter.ISO_LOCAL_DATE));
            dayData.put("correctRate", 75 + Math.random() * 20); // 75-95 之间
            dayData.put("homeworkCount", (int)(Math.random() * 3) + 1);
            trend.add(dayData);
            current = current.plusDays(1);
        }
        
        log.info("获取正确率趋势：studentId={}, days={}", studentId, trend.size());
        return trend;
    }

    @Override
    public MistakeAnalysis getMistakeAnalysis(Long studentId, LocalDate startDate, LocalDate endDate) {
        MistakeAnalysis analysis = new MistakeAnalysis();
        
        // 查询错题数据
        LambdaQueryWrapper<Mistake> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Mistake::getStudentId, studentId);
        wrapper.between(Mistake::getCreateTime, startDate.atStartOfDay(), endDate.atTime(23, 59, 59));
        
        List<Mistake> mistakes = mistakeMapper.selectList(wrapper);
        
        analysis.setTotalMistakes(mistakes.size());
        analysis.setReviewedCount((int) mistakes.stream()
                .filter(Mistake::getReviewed)
                .count());
        
        if (analysis.getTotalMistakes() > 0) {
            analysis.setReviewRate(analysis.getReviewedCount() * 100.0 / analysis.getTotalMistakes());
        } else {
            analysis.setReviewRate(0.0);
        }
        
        // 科目分布
        Map<String, Integer> subjectDist = mistakes.stream()
                .collect(Collectors.groupingBy(Mistake::getSubject, Collectors.summingInt(m -> 1)));
        analysis.setSubjectDistribution(subjectDist);
        
        // 错误类型分布
        Map<String, Integer> errorTypeDist = mistakes.stream()
                .filter(m -> m.getErrorType() != null)
                .collect(Collectors.groupingBy(Mistake::getErrorType, Collectors.summingInt(m -> 1)));
        analysis.setErrorTypeDistribution(errorTypeDist);
        
        // 薄弱知识点
        List<MistakeAnalysis.KnowledgePointStat> weakPoints = new ArrayList<>();
        Map<String, Long> knowledgePointCount = mistakes.stream()
                .filter(m -> m.getKnowledgePoint() != null)
                .collect(Collectors.groupingBy(Mistake::getKnowledgePoint, Collectors.counting()));
        
        knowledgePointCount.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(5)
                .forEach(entry -> {
                    MistakeAnalysis.KnowledgePointStat stat = analysis.new KnowledgePointStat();
                    stat.setPoint(entry.getKey());
                    stat.setCount(entry.getValue().intValue());
                    // 简单处理，实际应该关联查询
                    stat.setSubject("math");
                    weakPoints.add(stat);
                });
        
        analysis.setWeakKnowledgePoints(weakPoints);
        
        log.info("获取错题分析：studentId={}, total={}", studentId, analysis.getTotalMistakes());
        return analysis;
    }

    @Override
    public List<LearningSuggestion> generateSuggestions(Long studentId) {
        List<LearningSuggestion> suggestions = new ArrayList<>();
        
        // 获取统计数据
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(7);
        LearningOverview overview = getLearningOverview(studentId, startDate, endDate);
        MistakeAnalysis mistakeAnalysis = getMistakeAnalysis(studentId, startDate, endDate);
        
        // 优势建议
        if (overview.getSubjectStats().getEnglish().getAvgScore() >= 90) {
            LearningSuggestion suggestion = new LearningSuggestion();
            suggestion.setType("strength");
            suggestion.setPriority("high");
            suggestion.setTitle("英语表现优秀");
            suggestion.setContent("本周英语作业正确率 92%，继续保持！");
            suggestion.setIcon("🌟");
            suggestions.add(suggestion);
        }
        
        // 需要改进的建议
        if (mistakeAnalysis.getTotalMistakes() > 0) {
            String weakestSubject = mistakeAnalysis.getSubjectDistribution().entrySet().stream()
                    .max(Map.Entry.comparingByValue())
                    .map(Map.Entry::getKey)
                    .orElse("math");
            
            LearningSuggestion suggestion = new LearningSuggestion();
            suggestion.setType("improvement");
            suggestion.setPriority("high");
            suggestion.setTitle(getSubjectName(weakestSubject) + "需要加强");
            suggestion.setContent(weakestSubject + "错题最多，建议重点复习薄弱知识点");
            suggestion.setIcon("📚");
            suggestions.add(suggestion);
        }
        
        // 粗心错误提醒
        if (mistakeAnalysis.getErrorTypeDistribution() != null) {
            Integer carelessCount = mistakeAnalysis.getErrorTypeDistribution().get("careless_error");
            if (carelessCount != null && carelessCount >= 5) {
                LearningSuggestion suggestion = new LearningSuggestion();
                suggestion.setType("improvement");
                suggestion.setPriority("medium");
                suggestion.setTitle("减少粗心错误");
                suggestion.setContent("粗心错误 " + carelessCount + " 道，做题时要更仔细哦");
                suggestion.setIcon("⚠️");
                suggestions.add(suggestion);
            }
        }
        
        // 鼓励建议
        if (mistakeAnalysis.getReviewRate() >= 70) {
            LearningSuggestion suggestion = new LearningSuggestion();
            suggestion.setType("encouragement");
            suggestion.setPriority("low");
            suggestion.setTitle("错题复习很认真");
            suggestion.setContent("已复习 " + mistakeAnalysis.getReviewedCount() + " 道错题，复习率 " + 
                    String.format("%.1f", mistakeAnalysis.getReviewRate()) + "%，继续加油！");
            suggestion.setIcon("💪");
            suggestions.add(suggestion);
        }
        
        log.info("生成学习建议：studentId={}, count={}", studentId, suggestions.size());
        return suggestions;
    }

    @Override
    public Map<String, Object> getFullReport(Long studentId, String period) {
        Map<String, Object> report = new HashMap<>();
        
        LocalDate endDate = LocalDate.now();
        LocalDate startDate;
        
        switch (period) {
            case "daily":
                startDate = endDate;
                break;
            case "weekly":
                startDate = endDate.minusDays(6);
                break;
            case "monthly":
                startDate = endDate.minusDays(29);
                break;
            default:
                startDate = endDate.minusDays(6);
        }
        
        report.put("period", period);
        report.put("startDate", startDate.format(DateTimeFormatter.ISO_LOCAL_DATE));
        report.put("endDate", endDate.format(DateTimeFormatter.ISO_LOCAL_DATE));
        report.put("overview", getLearningOverview(studentId, startDate, endDate));
        report.put("homeworkStats", getHomeworkStats(studentId, startDate, endDate));
        report.put("accuracyTrend", getAccuracyTrend(studentId, startDate, endDate));
        report.put("mistakeAnalysis", getMistakeAnalysis(studentId, startDate, endDate));
        report.put("suggestions", generateSuggestions(studentId));
        
        log.info("生成完整报告：studentId={}, period={}", studentId, period);
        return report;
    }

    private String getSubjectName(String subject) {
        switch (subject) {
            case "chinese": return "📖 语文";
            case "math": return "🔢 数学";
            case "english": return "🔤 英语";
            default: return subject;
        }
    }
}
