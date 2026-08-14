import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import HomeExtras from './components/HomeExtras.vue'
import './style.css'

// 自定义主题：在 VitePress 默认主题之上叠加本站设计系统与自定义组件。
// 如需自定义布局、注册更多全局组件，在此扩展即可。
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 首页底部额外的「学习路线 / 数据 / 号召」区块
    app.component('HomeExtras', HomeExtras)
  },
} satisfies Theme
