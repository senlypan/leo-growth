package com.leo.growth.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.leo.growth.entity.Assessment;
import com.leo.growth.entity.AssessmentQuestion;
import com.leo.growth.mapper.AssessmentMapper;
import com.leo.growth.mapper.AssessmentQuestionMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

/**
 * 能力评估服务实现类
 * @author 小主人
 * @since 2026-03-12
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AssessmentService {

    private final AssessmentMapper assessmentMapper;
    private final AssessmentQuestionMapper assessmentQuestionMapper;

    /**
     * 获取评估题目
     */
    public List<AssessmentQuestion> getQuestions(String subject, Integer limit) {
        LambdaQueryWrapper<AssessmentQuestion> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(AssessmentQuestion::getSubject, subject);
        wrapper.orderByAsc(AssessmentQuestion::getDifficulty);
        wrapper.last("LIMIT " + limit);
        
        return assessmentQuestionMapper.selectList(wrapper);
    }

    /**
     * 开始评估
     */
    public Map<String, Object> startAssessment(Long studentId, String subject) {
        Map<String, Object> session = new HashMap<>();
        session.put("sessionId", UUID.randomUUID().toString());
        session.put("startTime", LocalDateTime.now());
        session.put("studentId", studentId);
        session.put("subject", subject);
        
        log.info("开始评估：studentId={}, subject={}", studentId, subject);
        return session;
    }

    /**
     * 提交评估
     */
    public Map<String, Object> submitAssessment(Long studentId, String subject, List<Map<String, Object>> answers) {
        // 计算结果
        List<AssessmentQuestion> questions = getQuestions(subject, answers.size());
        
        int correctCount = 0;
        int totalScore = 0;
        
        for (int i = 0; i < answers.size(); i++) {
            if (i < questions.size()) {
                AssessmentQuestion question = questions.get(i);
                Map<String, Object> answer = answers.get(i);
                String userAnswer = (String) answer.get("answer");
                
                if (question.getCorrectAnswer().equals(userAnswer)) {
                    correctCount++;
                    totalScore += question.getScore();
                }
            }
        }
        
        int accuracy = answers.size() > 0 ? (correctCount * 100 / answers.size()) : 0;
        
        // 保存评估记录
        Assessment assessment = new Assessment();
        assessment.setStudentId(studentId);
        assessment.setSubject(subject);
        assessment.setAssessmentType("ability");
        assessment.setScore(totalScore);
        
        Map<String, Object> resultData = new HashMap<>();
        resultData.put("correctCount", correctCount);
        resultData.put("totalCount", answers.size());
        resultData.put("accuracy", accuracy);
        assessment.setResultData(new com.fasterxml.jackson.core.type.TypeReference<Map<String, Object>>(){}.getTypeName());
        
        assessmentMapper.insert(assessment);
        
        // 返回结果
        Map<String, Object> result = new HashMap<>();
        result.put("score", totalScore);
        result.put("correctCount", correctCount);
        result.put("totalCount", answers.size());
        result.put("accuracy", accuracy);
        result.put("assessmentId", assessment.getId());
        
        log.info("提交评估：studentId={}, subject={}, score={}", studentId, subject, totalScore);
        return result;
    }

    /**
     * 获取评估报告
     */
    public Map<String, Object> getReport(Long studentId, String subject) {
        // 获取最近的评估记录
        LambdaQueryWrapper<Assessment> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Assessment::getStudentId, studentId);
        wrapper.eq(Assessment::getSubject, subject);
        wrapper.orderByDesc(Assessment::getCreateTime);
        wrapper.last("LIMIT 1");
        
        Assessment latest = assessmentMapper.selectOne(wrapper);
        
        Map<String, Object> report = new HashMap<>();
        if (latest != null) {
            report.put("latestScore", latest.getScore());
            report.put("latestTime", latest.getCreateTime());
            report.put("subject", latest.getSubject());
        }
        
        // 获取历史趋势
        List<Assessment> history = getHistory(studentId, subject);
        report.put("history", history);
        
        return report;
    }

    /**
     * 获取评估历史
     */
    public List<Assessment> getHistory(Long studentId, String subject) {
        LambdaQueryWrapper<Assessment> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Assessment::getStudentId, studentId);
        if (subject != null) {
            wrapper.eq(Assessment::getSubject, subject);
        }
        wrapper.orderByDesc(Assessment::getCreateTime);
        wrapper.last("LIMIT 10");
        
        return assessmentMapper.selectList(wrapper);
    }
}
