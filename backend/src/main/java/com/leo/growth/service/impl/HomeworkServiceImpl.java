package com.leo.growth.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.leo.growth.entity.Homework;
import com.leo.growth.mapper.HomeworkMapper;
import com.leo.growth.service.HomeworkService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 作业服务实现类
 * @author 小主人
 * @since 2026-03-11
 */
@Slf4j
@Service
public class HomeworkServiceImpl extends ServiceImpl<HomeworkMapper, Homework> implements HomeworkService {

    @Override
    public List<Homework> getStudentHomeworks(Long studentId, String subject, String status, LocalDate date) {
        LambdaQueryWrapper<Homework> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Homework::getStudentId, studentId);
        
        if (StrUtil.isNotBlank(subject)) {
            wrapper.eq(Homework::getSubject, subject);
        }
        
        if (StrUtil.isNotBlank(status)) {
            wrapper.eq(Homework::getStatus, status);
        }
        
        if (date != null) {
            wrapper.eq(Homework::getAssignDate, date);
        }
        
        wrapper.orderByDesc(Homework::getCreateTime);
        return list(wrapper);
    }

    @Override
    public Long createHomework(Homework homework) {
        save(homework);
        log.info("创建作业：{}, 科目：{}", homework.getId(), homework.getSubject());
        return homework.getId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean submitHomework(Long homeworkId, Long studentId, String content, List<String> images) {
        try {
            log.info("提交作业：homeworkId={}, studentId={}, images={}", homeworkId, studentId, 
                    images != null ? images.size() : 0);
            
            // 更新作业状态
            Homework homework = getById(homeworkId);
            if (homework == null) {
                log.error("作业不存在：{}", homeworkId);
                return false;
            }
            
            homework.setStatus("completed");
            updateById(homework);
            
            // TODO: 保存提交记录到 homework_submissions 表
            
            log.info("作业提交成功：{}", homeworkId);
            return true;
        } catch (Exception e) {
            log.error("提交作业失败：{}", homeworkId, e);
            return false;
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public HomeworkCheckResult checkHomework(Long homeworkId) {
        try {
            log.info("检查作业：{}", homeworkId);
            
            // 更新作业状态
            Homework homework = getById(homeworkId);
            if (homework == null) {
                log.error("作业不存在：{}", homeworkId);
                return null;
            }
            
            homework.setStatus("checked");
            updateById(homework);
            
            HomeworkCheckResult result = new HomeworkCheckResult();
            result.setHomeworkId(homeworkId);
            
            log.info("作业检查完成：{}", homeworkId);
            return result;
        } catch (Exception e) {
            log.error("检查作业失败：{}", homeworkId, e);
            return null;
        }
    }
}
