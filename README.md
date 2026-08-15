# 电控组新人教程（rm-ec-tutorial）

RoboMaster 战队**电控组**面向新成员的入门知识库，基于 [VitePress](https://vitepress.dev/) 构建，采用「DJI 科技蓝」企业官网风格。

> 定位：战队高级知识库（如 zju-helloworld Wiki）的**先导**。最终目标：让新人能**独立调试一台「任意底盘 + 双轴云台」的小车**（不含摩擦轮、功率控制等部分）。

## 四大章节（问卷闯关）

每章末尾有问卷，通过后自动解锁下一章（进度保存在本机浏览器）：

| 章节 | 主题 | 状态 |
| --- | --- | --- |
| 第一章 · 认识 RoboMaster | 赛制、兵种、技术革新、规则更新 | ✅ 已编写 |
| 第二章 · 电控基础 | C/C++、STM32、外设、通信协议 | 🟡 待填充 |
| 第三章 · 运动控制 | 电机、PID、底盘运动学 | 🟡 待填充 |
| 第四章 · 双轴云台与整车联调 | IMU、云台、系统整合与调试 | 🟡 待填充 |

## 快速开始

需要 [Node.js](https://nodejs.org/) ≥ 18（建议 20 LTS）。

```bash
npm install        # 安装依赖
npm run docs:dev   # 本地开发（热更新预览）
npm run docs:build # 构建静态站点（输出到 docs/.vitepress/dist）
npm run docs:preview # 预览构建产物
```

> 提示：`docs:build` 依赖 git 计算「最后更新」时间；若在无 git 的终端里报 `spawn git ENOENT`，请用 Git Bash 构建，或在 `docs/.vitepress/config.mts` 里把 `lastUpdated` 设为 `false`。

## 目录结构

```
rm-ec-tutorial/
├── docs/
│   ├── index.md                 # 首页
│   ├── chapter1/                # 第一章 · 认识 RoboMaster
│   ├── chapter2/                # 第二章 · 电控基础
│   ├── chapter3/                # 第三章 · 运动控制
│   ├── chapter4/                # 第四章 · 双轴云台与整车联调
│   ├── about/                   # 关于与贡献
│   ├── public/                  # 静态资源（Logo、图片）
│   └── .vitepress/
│       ├── config.mts           # 站点配置（标题/导航/侧边栏/部署 base）
│       └── theme/
│           ├── index.ts         # 主题入口（注册自定义组件）
│           ├── style.css        # 设计系统（配色/字体/组件）
│           └── components/      # 首页区块、问卷、章节门
├── .github/workflows/deploy.yml # GitHub Pages 自动部署
└── CONTRIBUTING.md              # 内容编写规范
```

## 待补充（TODO）

1. **战队介绍**：[docs/about/index.md](docs/about/index.md) 中的战队简介、历史战绩、组织架构
2. **第二章起的内容**：逐章讨论后补全正文与问卷题目

## 部署到 GitHub Pages

1. 仓库 **Settings → Pages → Source** 选择 **GitHub Actions**
2. 推送代码到 `main` 分支，`.github/workflows/deploy.yml` 会自动构建并发布

## 如何写内容

见 [CONTRIBUTING.md](CONTRIBUTING.md)。核心三步：建 `.md` 文件 → 在 `config.mts` 的 sidebar 登记 → 提交 PR。
