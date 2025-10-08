<template>
  <div class="toolbar" :class="{ draggable: !isMaximized }">
    <!-- 左侧功能按钮 -->
    <div class="toolbar-left">
      <button 
        class="function-btn" 
        :class="{ active: currentView === 'tomato' }"
        @click="switchView('tomato')"
      >
        <i class="fas fa-clock"></i>
        <span>{{ $t('toolbar.tomatoTimer') }}</span>
      </button>
      <button 
        class="function-btn" 
        :class="{ active: currentView === 'todo' }"
        @click="switchView('todo')"
      >
        <i class="fa-solid fa-check-square"></i>
        <span>{{ $t('toolbar.todoList') }}</span>
      </button>
    </div>

    <!-- 右侧控制按钮 -->
    <div class="toolbar-right">
      <!-- 透明度调节 -->
      <div class="opacity-control">
        <label for="opacity">{{ $t('toolbar.opacity') }}: {{ opacity }}%</label>
        <input
          type="range"
          id="opacity"
          min="30"
          max="100"
          step="5"
          v-model="opacity"
          @change="handleOpacityChange"
        >
      </div>
      
      <!-- 置顶按钮 -->
      <button 
        class="control-btn"
        :class="{ active: isAlwaysOnTop }"
        @click="toggleAlwaysOnTop"
      >
       置顶!
      </button>

      <!-- 窗口控制按钮（原标题栏功能） -->
      <div class="window-controls">
        <button class="window-btn" @click="minimizeWindow">
          <i class="fas fa-window-minimize"></i>
        </button>
        <button class="window-btn" @click="toggleMaximizeWindow">
          <i class="fa-solid" :class="isMaximized ? 'fa-window-restore' : 'fa-window-maximize'"></i>
        </button>
        <button class="window-btn close-btn" @click="closeWindow">
          <i class="fa-solid fa-rectangle-xmark"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

// 引入i18n
const { t } = useI18n();

// 视图状态管理
const currentView = ref('tomato'); // 默认显示番茄钟

// 窗口控制状态
const isAlwaysOnTop = ref(false);
const opacity = ref(80);
const isMaximized = ref(false);

// 切换视图
const switchView = (view) => {
  currentView.value = view;
  emits('view-changed', view);
};

// 切换窗口置顶状态
const toggleAlwaysOnTop = () => {
  isAlwaysOnTop.value = !isAlwaysOnTop.value;
  window.electronAPI.setAlwaysOnTop(isAlwaysOnTop.value);
};

// 处理透明度变化
const handleOpacityChange = () => {
  window.electronAPI.setWindowOpacity(opacity.value / 100);
};

// 窗口控制方法
const minimizeWindow = () => {
  window.electronAPI.minimizeWindow();
};

const toggleMaximizeWindow = () => {
  window.electronAPI.toggleMaximizeWindow();
  isMaximized.value = !isMaximized.value;
};

const closeWindow = () => {
  window.electronAPI.closeWindow();
};

// 初始化 - 获取当前窗口状态
onMounted(() => {
  // 获取窗口置顶状态
  window.electronAPI.getAlwaysOnTop().then((status) => {
    isAlwaysOnTop.value = status;
  });
  
  // 获取窗口透明度
  window.electronAPI.getWindowOpacity().then((value) => {
    opacity.value = Math.round(value * 100);
  });
});

// 定义要触发的事件
const emits = defineEmits(['view-changed']);
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
  height: 48px;
  box-sizing: border-box;
}

/* 允许拖拽的样式 */
.draggable {
  -webkit-app-region: drag;
}

.toolbar-left, .toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 取消按钮的拖拽属性，否则点击会失效 */
.toolbar button {
  -webkit-app-region: no-drag;
}

.function-btn, .control-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: #e0e0e0;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.function-btn:hover, .control-btn:hover {
  background-color: #d0d0d0;
}

.function-btn.active, .control-btn.active {
  background-color: #0078d7;
  color: white;
}

.opacity-control {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.opacity-control input {
  width: 100px;
}

/* 窗口控制按钮样式 */
.window-controls {
  display: flex;
  gap: 4px;
  margin-left: 10px;
}

.window-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.window-btn:hover {
  background-color: #e0e0e0;
}

.close-btn:hover {
  background-color: #ff4d4f;
  color: white;
}

/* 图标样式调整 */
.fas {
  font-size: 16px;
}
</style>
    