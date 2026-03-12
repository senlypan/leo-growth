/**
 * Leo Growth - 游戏化组件库
 * 乔布斯设计版 v3.0
 * 让每个组件都充满魔力
 */

const GameComponents = {
  /**
   * 1. 庆祝动画组件
   * 用于任务完成、成就获得等场景
   */
  Celebration: {
    /**
     * 播放彩带庆祝
     */
    playConfetti() {
      const colors = ['#667eea', '#764ba2', '#f39c12', '#2ecc71', '#e74c3c']
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div')
        confetti.className = 'confetti'
        confetti.style.left = Math.random() * 100 + 'vw'
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.animationDelay = Math.random() * 2 + 's'
        document.body.appendChild(confetti)
        
        setTimeout(() => confetti.remove(), 3000)
      }
    },
    
    /**
     * 播放星星闪烁
     */
    playStars(count = 10) {
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div')
        star.className = 'star'
        star.innerHTML = '⭐'
        star.style.position = 'fixed'
        star.style.left = Math.random() * 100 + 'vw'
        star.style.top = Math.random() * 100 + 'vh'
        star.style.fontSize = Math.random() * 40 + 40 + 'rpx'
        document.body.appendChild(star)
        
        setTimeout(() => star.remove(), 2000)
      }
    },
    
    /**
     * 播放升级动画
     */
    playLevelUp(oldLevel, newLevel) {
      this.playConfetti()
      this.playStars()
      
      // 显示升级提示
      const levelUpDiv = document.createElement('div')
      levelUpDiv.className = 'level-up'
      levelUpDiv.innerHTML = `
        <div class="level-up-content">
          <text class="level-up-title">🎉 升级啦！</text>
          <text class="level-up-from">LV.${oldLevel}</text>
          <text class="level-up-arrow">→</text>
          <text class="level-up-to">LV.${newLevel}</text>
        </div>
      `
      document.body.appendChild(levelUpDiv)
      
      setTimeout(() => levelUpDiv.remove(), 3000)
    }
  },
  
  /**
   * 2. 进度条组件
   * 带动画和百分比显示
   */
  ProgressBar: {
    /**
     * 创建进度条
     */
    create(options) {
      const {
        current,
        total,
        color = '#667eea',
        showPercent = true,
        animated = true
      } = options
      
      const percent = Math.round((current / total) * 100)
      
      const progressBar = document.createElement('div')
      progressBar.className = 'progress-bar-container'
      progressBar.innerHTML = `
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${percent}%; background: ${color}">
            ${animated ? '<div class="progress-bar-shimmer"></div>' : ''}
          </div>
        </div>
        ${showPercent ? `<text class="progress-bar-text">${percent}%</text>` : ''}
      `
      
      return progressBar
    },
    
    /**
     * 更新进度
     */
    update(progressBarElement, current, total) {
      const percent = Math.round((current / total) * 100)
      const fill = progressBarElement.querySelector('.progress-bar-fill')
      const text = progressBarElement.querySelector('.progress-bar-text')
      
      fill.style.width = percent + '%'
      if (text) text.textContent = percent + '%'
    }
  },
  
  /**
   * 3. 徽章组件
   * 用于成就展示
   */
  Badge: {
    /**
     * 创建徽章
     */
    create(options) {
      const {
        icon,
        title,
        description,
        level = 'bronze', // bronze, silver, gold, diamond
        earned = false
      } = options
      
      const levelColors = {
        bronze: 'linear-gradient(135deg, #cd7f32 0%, #8b4513 100%)',
        silver: 'linear-gradient(135deg, #c0c0c0 0%, #808080 100%)',
        gold: 'linear-gradient(135deg, #ffd700 0%, #daa520 100%)',
        diamond: 'linear-gradient(135deg, #b9f2ff 0%, #00ced1 100%)'
      }
      
      const badge = document.createElement('div')
      badge.className = `badge badge-${level} ${earned ? 'earned' : 'locked'}`
      badge.innerHTML = `
        <div class="badge-icon" style="background: ${levelColors[level]}">
          <text class="badge-emoji">${icon}</text>
        </div>
        <text class="badge-title">${title}</text>
        <text class="badge-description">${description}</text>
        ${!earned ? '<text class="badge-locked">🔒 未解锁</text>' : ''}
      `
      
      return badge
    }
  },
  
  /**
   * 4. 卡片组件
   * 通用卡片，支持多种样式
   */
  Card: {
    /**
     * 创建卡片
     */
    create(options) {
      const {
        title,
        content,
        footer,
        style = 'default', // default, premium, gradient
        gradient,
        onClick
      } = options
      
      const card = document.createElement('div')
      card.className = `card card-${style}`
      
      if (gradient) {
        card.style.background = gradient
      }
      
      card.innerHTML = `
        ${title ? `<text class="card-title">${title}</text>` : ''}
        ${content ? `<text class="card-content">${content}</text>` : ''}
        ${footer ? `<text class="card-footer">${footer}</text>` : ''}
      `
      
      if (onClick) {
        card.addEventListener('click', onClick)
      }
      
      return card
    }
  },
  
  /**
   * 5. 按钮组件
   * 支持多种样式和状态
   */
  Button: {
    /**
     * 创建按钮
     */
    create(options) {
      const {
        text,
        icon,
        style = 'primary', // primary, success, warning, danger, secondary
        size = 'normal', // small, normal, large
        disabled = false,
        loading = false,
        onClick
      } = options
      
      const button = document.createElement('button')
      button.className = `btn btn-${style} btn-${size} ${disabled ? 'disabled' : ''} ${loading ? 'loading' : ''}`
      
      button.innerHTML = `
        ${icon ? `<text class="btn-icon">${icon}</text>` : ''}
        ${loading ? '<text class="btn-loading">⏳</text>' : ''}
        <text class="btn-text">${text}</text>
      `
      
      if (disabled) {
        button.disabled = true
      }
      
      if (onClick && !disabled) {
        button.addEventListener('click', onClick)
      }
      
      return button
    }
  },
  
  /**
   * 6. 数字滚动组件
   * 用于积分、等级等数字变化
   */
  NumberRoll: {
    /**
     * 滚动数字
     */
    roll(element, from, to, duration = 1000) {
      const startTime = Date.now()
      const diff = to - from
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // 缓动函数
        const easeOut = 1 - Math.pow(1 - progress, 3)
        
        const current = Math.round(from + diff * easeOut)
        element.textContent = current
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      animate()
    }
  },
  
  /**
   * 7. 提示组件
   * 用于消息提示
   */
  Toast: {
    /**
     * 显示提示
     */
    show(message, type = 'info', duration = 2000) {
      const types = {
        info: '📝',
        success: '✅',
        warning: '⚠️',
        error: '❌',
        celebration: '🎉'
      }
      
      const toast = document.createElement('div')
      toast.className = `toast toast-${type}`
      toast.innerHTML = `
        <text class="toast-icon">${types[type]}</text>
        <text class="toast-message">${message}</text>
      `
      
      document.body.appendChild(toast)
      
      setTimeout(() => {
        toast.style.opacity = '0'
        setTimeout(() => toast.remove(), 300)
      }, duration)
    }
  },
  
  /**
   * 8. 加载组件
   * 用于加载状态
   */
  Loading: {
    /**
     * 显示加载
     */
    show(message = '加载中...') {
      const loading = document.createElement('div')
      loading.className = 'loading-overlay'
      loading.innerHTML = `
        <div class="loading-spinner"></div>
        <text class="loading-message">${message}</text>
      `
      
      document.body.appendChild(loading)
      
      return {
        hide: () => loading.remove()
      }
    }
  },
  
  /**
   * 9. 统计卡片组件
   * 用于数据展示
   */
  StatCard: {
    /**
     * 创建统计卡片
     */
    create(options) {
      const {
        icon,
        value,
        label,
        trend,
        color = '#667eea'
      } = options
      
      const card = document.createElement('div')
      card.className = 'stat-card'
      card.innerHTML = `
        <div class="stat-card-icon" style="background: ${color}20; color: ${color}">
          <text>${icon}</text>
        </div>
        <text class="stat-card-value">${value}</text>
        <text class="stat-card-label">${label}</text>
        ${trend ? `<text class="stat-card-trend ${trend > 0 ? 'up' : 'down'}">${trend > 0 ? '↑' : '↓'} ${Math.abs(trend)}%</text>` : ''}
      `
      
      return card
    }
  },
  
  /**
   * 10. 任务列表组件
   * 用于任务展示
   */
  TaskList: {
    /**
     * 创建任务列表
     */
    create(tasks) {
      const list = document.createElement('div')
      list.className = 'task-list'
      
      tasks.forEach((task, index) => {
        const taskItem = document.createElement('div')
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`
        taskItem.innerHTML = `
          <div class="task-checkbox">
            ${task.completed ? '✅' : '⬜'}
          </div>
          <div class="task-content">
            <text class="task-title">${task.title}</text>
            <text class="task-description">${task.description}</text>
          </div>
          <div class="task-reward">
            <text>${task.reward}</text>
          </div>
        `
        
        list.appendChild(taskItem)
      })
      
      return list
    }
  }
}

/**
 * 导出所有组件
 */
export default GameComponents

/**
 * 使用示例:
 * 
 * // 播放庆祝动画
 * GameComponents.Celebration.playConfetti()
 * 
 * // 创建进度条
 * const progressBar = GameComponents.ProgressBar.create({
 *   current: 75,
 *   total: 100,
 *   color: '#667eea'
 * })
 * 
 * // 创建徽章
 * const badge = GameComponents.Badge.create({
 *   icon: '🏆',
 *   title: '学习达人',
 *   description: '完成 10 次作业',
 *   level: 'gold',
 *   earned: true
 * })
 * 
 * // 显示提示
 * GameComponents.Toast.show('任务完成！', 'success')
 * 
 * // 数字滚动
 * GameComponents.NumberRoll.roll(element, 0, 100, 1000)
 */
