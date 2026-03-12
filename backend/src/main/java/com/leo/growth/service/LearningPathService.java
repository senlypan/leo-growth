package com.leo.growth.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * 学习路径服务
 * @author 小主人
 * @since 2026-03-12
 */
@Slf4j
@Service
public class LearningPathService {

    /**
     * 获取学习路径
     */
    public Map<String, Object> getPath(Long studentId, String subject) {
        Map<String, Object> path = new HashMap<>();
        path.put("subject", subject);
        path.put("totalPoints", 50);
        path.put("learnedPoints", 15);
        path.put("learningPoints", 5);
        path.put("progress", 30);
        
        log.info("获取学习路径：studentId={}, subject={}", studentId, subject);
        return path;
    }

    /**
     * 获取知识点地图
     */
    public List<Map<String, Object>> getKnowledgeMap(String subject, Integer grade) {
        List<Map<String, Object>> map = new ArrayList<>();
        
        // 模拟数学知识点
        if ("math".equals(subject)) {
            map.add(createPoint(1L, "10 以内加减法", null, "learned"));
            map.add(createPoint(2L, "20 以内加减法", null, "learned"));
            map.add(createPoint(3L, "两位数加法", null, "learning"));
            map.add(createPoint(4L, "两位数减法", null, "pending"));
            map.add(createPoint(5L, "乘法口诀", null, "pending"));
        }
        
        return map;
    }

    /**
     * 标记已掌握
     */
    public boolean markLearned(Long studentId, Long pointId) {
        log.info("标记已掌握：studentId={}, pointId={}", studentId, pointId);
        return true;
    }

    /**
     * 获取下一步推荐
     */
    public Map<String, Object> getNextStep(Long studentId, String subject) {
        Map<String, Object> nextStep = new HashMap<>();
        nextStep.put("pointId", 3);
        nextStep.put("pointName", "两位数加法");
        nextStep.put("description", "学习两位数的加法运算，包括进位加法");
        nextStep.put("difficulty", 2);
        nextStep.put("estimatedTime", 30);
        
        return nextStep;
    }

    private Map<String, Object> createPoint(Long id, String name, String parent, String status) {
        Map<String, Object> point = new HashMap<>();
        point.put("id", id);
        point.put("name", name);
        point.put("parent", parent);
        point.put("status", status);
        return point;
    }
}
