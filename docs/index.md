---
layout: home
markdownStyles: false

hero:
  name: Hello World
  text: 电控教程
  tagline: 从零开始的嵌入式开发与控制算法学习路线 —— 写给每一届新加入电控组的你
  image:
    src: /logo.jpg
    alt: 战队 Logo
  actions:
    - theme: brand
      text: 开始学习
      link: /guide/
    - theme: alt
      text: 学习路线图
      link: /guide/learning-path
    - theme: alt
      text: 关于本教程
      link: /about/

features:
  - icon: 🛠️
    title: 开发环境
    details: 从 CubeMX、Keil 到 Git，手把手把工具链跑通
    link: /guide/environment
  - icon: 💾
    title: 嵌入式基础
    details: STM32 外设、中断、定时器、PWM、UART、ADC 与通信协议
    link: /embedded/
  - icon: ⚙️
    title: 运动控制
    details: 电机、CAN 通信、PID 控制、麦轮底盘与云台
    link: /motion/
  - icon: 📡
    title: 传感器与感知
    details: IMU 姿态解算、编码器测速、遥控器数据解包
    link: /embedded/imu
  - icon: 🎯
    title: 进阶实战
    details: 裁判系统、发射机构、功率控制与状态机
    link: /advanced/
  - icon: 🤝
    title: 团队协作
    details: Git 协作规范、代码风格与贡献指南
    link: /about/contribute
---

<HomeExtras />
