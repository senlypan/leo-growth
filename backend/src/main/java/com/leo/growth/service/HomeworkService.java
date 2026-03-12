package com.leo.growth.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.leo.growth.entity.Homework;

import java.time.LocalDate;
import java.util.List;

/**
 * 作业服务接口
 * @author 小主人
 * @since 2026-03-11
 */
public interface HomeworkService extends IService<Homework> {

    /**
     * 获取学生作业列表
     * @param studentId 学生 ID
     * @param subject 科目
     * @param status 状态
     * @param date 日期
     * @return 作业列表
     */
    List<Homework> getStudentHomeworks(Long studentId, String subject, String status, LocalDate date);

    /**
     * 创建作业
     * @param homework 作业信息
     * @return 作业 ID
     */
    Long createHomework(Homework homework);

    /**
     * 提交作业
     * @param homeworkId 作业 ID
     * @param studentId 学生 ID
     * @param content 提交内容
     * @param images 图片列表
     * @return 是否成功
     */
    boolean submitHomework(Long homeworkId, Long studentId, String content, List<String> images);

    /**
     * 检查作业
     * @param homeworkId 作业 ID
     * @return 检查结果
     */
    HomeworkCheckResult checkHomework(Long homeworkId);

    /**
     * 作业检查结果
     */
    class HomeworkCheckResult {
        private Long homeworkId;
        private Boolean isCorrect;
        private Integer score;
        private String feedback;
        private List<String> mistakes;

        // Getters and Setters
        public Long getHomeworkId() { return homeworkId; }
        public void setHomeworkId(Long homeworkId) { this.homeworkId = homeworkId; }
        public Boolean getIsCorrect() { return isCorrect; }
        public void setIsCorrect(Boolean isCorrect) { this.isCorrect = isCorrect; }
        public Integer getScore() { return score; }
        public void setScore(Integer score) { this.score = score; }
        public String getFeedback() { return feedback; }
        public void setFeedback(String feedback) { this.feedback = feedback; }
        public List<String> getMistakes() { return mistakes; }
        public void setMistakes(List<String> mistakes) { this.mistakes = mistakes; }
    }
}
