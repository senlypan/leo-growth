package com.leo.growth.service;

import com.leo.growth.entity.Homework;
import com.leo.growth.entity.Mistake;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 * 学习报告服务接口
 * @author 小主人
 * @since 2026-03-12
 */
public interface ReportService {

    /**
     * 获取学习概览
     */
    LearningOverview getLearningOverview(Long studentId, LocalDate startDate, LocalDate endDate);

    /**
     * 获取作业统计
     */
    HomeworkStats getHomeworkStats(Long studentId, LocalDate startDate, LocalDate endDate);

    /**
     * 获取正确率趋势
     */
    List<Map<String, Object>> getAccuracyTrend(Long studentId, LocalDate startDate, LocalDate endDate);

    /**
     * 获取错题分析
     */
    MistakeAnalysis getMistakeAnalysis(Long studentId, LocalDate startDate, LocalDate endDate);

    /**
     * 生成学习建议
     */
    List<LearningSuggestion> generateSuggestions(Long studentId);

    /**
     * 获取完整报告
     */
    Map<String, Object> getFullReport(Long studentId, String period);

    /**
     * 学习概览数据
     */
    class LearningOverview {
        private String period;
        private String startDate;
        private String endDate;
        private Summary summary;
        private SubjectStats subjectStats;

        // Getters and Setters
        public String getPeriod() { return period; }
        public void setPeriod(String period) { this.period = period; }
        public String getStartDate() { return startDate; }
        public void setStartDate(String startDate) { this.startDate = startDate; }
        public String getEndDate() { return endDate; }
        public void setEndDate(String endDate) { this.endDate = endDate; }
        public Summary getSummary() { return summary; }
        public void setSummary(Summary summary) { this.summary = summary; }
        public SubjectStats getSubjectStats() { return subjectStats; }
        public void setSubjectStats(SubjectStats subjectStats) { this.subjectStats = subjectStats; }

        public class Summary {
            private Integer totalHomework;
            private Integer completedHomework;
            private Double completionRate;
            private Double avgScore;
            private Integer totalMistakes;
            private Integer reviewedMistakes;
            private Double mistakeReviewRate;

            // Getters and Setters
            public Integer getTotalHomework() { return totalHomework; }
            public void setTotalHomework(Integer totalHomework) { this.totalHomework = totalHomework; }
            public Integer getCompletedHomework() { return completedHomework; }
            public void setCompletedHomework(Integer completedHomework) { this.completedHomework = completedHomework; }
            public Double getCompletionRate() { return completionRate; }
            public void setCompletionRate(Double completionRate) { this.completionRate = completionRate; }
            public Double getAvgScore() { return avgScore; }
            public void setAvgScore(Double avgScore) { this.avgScore = avgScore; }
            public Integer getTotalMistakes() { return totalMistakes; }
            public void setTotalMistakes(Integer totalMistakes) { this.totalMistakes = totalMistakes; }
            public Integer getReviewedMistakes() { return reviewedMistakes; }
            public void setReviewedMistakes(Integer reviewedMistakes) { this.reviewedMistakes = reviewedMistakes; }
            public Double getMistakeReviewRate() { return mistakeReviewRate; }
            public void setMistakeReviewRate(Double mistakeReviewRate) { this.mistakeReviewRate = mistakeReviewRate; }
        }

        public class SubjectStats {
            private SubjectStat chinese;
            private SubjectStat math;
            private SubjectStat english;

            // Getters and Setters
            public SubjectStat getChinese() { return chinese; }
            public void setChinese(SubjectStat chinese) { this.chinese = chinese; }
            public SubjectStat getMath() { return math; }
            public void setMath(SubjectStat math) { this.math = math; }
            public SubjectStat getEnglish() { return english; }
            public void setEnglish(SubjectStat english) { this.english = english; }

            public class SubjectStat {
                private Integer homework;
                private Double avgScore;
                private Integer mistakes;

