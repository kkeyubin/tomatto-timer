import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'; // 引入 i18n 配置
import '@fortawesome/fontawesome-free/css/all.min.css';


createApp(App).use(i18n).mount('#app')
