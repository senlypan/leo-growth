package com.leo.growth;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 潘灏成成长规划系统后端服务
 * @author 小主人
 * @since 2026-03-11
 */
@SpringBootApplication
@MapperScan("com.leo.growth.mapper")
public class LeoGrowthApplication {

    public static void main(String[] args) {
        SpringApplication.run(LeoGrowthApplication.class, args);
        System.out.println("\n" +
        "╔════════════════════════════════════════════════════════╗\n" +
        "║                                                        ║\n" +
        "║   🌟 Leo Growth Backend API Service                    ║\n" +
        "║   潘灏成成长规划系统后端服务                            ║\n" +
        "║                                                        ║\n" +
        "║   SpringBoot 3.2.0 + MyBatis-Plus                      ║\n" +
        "║   Server running on port 3000                          ║\n" +
        "║                                                        ║\n" +
        "╚════════════════════════════════════════════════════════╝\n");
    }
}