                // Getters and Setters
                public Integer getHomework() { return homework; }
                public void setHomework(Integer homework) { this.homework = homework; }
                public Double getAvgScore() { return avgScore; }
                public void setAvgScore(Double avgScore) { this.avgScore = avgScore; }
                public Integer getMistakes() { return mistakes; }
                public void setMistakes(Integer mistakes) { this.mistakes = mistakes; }
            }
        }
    }

    /**
     * 作业统计数据
     */
    class HomeworkStats {
        private Integer totalCount;
        private Integer completedCount;
        private Integer checkedCount;
        private Double completionRate;
        private Map<String, Integer> subjectDistribution;

        // Getters and Setters
        public Integer getTotalCount() { return totalCount; }
        public void setTotalCount(Integer totalCount) { this.totalCount = totalCount; }
        public Integer getCompletedCount() { return completedCount; }
        public void setCompletedCount(Integer completedCount) { this.completedCount = completedCount; }
        public Integer getCheckedCount() { return checkedCount; }
        public void setCheckedCount(Integer checkedCount) { this.checkedCount = checkedCount; }
        public Double getCompletionRate() { return completionRate; }
        public void setCompletionRate(Double completionRate) { this.completionRate = completionRate; }
        public Map<String, Integer> getSubjectDistribution() { return subjectDistribution; }
        public void setSubjectDistribution(Map<String, Integer> subjectDistribution) { this.subjectDistribution = subjectDistribution; }
    }

    /**
     * 错题分析数据
     */
    class MistakeAnalysis {
        private Integer totalMistakes;
        private Integer reviewedCount;
        private Double reviewRate;
        private Map<String, Integer> subjectDistribution;
        private Map<String, Integer> errorTypeDistribution;
        private List<KnowledgePointStat> weakKnowledgePoints;

        // Getters and Setters
        public Integer getTotalMistakes() { return totalMistakes; }
        public void setTotalMistakes(Integer totalMistakes) { this.totalMistakes = totalMistakes; }
        public Integer getReviewedCount() { return reviewedCount; }
        public void setReviewedCount(Integer reviewedCount) { this.reviewedCount = reviewedCount; }
        public Double getReviewRate() { return reviewRate; }
        public void setReviewRate(Double reviewRate) { this.reviewRate = reviewRate; }
        public Map<String, Integer> getSubjectDistribution() { return subjectDistribution; }
        public void setSubjectDistribution(Map<String, Integer> subjectDistribution) { this.subjectDistribution = subjectDistribution; }
        public Map<String, Integer> getErrorTypeDistribution() { return errorTypeDistribution; }
        public void setErrorTypeDistribution(Map<String, Integer> errorTypeDistribution) { this.errorTypeDistribution = errorTypeDistribution; }
        public List<KnowledgePointStat> getWeakKnowledgePoints() { return weakKnowledgePoints; }
        public void setWeakKnowledgePoints(List<KnowledgePointStat> weakKnowledgePoints) { this.weakKnowledgePoints = weakKnowledgePoints; }

        public class KnowledgePointStat {
            private String point;
            private Integer count;
            private String subject;

            // Getters and Setters
            public String getPoint() { return point; }
            public void setPoint(String point) { this.point = point; }
            public Integer getCount() { return count; }
            public void setCount(Integer count) { this.count = count; }
            public String getSubject() { return subject; }
            public void setSubject(String subject) { this.subject = subject; }
        }
    }

    /**
     * 学习建议
     */
    class LearningSuggestion {
        private String type; // strength, improvement, encouragement
        private String priority; // high, medium, low
        private String title;
        private String content;
        private String icon;

        // Getters and Setters
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public String getPriority() { return priority; }
        public void setPriority(String priority) { this.priority = priority; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
        public String getIcon() { return icon; }
        public void setIcon(String icon) { this.icon = icon; }
    }
}
