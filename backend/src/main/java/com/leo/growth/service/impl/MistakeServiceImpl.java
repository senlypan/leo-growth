package com.leo.growth.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.leo.growth.entity.Mistake;
import com.leo.growth.mapper.MistakeMapper;
import com.leo.growth.service.MistakeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 错题服务实现类
 * @author 小主人
 * @since 2026-03-11
 */
@Slf4j
@Service
public class MistakeServiceImpl extends ServiceImpl<MistakeMapper, Mistake> implements MistakeService {

    @Override
    public List<Mistake> getStudentMistakes(Long studentId, String subject, Boolean reviewed) {
        LambdaQueryWrapper<Mistake> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Mistake::getStudentId, studentId);
        
        if (StrUtil.isNotBlank(subject)) {
            wrapper.eq(Mistake::getSubject, subject);
        }
        
        if (reviewed != null) {
            wrapper.eq(Mistake::getReviewed, reviewed);
        }
        
        wrapper.orderByDesc(Mistake::getCreateTime);
        return list(wrapper);
    }

    @Override
    public Long addMistake(Mistake mistake) {
        save(mistake);
        log.info("记录错题：{}, 科目：{}", mistake.getId(), mistake.getSubject());
        return mistake.getId();
    }

    @Override
    public boolean markReviewed(Long mistakeId) {
        Mistake mistake = getById(mistakeId);
        if (mistake != null) {
            mistake.setReviewed(true);
            updateById(mistake);
            log.info("标记错题已复习：{}", mistakeId);
            return true;
        }
        return false;
    }

    @Override
    public boolean removeMistake(Long mistakeId) {
        log.info("删除错题：{}", mistakeId);
        return removeById(mistakeId);
    }

    @Override
    public MistakeStatistics getStatistics(Long studentId) {
        LambdaQueryWrapper<Mistake> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Mistake::getStudentId, studentId);
        
        List<Mistake> mistakes = list(wrapper);
        
        MistakeStatistics statistics = new MistakeStatistics();
        statistics.setTotalCount((long) mistakes.size());
        statistics.setReviewedCount(mistakes.stream().filter(Mistake::getReviewed).count());
        statistics.setUnreviewedCount(statistics.getTotalCount() - statistics.getReviewedCount());
        
        return statistics;
    }
}
