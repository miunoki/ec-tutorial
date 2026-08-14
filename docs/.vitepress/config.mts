import { defineConfig } from 'vitepress'

// ============================================================
//  站点身份
// ============================================================
const teamName = 'Hello World' // 战队名称
const teamNameEn = 'HelloWorld' // 战队英文名
const repoUrl = 'https://github.com/miunoki/ec-tutorial' // 教程仓库地址

// GitHub Pages 部署 base（项目仓库 ec-tutorial）
const base = '/ec-tutorial/'

// ============================================================
//  侧边栏结构（骨架）—— 新增章节只需在此登记，然后在对应目录下建 .md 文件
// ============================================================
const sidebar = {
  '/guide/': [
    {
      text: '入门指南',
      items: [
        { text: '开始入门', link: '/guide/' },
        { text: '学习路线图', link: '/guide/learning-path' },
        { text: '开发环境搭建', link: '/guide/environment' },
        { text: 'C / C++ 基础', link: '/guide/c-basics' },
        { text: 'Git 与团队协作', link: '/guide/git' },
      ],
    },
  ],
  '/embedded/': [
    {
      text: '嵌入式基础',
      items: [
        { text: '概览', link: '/embedded/' },
        { text: 'STM32 入门', link: '/embedded/stm32-intro' },
        { text: 'GPIO 与点灯', link: '/embedded/gpio' },
        { text: '外部中断 EXTI', link: '/embedded/interrupt' },
        { text: '定时器与 PWM', link: '/embedded/timer-pwm' },
        { text: '串口 UART 与 DMA', link: '/embedded/uart-dma' },
        { text: 'ADC 采样', link: '/embedded/adc' },
        { text: '通信协议 CAN / SPI / I2C', link: '/embedded/communication' },
        { text: '遥控器与 DBUS', link: '/embedded/remote-dbus' },
        { text: 'IMU 与姿态解算', link: '/embedded/imu' },
        { text: 'RTOS 入门', link: '/embedded/rtos' },
      ],
    },
  ],
  '/motion/': [
    {
      text: '运动控制',
      items: [
        { text: '概览', link: '/motion/' },
        { text: '电机基础', link: '/motion/motor-basics' },
        { text: 'CAN 电机：3508 / 6020', link: '/motion/can-motor' },
        { text: 'PID 控制', link: '/motion/pid' },
        { text: '底盘运动学：麦轮 / 全向轮', link: '/motion/chassis' },
        { text: '云台控制', link: '/motion/gimbal' },
      ],
    },
  ],
  '/advanced/': [
    {
      text: '进阶实战',
      items: [
        { text: '概览', link: '/advanced/' },
        { text: '裁判系统', link: '/advanced/referee-system' },
        { text: '发射机构', link: '/advanced/shooter' },
        { text: '功率控制', link: '/advanced/power-control' },
        { text: '状态机与任务调度', link: '/advanced/state-machine' },
        { text: '调试与调参', link: '/advanced/debugging' },
      ],
    },
  ],
  '/about/': [
    {
      text: '关于',
      items: [
        { text: '关于本教程', link: '/about/' },
        { text: '贡献指南', link: '/about/contribute' },
      ],
    },
  ],
}

// ============================================================
//  站点配置
// ============================================================
export default defineConfig({
  base,
  lang: 'zh-CN',
  title: `${teamName} · 电控教程`,
  titleTemplate: `:title · ${teamName}`,
  description: `${teamName}电控组新人教程 —— 从零开始的嵌入式开发与控制算法学习路线`,
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/jpeg', href: base + 'logo.jpg' }],
    ['meta', { name: 'theme-color', content: '#0087ee' }],
    ['meta', { name: 'author', content: teamName + ' 电控组' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: `${teamName} · 电控教程` }],
    ['meta', { property: 'og:description', content: `${teamName}电控组新人教程 —— 从零开始的嵌入式开发与控制算法学习路线` }],
  ],

  themeConfig: {
    logo: '/logo.jpg',
    siteTitle: `${teamName} 电控组`,

    nav: [
      { text: '首页', link: '/' },
      { text: '入门指南', link: '/guide/' },
      { text: '嵌入式基础', link: '/embedded/' },
      { text: '运动控制', link: '/motion/' },
      { text: '进阶实战', link: '/advanced/' },
      { text: '关于', link: '/about/' },
    ],

    sidebar,

    outline: { level: [2, 3], label: '本页目录' },
    search: { provider: 'local', options: { translations: { button: { buttonText: '搜索' } } } },

    socialLinks: [{ icon: 'github', link: repoUrl }],

    editLink: { pattern: `${repoUrl}/edit/main/docs/:path`, text: '在 GitHub 上编辑此页' },

    footer: {
      message: `由 ${teamName} 电控组维护 · 基于 VitePress 构建`,
      copyright: 'Copyright © ' + new Date().getFullYear() + ' ' + teamName,
    },

    docFooter: { prev: '上一篇', next: '下一篇' },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题',
    lastUpdated: { text: '最后更新于', formatOptions: { dateStyle: 'short', timeStyle: 'short' } },
  },
})
