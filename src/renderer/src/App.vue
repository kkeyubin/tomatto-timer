<template>
  <div class="app-container">
    <!-- 只保留我们的工具栏组件 -->
    <Toolbar @view-changed="handleViewChange" />
    
    <!-- 内容区域 - 根据选择的视图显示不同内容 -->
    <div class="content-area">
      <template v-if="currentView === 'tomato'">
        <!-- 这里将显示番茄钟组件，目前用占位文本 -->
        <div class="placeholder-content">
          <h2>{{ $t('tomato.title') }}</h2>
          <p>{{ $t('tomato.comingSoon') }}</p>
        </div>
      </template>
      
      <template v-else-if="currentView === 'todo'">
        <!-- 这里将显示待办清单组件，目前用占位文本 -->
        <div class="placeholder-content">
          <h2>{{ $t('todo.title') }}</h2>
          <p>{{ $t('todo.comingSoon') }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Toolbar from './components/Toolbar.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const currentView = ref('tomato'); // 默认显示番茄钟视图

// 处理视图切换
const handleViewChange = (view) => {
  currentView.value = view;
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.content-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f9f9f9;
}

.placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
}
</style>
