# 内容编写规范（CONTRIBUTING）

本文件是给「写教程的人」看的操作手册——如何新增、修改一篇教程。

## 一、页面文件在哪

所有教程都是 `docs/` 下的 Markdown（`.md`）文件，按分区存放：

| 分区 | 目录 | 对应导航 |
| --- | --- | --- |
| 入门指南 | `docs/guide/` | 入门指南 |
| 嵌入式基础 | `docs/embedded/` | 嵌入式基础 |
| 运动控制 | `docs/motion/` | 运动控制 |
| 进阶实战 | `docs/advanced/` | 进阶实战 |
| 关于 | `docs/about/` | 关于 |

每个分区的 `index.md` 是该分区的首页。

## 二、新增一篇教程

1. 在对应目录新建 `.md` 文件，命名用**小写英文 + 连字符**，如 `docs/motion/pid-tuning.md`
2. 在 [`docs/.vitepress/config.mts`](docs/.vitepress/config.mts) 的 `sidebar` 里登记：

```ts
'/motion/': [
  {
    text: '运动控制',
    items: [
      // ...已有条目
      { text: 'PID 调参进阶', link: '/motion/pid-tuning' }, // 新增这一行
    ],
  },
],
```

3. 运行 `npm run docs:dev` 确认能访问且排版正常

> 配置里 `link` 与文件名一一对应：`/motion/pid-tuning` ↔ `docs/motion/pid-tuning.md`（`cleanUrls` 已开启，无需 `.md` 后缀）。

## 三、页面模板

新建页面建议沿用以下结构（与现有占位页一致）：

```md
# 页面标题

::: tip 状态：🟡 待填充
本文档为骨架占位，正文尚未编写。请按下方大纲补全。
:::

一句话说明这个主题解决什么问题。

## 你将学到

- 要点一
- 要点二

## 建议大纲

1. **小节一** —— 说明
2. **小节二** —— 说明

## 参考资料

- [链接标题](https://example.com)
```

写完正文后，把顶部 `::: tip 状态` 改成：

```md
::: tip 已完成
本文档已补全，最后更新：2026-08。
:::
```

## 四、Markdown 语法速查

VitePress 支持标准 Markdown + 扩展语法：

- **标题**：`#` ~ `####`（`##`/`###` 会自动进入右侧目录）
- **提示框**：
  ```md
  ::: tip 提示
  这是提示内容
  :::
  ::: warning 注意
  这是警告内容
  :::
  ::: danger 危险
  这是危险/易错内容
  :::
  ```
- **代码块**（带语法高亮）：
  ````md
  ```c
  HAL_GPIO_WritePin(GPIOC, GPIO_PIN_13, GPIO_PIN_SET);
  ```
  ````
- **图片**：把图片放进 `docs/public/`，再引用 `/图片名.png`
- **表格**、**列表**、**链接**：标准 Markdown

## 五、写作约定

1. **面向零基础**，按「是什么 → 为什么 → 怎么做」展开
2. 代码尽量**可直接运行**，附注释
3. 配图用 `docs/public/` 下的本地文件，避免外链图片失效
4. 术语首次出现给一句解释
5. 引用外部资料附链接，引用队内文档注明版本

## 六、提交流程

1. 新建分支：`git checkout -b feature/xxx`
2. 修改后：`git add` → `git commit`（提交信息见下方格式）→ `git push`
3. 发起 Pull Request，等待 Review 合并

提交信息格式：`docs(motion): 补全 PID 调参章节`
