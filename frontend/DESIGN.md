# Leo Growth 设计规范

## 🎨 设计原则

**简洁 · 克制 · 统一 · 高级**

### 核心理念
1. **单一主色**：只用微信绿 `#07C160`
2. **中性背景**：浅灰 `#F5F5F5` + 纯白 `#FFFFFF`
3. **清晰层级**：文字三级颜色
4. **严格节奏**：8 倍数间距和圆角
5. **克制动画**：只保留必要的

---

## 🎨 颜色系统

### 主色（仅用微信绿）
```css
--primary: #07C160;      /* 主要按钮、选中状态 */
--primary-light: #09BB66; /* 渐变高光 */
--primary-dark: #06AD56;  /* 渐变阴影 */
```

### 功能色（仅在必要时使用）
```css
--success: #07C160;   /* 成功、完成 */
--warning: #FF9F00;   /* 警告、待处理 */
--error: #FA5151;     /* 错误、未完成 */
--info: #10AEFF;      /* 信息、已检查 */
```

### 文字颜色（严格三级）
```css
--text-primary: #111111;    /* 主要文字（标题、正文） */
--text-secondary: #666666;  /* 次要文字（描述、副标题） */
--text-tertiary: #999999;   /* 辅助文字（时间、提示） */
--text-placeholder: #CCCCCC; /* 占位符 */
```

### 背景色
```css
--bg-primary: #F5F5F5;   /* 页面背景 */
--bg-secondary: #FFFFFF; /* 卡片、容器 */
--bg-overlay: rgba(0, 0, 0, 0.5); /* 遮罩 */
```

### 边框/分割线
```css
--border: #E5E5E5;      /* 边框 */
--border-light: #EEEEEE; /* 内部分割线 */
```

### 学科颜色（仅用于标识，不用于主 UI）
```css
语文：#FA5151（红）
数学：#10AEFF（蓝）
英语：#FF9F00（橙）
```

---

## 📐 尺寸系统

### 圆角（统一 8 倍数）
```css
--radius-sm: 8rpx;   /* 小徽章、标签 */
--radius-md: 12rpx;  /* 按钮、输入框 */
--radius-lg: 16rpx;  /* 卡片 */
--radius-xl: 24rpx;  /* 大卡片、弹窗 */
```

### 间距（严格 8 倍数）
```css
--space-1: 8rpx;   /* 紧凑间距 */
--space-2: 16rpx;  /* 标准间距 */
--space-3: 24rpx;  /* 卡片内边距 */
--space-4: 32rpx;  /* 大间距 */
--space-5: 48rpx;  /* 超大间距 */
--space-6: 64rpx;  /* 页面边距 */
```

### 阴影（克制使用）
```css
--shadow-sm: 0 1rpx 3rpx rgba(0, 0, 0, 0.04);   /* 轻微卡片 */
--shadow-md: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);   /* 标准卡片 */
--shadow-lg: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);  /* 悬浮元素 */
```

---

## 🧩 组件规范

### 卡片
```css
.card {
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
}
```

### 按钮
```css
/* 主按钮 */
.btn-primary {
  background: #07C160;
  color: #FFFFFF;
  height: 88rpx;
  border-radius: 12rpx;
}

/* 次按钮 */
.btn-secondary {
  background: #F5F5F5;
  color: #666666;
}

/* 幽灵按钮 */
.btn-ghost {
  background: transparent;
  color: #07C160;
}
```

### 徽章/标签
```css
.badge {
  padding: 4rpx 12rpx;
  border-radius: 6rpx;
  font-size: 22rpx;
  background: rgba(7, 193, 96, 0.1);
  color: #07C160;
}
```

### 进度条
```css
.progress {
  height: 8rpx;
  background: #EEEEEE;
  border-radius: 4rpx;
}

.progress-bar {
  background: #07C160;
}
```

---

## 📝 文字层级

### 标题
```css
.page-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #111111;
}

.section-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #111111;
}

.card-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #111111;
}
```

### 正文
```css
.text-primary { color: #111111; }    /* 主要信息 */
.text-secondary { color: #666666; }  /* 次要信息 */
.text-tertiary { color: #999999; }   /* 辅助信息 */
```

---

## 🎬 动画规范

### 原则
- **必要**：只在需要反馈时使用
- **流畅**：0.15-0.3s 的缓动
- **克制**：不炫技，不打扰

### 标准动画
```css
/* 淡入 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8rpx); }
  to { opacity: 1; transform: translateY(0); }
}

/* 按压反馈 */
.btn:active {
  opacity: 0.6;
}

/* 卡片按压 */
.card:active {
  background: #FAFAFA;
}
```

---

## ✅ 使用检查清单

### 开发前
- [ ] 确认使用 CSS 变量，不硬编码颜色
- [ ] 确认间距使用 8 倍数
- [ ] 确认文字颜色符合三级规范

### 开发中
- [ ] 主按钮用 `#07C160`
- [ ] 背景用 `#F5F5F5` 或 `#FFFFFF`
- [ ] 不用渐变（除欢迎卡片）
- [ ] 不用重阴影

### 开发后
- [ ] 检查是否有遗漏的硬编码颜色
- [ ] 检查文字层级是否清晰
- [ ] 检查间距是否统一

---

## 🚫 禁止事项

1. ❌ 使用紫色 `#667eea` 或其他渐变
2. ❌ 使用大圆角（>24rpx）
3. ❌ 使用重阴影
4. ❌ 使用复杂动画
5. ❌ 硬编码颜色值（使用 CSS 变量）
6. ❌ 混用多套设计规范

---

## 📦 主题配置

在 `utils/theme.js` 中定义了所有颜色变量，开发时应优先使用 CSS 变量：

```css
/* 推荐 */
color: var(--primary);
background: var(--bg-secondary);

/* 不推荐 */
color: #07C160;
background: #FFFFFF;
```

---

## 🎯 设计参考

- 微信 App
- 微信小程序官方组件
- 微信设计指南

**记住：最好的设计是让人感受不到设计的存在。**
