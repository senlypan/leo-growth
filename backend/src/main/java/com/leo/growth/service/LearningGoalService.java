package com.leo.growth.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.leo.growth.entity.LearningGoal;
import com.leo.growth.mapper.LearningGoalMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 学习目标服务
 * @author 小主人
 * @since 2026-03-12
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class LearningGoalService {

    private final LearningGoalMapper goalMapper;

    /**
     * 获取目标列表
     */
    public List<LearningGoal> getGoals(Long studentId, String status) {
        LambdaQueryWrapper<LearningGoal> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(LearningGoal::getStudentId, studentId);
        if (status != null) {
            wrapper.eq(LearningGoal::getStatus, status);
        }
        wrapper.orderByDesc(LearningGoal::getCreateTime);
        return goalMapper.selectList(wrapper);
    }

    /**
     * 创建目标
     */
    public Long createGoal(LearningGoal goal) {
        goal.setProgress(0);
        goal.setStatus("active");
        goalMapper.insert(goal);
        log.info("创建目标：id={}, title={}", goal.getId(), goal.getGoalTitle());
        return goal.getId();
    }

    /**
     * 更新目标
     */
    public boolean updateGoal(Long id, LearningGoal goal) {
        goal.setId(id);
        return goalMapper.updateById(goal) > 0;
    }

    /**
     * 更新进度
     */
    public boolean updateProgress(Long id, Integer progress) {
        LearningGoal goal = goalMapper.selectById(id);
        if (goal != null) {
            goal.setProgress(progress);
            if (progress >= 100) {
                goal.setStatus("completed");
            }
            return goalMapper.updateById(goal) > 0;
        }
        return false;
    }

    /**
     * 删除目标
     */
    public boolean deleteGoal(Long id) {
        return goalMapper.deleteById(id) > 0;
    }

    /**
     * 获取目标统计
     */
    public Map<String, Object> getStats(Long studentId) {
        List<LearningGoal> goals = getGoals(studentId, null);
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", goals.size());
        stats.put("active", goals.stream().filter(g -> "active".equals(g.getStatus())).count());
        stats.put("completed", goals.stream().filter(g -> "completed".equals(g.getStatus())).count());
        stats.put("abandoned", goals.stream().filter(g -> "abandoned".equals(g.getStatus())).count());
        
        // 计算平均进度
        double avgProgress = goals.stream()
                .mapToInt(LearningGoal::getProgress)
                .average()
                .orElse(0.0);
        stats.put("avgProgress", Math.round(avgProgress));
        
        return stats;
    }
}
