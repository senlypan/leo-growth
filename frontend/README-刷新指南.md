# 🔄 样式刷新指南

## 问题诊断

如果你看到样式还是旧的、颜色混乱，请按以下步骤操作：

---

## ✅ 步骤 1: 清除微信开发者工具缓存

1. 打开微信开发者工具
2. 点击菜单栏 **工具** → **清除缓存**
3. 勾选 **清除全部缓存**
4. 点击 **清除** 按钮

---

## ✅ 步骤 2: 重新编译

1. 点击工具栏的 **编译** 按钮（或按 `Ctrl + R` / `Cmd + R`）
2. 等待编译完成

---

## ✅ 步骤 3: 检查是否生效

### 应该看到的颜色：
- ✅ 导航栏：**微信绿** `#07C160`
- ✅ 底部 Tab 选中：**微信绿** `#07C160`
- ✅ 主按钮：**微信绿** `#07C160`
- ✅ 页面背景：**浅灰** `#F5F5F5`
- ✅ 卡片背景：**纯白** `#FFFFFF`

### 不应该看到的颜色：
- ❌ 紫色 `#667eea`
- ❌ 蓝绿色 `#4ECDC4`
- ❌ 复杂渐变

---

## ✅ 步骤 4: 如果还是不对

### 检查 app.wxss 是否生效

在微信开发者工具的 **调试器** → **Wxml** 中：

1. 选中任意页面元素
2. 查看右侧 **样式** 面板
3. 检查是否看到 CSS 变量：
   ```css
   --primary: #07C160;
   --bg-primary: #F5F5F5;
   ```

### 强制刷新

1. 关闭微信开发者工具
2. 重新打开项目
3. 再次编译

---

## 📋 已修改的文件

### 配置文件
- ✅ `app.json` - 导航栏和 TabBar 颜色改为 `#07C160`
- ✅ `app.wxss` - 全局设计令牌

### JS 文件
- ✅ `pages/assessment/report/report.js` - 雷达图颜色
- ✅ `pages/mistakes/detail/detail.js` - 确认按钮颜色

### WXSS 文件（18 个）
- ✅ `app.wxss`
- ✅ `pages/index/index.wxss`
- ✅ `pages/homework/homework.wxss`
- ✅ `pages/homework/detail/detail.wxss`
- ✅ `pages/homework/submit/submit.wxss`
- ✅ `pages/homework/check/check.wxss`
- ✅ `pages/homework/submission/submission.wxss`
- ✅ `pages/mistakes/mistakes.wxss`
- ✅ `pages/mistakes/detail/detail.wxss`
- ✅ `pages/mistakes/submit/submit.wxss`
- ✅ `pages/study/study.wxss`
- ✅ `pages/report/report.wxss`
- ✅ `pages/goals/goals.wxss`
- ✅ `pages/assessment/assessment.wxss`
- ✅ `pages/assessment/report/report.wxss`
- ✅ `pages/learning/path/path.wxss`
- ✅ `styles/animations.wxss`
- ✅ `components/game-components.wxss`

---

## 🎯 最终效果

### 设计原则
- **单一主色**：微信绿 `#07C160`
- **简洁背景**：浅灰 `#F5F5F5` + 纯白 `#FFFFFF`
- **清晰层级**：文字三色 `#111111` / `#666666` / `#999999`
- **克制圆角**：8/12/16rpx
- **统一间距**：8 倍数

### 视觉检查点
| 元素 | 应该是 | 不应该是 |
|------|--------|----------|
| 导航栏 | 微信绿 | 蓝绿色/紫色 |
| 主按钮 | 微信绿 | 紫色渐变 |
| 卡片背景 | 纯白 | 带渐变 |
| 页面背景 | 浅灰 | 彩色渐变 |
| 文字 | 黑/灰 | 彩色 |

---

## 🆘 还有问题？

如果按以上步骤操作后样式仍然不对：

1. **截图**当前效果
2. **检查控制台**是否有 CSS 错误
3. **确认文件已保存**（微信开发者工具有时会不同步）
4. **重启微信开发者工具**

---

**记住：最好的设计是简洁、克制、统一的。** 🍃
