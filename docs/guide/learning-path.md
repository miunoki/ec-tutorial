# 学习路线图

整个电控学习路径分为四个阶段，从零基础一路走到能独立参与战队开发。建议**按顺序**完成，每阶段都有对应的练习任务。

::: warning 前置条件
只需会基本使用电脑。数学上会一点初中/高中物理（速度、力、角度）会有帮助，但不是硬门槛。
:::

## 四个阶段

<div class="rm-path-steps">

<div class="rm-path-step">
  <span class="num">1</span>
  <div class="body">
    <h3>入门与工具链</h3>
    <p>C / C++ 基础 → 开发环境（CubeMX、Keil、Git）→ 点亮第一颗 LED。目标：能独立编译、烧录、调试一个最小工程。</p>
  </div>
</div>

<div class="rm-path-step">
  <span class="num">2</span>
  <div class="body">
    <h3>嵌入式基础</h3>
    <p>STM32 外设（GPIO、中断、定时器、PWM、UART、ADC）与通信协议（CAN / SPI / I2C）。目标：会用 HAL 库读写外设、看懂寄存器层面的原理。</p>
  </div>
</div>

<div class="rm-path-step">
  <span class="num">3</span>
  <div class="body">
    <h3>运动控制</h3>
    <p>电机与 CAN 通信 → PID 控制 → 麦轮底盘与云台。目标：让一台车/云台按你的指令稳定运动。</p>
  </div>
</div>

<div class="rm-path-step">
  <span class="num">4</span>
  <div class="body">
    <h3>进阶实战</h3>
    <p>裁判系统、发射机构、功率控制、状态机与调试调参。目标：完整理解一台参赛机器人的电控系统。</p>
  </div>
</div>

</div>

## 每个阶段「怎么算学会」

- **入门**：能把一个空工程编译、下载到板子上并看到现象
- **嵌入式基础**：给一个外设需求，能独立查手册配置并跑通
- **运动控制**：能解释 PID 每个参数的作用，并独立调通一个闭环
- **进阶**：能读懂战队现有工程代码，并参与新功能开发

## 时间建议

| 阶段 | 建议周期 | 产出 |
| --- | --- | --- |
| 入门与工具链 | 1 周 | 点亮 LED / 串口打印 |
| 嵌入式基础 | 2–3 周 | 外设综合小项目 |
| 运动控制 | 3–4 周 | 底盘/云台动起来 |
| 进阶实战 | 持续 | 参与战队工程 |
