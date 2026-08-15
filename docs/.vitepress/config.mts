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
//  侧边栏结构 —— 四大章节递进，每章末尾问卷解锁下一章
// ============================================================
const sidebar = {
  '/chapter1/': [
    {
      text: '第一章 · 认识 RoboMaster',
      items: [
        { text: '章节概览', link: '/chapter1/' },
        { text: 'RoboMaster 是什么', link: '/chapter1/what-is-robomaster' },
        { text: '赛制与兵种', link: '/chapter1/robots-and-rules' },
        { text: '技术革新', link: '/chapter1/tech-evolution' },
        { text: '赛制与规则更新', link: '/chapter1/rules-update' },
        { text: '电控组是做什么的', link: '/chapter1/ec-role' },
        { text: '📝 第一章问卷', link: '/chapter1/quiz' },
      ],
    },
  ],
  '/chapter2/': [
    {
      text: '第二章 · 电控基础',
      items: [
        { text: '章节概览', link: '/chapter2/' },
        { text: '📝 第二章问卷', link: '/chapter2/quiz' },
      ],
    },
  ],
  '/chapter3/': [
    {
      text: '第三章 · 运动控制',
      items: [
        { text: '章节概览', link: '/chapter3/' },
        { text: '📝 第三章问卷', link: '/chapter3/quiz' },
      ],
    },
  ],
  '/chapter4/': [
    {
      text: '第四章 · 双轴云台与整车联调',
      items: [
        { text: '章节概览', link: '/chapter4/' },
        { text: '🎯 结业问卷', link: '/chapter4/quiz' },
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
  description: `${teamName}电控组新人教程 —— 从认识 RoboMaster 到独立调试双轴云台小车`,
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/jpeg', href: base + 'logo.jpg' }],
    ['meta', { name: 'theme-color', content: '#0087ee' }],
    ['meta', { name: 'author', content: teamName + ' 电控组' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: `${teamName} · 电控教程` }],
    ['meta', { property: 'og:description', content: `${teamName}电控组新人教程 —— 从认识 RoboMaster 到独立调试双轴云台小车` }],
  ],

  themeConfig: {
    logo: '/logo.jpg',
    siteTitle: `${teamName} 电控组`,

    nav: [
      { text: '首页', link: '/' },
      { text: '第一章', link: '/chapter1/' },
      { text: '第二章', link: '/chapter2/' },
      { text: '第三章', link: '/chapter3/' },
      { text: '第四章', link: '/chapter4/' },
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
