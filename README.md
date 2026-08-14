# 电控组新人教程（rm-ec-tutorial）

RoboMaster 战队**电控组**面向新成员的入门知识库，基于 [VitePress](https://vitepress.dev/) 构建，采用「DJI 科技蓝」企业官网风格。

> 定位：战队高级知识库（如 zju-helloworld Wiki）的**先导**，从零基础到能独立参与电控开发。

## 快速开始

需要 [Node.js](https://nodejs.org/) ≥ 18（建议 20 LTS）。

```bash
# 1. 安装依赖
npm install

# 2. 本地开发（热更新预览）
npm run docs:dev

# 3. 构建静态站点（输出到 docs/.vitepress/dist）
npm run docs:build

# 4. 预览构建产物
npm run docs:preview
```

## 目录结构

```
rm-ec-tutorial/
├── docs/
│   ├── index.md                 # 首页（企业落地页）
│   ├── .vitepress/
│   │   ├── config.mts           # 站点配置：标题 / 导航 / 侧边栏 / 部署 base
│   │   └── theme/
│   │       ├── index.ts         # 主题入口
│   │       ├── style.css        # 设计系统（配色 / 字体 / 组件）
│   │       └── components/      # 自定义组件
│   ├── public/                  # 静态资源（Logo、图片）
│   ├── guide/                   # 入门指南
│   ├── embedded/                # 嵌入式基础
│   ├── motion/                  # 运动控制
│   ├── advanced/                # 进阶实战
│   └── about/                   # 关于与贡献
├── .github/workflows/deploy.yml # GitHub Pages 自动部署
└── CONTRIBUTING.md              # 内容编写规范
```

## 上线前必须做的事（TODO）

1. **确认 `base` 取值**：[`docs/.vitepress/config.mts`](docs/.vitepress/config.mts) 顶部的 `base` —— 若仓库名是 `ZJU-HelloWorld.github.io` 则保持 `/`；若是普通项目仓库则改成 `/仓库名/`
2. **填写真实仓库地址**：创建教程仓库后，把 `config.mts` 中的 `repoUrl` 改成仓库地址，并启用 `editLink`（当前指向组织主页）
3. **补充战队介绍**：[`docs/about/index.md`](docs/about/index.md) 中的战队简介段落
4. **（可选）调整配色**：如需换色，改 [`docs/.vitepress/theme/style.css`](docs/.vitepress/theme/style.css) 顶部的 CSS 变量

## 部署到 GitHub Pages

1. 在 GitHub 创建仓库（若用 `https://用户名.github.io/`，仓库名须为 `用户名.github.io`；否则 `base` 需改为 `/仓库名/`，见 `config.mts` 顶部注释）
2. 仓库 **Settings → Pages → Source** 选择 **GitHub Actions**
3. 推送代码到 `main` 分支，`.github/workflows/deploy.yml` 会自动构建并发布

## 如何写内容

见 [CONTRIBUTING.md](CONTRIBUTING.md)。核心三步：建 `.md` 文件 → 在 `config.mts` 的 sidebar 登记 → 提交 PR。
