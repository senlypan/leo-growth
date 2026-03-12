# Leo Growth 后端测试脚本
# 用于测试 v1.4 学习报告功能

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Leo Growth v1.4 学习报告 - 后端测试" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:8080"
$studentId = 1
$startDate = "2026-03-04"
$endDate = "2026-03-10"

Write-Host "测试参数:" -ForegroundColor Yellow
Write-Host "  Base URL: $baseUrl"
Write-Host "  Student ID: $studentId"
Write-Host "  Date Range: $startDate ~ $endDate"
Write-Host ""

# 测试 1: 学习概览
Write-Host "[Test 1] 学习概览 API..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/report/overview?studentId=$studentId&startDate=$startDate&endDate=$endDate" -Method Get
    Write-Host "  ✓ 成功" -ForegroundColor Green
    Write-Host "  总作业：$($response.data.summary.totalHomework)"
    Write-Host "  完成率：$($response.data.summary.completionRate)%"
    Write-Host "  平均分：$($response.data.summary.avgScore)"
} catch {
    Write-Host "  ✗ 失败：$($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# 测试 2: 作业统计
Write-Host "[Test 2] 作业统计 API..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/report/homework-stats?studentId=$studentId&startDate=$startDate&endDate=$endDate" -Method Get
    Write-Host "  ✓ 成功" -ForegroundColor Green
    Write-Host "  总作业数：$($response.data.totalCount)"
    Write-Host "  已完成：$($response.data.completedCount)"
    Write-Host "  完成率：$($response.data.completionRate)%"
} catch {
    Write-Host "  ✗ 失败：$($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# 测试 3: 正确率趋势
Write-Host "[Test 3] 正确率趋势 API..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/report/accuracy-trend?studentId=$studentId&startDate=$startDate&endDate=$endDate" -Method Get
    Write-Host "  ✓ 成功" -ForegroundColor Green
    Write-Host "  数据点数：$($response.data.Count)"
} catch {
    Write-Host "  ✗ 失败：$($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# 测试 4: 错题分析
Write-Host "[Test 4] 错题分析 API..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/report/mistake-analysis?studentId=$studentId&startDate=$startDate&endDate=$endDate" -Method Get
    Write-Host "  ✓ 成功" -ForegroundColor Green
    Write-Host "  总错题：$($response.data.totalMistakes)"
    Write-Host "  已复习：$($response.data.reviewedCount)"
    Write-Host "  复习率：$($response.data.reviewRate)%"
} catch {
    Write-Host "  ✗ 失败：$($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# 测试 5: 学习建议
Write-Host "[Test 5] 学习建议 API..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/report/suggestions?studentId=$studentId" -Method Get
    Write-Host "  ✓ 成功" -ForegroundColor Green
    Write-Host "  建议数量：$($response.data.Count)"
    foreach ($suggestion in $response.data) {
        Write-Host "    - $($suggestion.icon) $($suggestion.title)"
    }
} catch {
    Write-Host "  ✗ 失败：$($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# 测试 6: 完整报告
Write-Host "[Test 6] 完整报告 API..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/report/full-report?studentId=$studentId&period=weekly" -Method Get
    Write-Host "  ✓ 成功" -ForegroundColor Green
    Write-Host "  周期：$($response.data.period)"
    Write-Host "  开始日期：$($response.data.startDate)"
    Write-Host "  结束日期：$($response.data.endDate)"
    Write-Host "  包含数据:"
    Write-Host "    - 学习概览：$($null -ne $response.data.overview)"
    Write-Host "    - 作业统计：$($null -ne $response.data.homeworkStats)"
    Write-Host "    - 错题分析：$($null -ne $response.data.mistakeAnalysis)"
    Write-Host "    - 学习建议：$($response.data.suggestions.Count) 条"
} catch {
    Write-Host "  ✗ 失败：$($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  测试完成！" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
