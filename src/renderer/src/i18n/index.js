import { createI18n } from 'vue-i18n';
import zhCN from './zh-CN';
import en from './en';

// 检测系统语言或使用默认语言
const defaultLocale = navigator.language.includes('zh') ? 'zh-CN' : 'en';

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  globalInjection: true, // 全局注入 $t 函数
  locale: defaultLocale, // 默认语言
  fallbackLocale: 'en', //  fallback 语言
  messages: {
    'zh-CN': zhCN,
    en: en
  }
});

export default i18n;
    