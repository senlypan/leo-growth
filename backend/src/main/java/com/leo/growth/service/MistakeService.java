package com.leo.growth.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.leo.growth.entity.Mistake;

import java.util.List;

/**
 * 错题服务接口
 * @author 小主人
 * @since 2026-03-11
 */
public interface MistakeService extends IService<Mistake> {

    /**
     * 获取学生错题列表
     * @param studentId 学生 ID
     * @param subject 科目
     * @param reviewed 是否已复习
     * @return 错题列表
     */
    List<Mistake> getStudentMistakes(Long studentId, String subject, Boolean reviewed);

    /**
     * 记录错题
     * @param mistake 错题信息
     * @return 错题 ID
     */
    Long addMistake(Mistake mistake);

    /**
     * 标记错题已复习
     * @param mistakeId 错题 ID
     * @return 是否成功
     */
    boolean markReviewed(Long mistakeId);

    /**
     * 删除错题
     * @param mistakeId 错题 ID
     * @return 是否成功
     */
    boolean removeMistake(Long mistakeId);

    /**
     * 获取错题统计
     * @param studentId 学生 ID
     * @return 统计数据
     */
    MistakeStatistics getStatistics(Long studentId);

    /**
     * 错题统计
     */
    class MistakeStatistics {
        private Long totalCount;
        private Long reviewedCount;
        private Long unreviewedCount;

        // Getters and Setters
        public Long getTotalCount() { return totalCount; }
        public void setTotalCount(Long totalCount) { this.totalCount = totalCount; }
        public Long getReviewedCount() { return reviewedCount; }
        public void setReviewedCount(Long reviewedCount) { this.reviewedCount = reviewedCount; }
        public Long getUnreviewedCount() { return unreviewedCount; }
        public void setUnreviewedCount(Long unreviewedCount) { this.unreviewedCount = unreviewedCount; }
    }
}
