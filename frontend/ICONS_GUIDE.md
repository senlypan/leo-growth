# 图标使用说明

> 📱 tabBar 图标配置说明

---

## 当前配置

由于图标文件暂未提供，当前使用 **emoji** 代替图标：

```json
{
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "🏠 首页"
      },
      {
        "pagePath": "pages/homework/homework",
        "text": "📚 作业"
      },
      {
        "pagePath": "pages/mistakes/mistakes",
        "text": "❌ 错题"
      },
      {
        "pagePath": "pages/report/report",
        "text": "📊 报告"
      }
    ]
  }
}
```

---

## 如何添加正式图标

### 1. 准备图标文件

准备以下图标文件（建议尺寸：81x81px）：

```
frontend/
└── images/
    ├── home.png           # 首页图标
    ├── home-active.png    # 首页选中图标
    ├── homework.png       # 作业图标
    ├── homework-active.png # 作业选中图标
    ├── mistake.png        # 错题图标
    ├── mistake-active.png # 错题选中图标
    ├── report.png         # 报告图标
    └── report-active.png  # 报告选中图标
```

### 2. 修改 app.json

将 tabBar 配置修改为：

```json
{
  "tabBar": {
    "color": "#999999",
    "selectedColor": "#4ECDC4",
    "backgroundColor": "#ffffff",
    "borderStyle": "black",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "images/home.png",
        "selectedIconPath": "images/home-active.png"
      },
      {
        "pagePath": "pages/homework/homework",
        "text": "作业",
        "iconPath": "images/homework.png",
        "selectedIconPath": "images/homework-active.png"
      },
      {
        "pagePath": "pages/mistakes/mistakes",
        "text": "错题",
        "iconPath": "images/mistake.png",
        "selectedIconPath": "images/mistake-active.png"
      },
      {
        "pagePath": "pages/report/report",
        "text": "报告",
        "iconPath": "images/report.png",
        "selectedIconPath": "images/report-active.png"
      }
    ]
  }
}
```

---

## 图标设计规范

### 尺寸要求
- 推荐尺寸：**81x81 px**
- 最小尺寸：40x40 px
- 最大尺寸：100x100 px

### 格式要求
- 格式：**PNG**
- 颜色：单色或彩色
- 背景：透明背景

### 设计风格
- 简洁明了
- 易于识别
- 符合小学生审美
- 色彩明亮

---

## 临时方案

当前使用 emoji 作为临时方案：
- 🏠 首页
- 📚 作业
- ❌ 错题
- 📊 报告

**优点:**
- 无需图标文件
- 色彩丰富
- 小学生友好

**缺点:**
- 不够正式
- 无法自定义颜色
- 选中状态无变化

---

**建议:** 尽快提供正式图标文件，提升用户体验！🎨
