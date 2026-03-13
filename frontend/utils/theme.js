/**
 * Leo Growth - 统一主题配置
 * 微信风格设计系统
 * 
 * 使用方式：
 * const theme = require('../../utils/theme')
 * 
 * 或在 WXML 中直接使用 CSS 变量：
 * color: var(--primary)
 */

module.exports = {
  // 主色 - 仅用微信绿
  primary: '#07C160',
  primaryLight: '#09BB66',
  primaryDark: '#06AD56',
  
  // 功能色 - 仅在必要时使用
  success: '#07C160',
  warning: '#FF9F00',
  error: '#FA5151',
  info: '#10AEFF',
  
  // 文字色阶
  textPrimary: '#111111',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textPlaceholder: '#CCCCCC',
  
  // 背景色
  bgPrimary: '#F5F5F5',
  bgSecondary: '#FFFFFF',
  bgOverlay: 'rgba(0, 0, 0, 0.5)',
  
  // 边框/分割线
  border: '#E5E5E5',
  borderLight: '#EEEEEE',
  
  // 学科颜色（仅用于标识，不用于主 UI）
  subject: {
    chinese: '#FA5151',
    math: '#10AEFF',
    english: '#FF9F00'
  },
  
  // 状态颜色
  status: {
    pending: '#FF9F00',
    completed: '#07C160',
    reviewed: '#07C160',
    unreviewed: '#FF9F00',
    correct: '#07C160',
    incorrect: '#FA5151'
  }
}
