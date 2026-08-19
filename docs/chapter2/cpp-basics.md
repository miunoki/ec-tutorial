# C / C++ 基础

::: tip 本节目标
学会写出能看懂、能维护的嵌入式 C/C++ 代码。第三章你会用 C++ 封装电机、第四章封装云台和 IMU——这一节的指针、结构体、类与继承，就是那一切的底子。
:::

## 一、为什么是 C / C++

电控的代码跑在 STM32 单片机上，主流语言就是 C 和 C++：

- **C 离硬件近**：指针和位运算能直接读写寄存器，几乎所有的底层驱动（HAL 库）都是 C 写的。
- **C++ 在 C 之上加了面向对象**：方便把「一台电机」「一个云台」封装成对象，代码更好组织、更好复用。

简单说：**C 是根基，C++ 是让代码优雅起来的工具**。两者不冲突，混着用也行。

## 二、C 语言基础

### 1. 变量与基本类型

嵌入式里推荐用带位宽的类型，避免不同平台 `int` 大小不一致：

| 类型 | 含义 | 位宽 |
| --- | --- | --- |
| `uint8_t` | 无符号 8 位 | 0 ~ 255 |
| `int32_t` | 有符号 32 位 | -2³¹ ~ 2³¹-1 |
| `uint32_t` | 无符号 32 位 | 0 ~ 2³²-1 |
| `float` | 单精度浮点 | 32 位 |

这些定义在 `<stdint.h>` 里。电控里常见的就是 `uint8_t`（字节）、`int32_t`（编码器计数值）、`float`（角度、电流）。

### 2. 指针

指针就是「存地址的变量」。在嵌入式里，指针最大的用途是**直接访问某个地址上的硬件寄存器**：

```c
// 0x40021018 是 STM32F4 的 RCC 时钟使能寄存器地址
uint32_t *rcc_ahb1enr = (uint32_t *)0x40021018;
*rcc_ahb1enr |= (1u << 0);   // 使能 GPIOA 的时钟
```

取地址 `&` 和取值 `*` 是一对：

```c
int a = 10;
int *p = &a;   // p 存 a 的地址
*p = 20;       // 通过 p 修改 a
```

### 3. 数组与指针

数组名本质是一个指向首元素的指针，所以这两段是等价的：

```c
int arr[4] = {1, 2, 3, 4};
int x = arr[2];        // 3
int y = *(arr + 2);    // 也是 3
```

字符串就是 `char` 数组，末尾带一个 `'\0'`。

### 4. 结构体

结构体把一组相关数据打包成一个类型。嵌入式里最经典的用法是**用结构体映射一组连续的寄存器**，这正是 STM32 HAL 库的做法：

```c
typedef struct {
    volatile uint32_t MODER;    // 模式寄存器
    volatile uint32_t OTYPER;   // 输出类型
    volatile uint32_t OSPEEDR;  // 速度
    volatile uint32_t PUPDR;    // 上下拉
    volatile uint32_t IDR;      // 输入数据
    volatile uint32_t ODR;      // 输出数据
} GPIO_TypeDef;

#define GPIOA ((GPIO_TypeDef *)0x40020000UL)  // GPIOA 的寄存器基址

GPIOA->ODR |= (1u << 13);  // PA13 输出高电平，点亮一颗 LED
```

`GPIOA->ODR` 就是 `(*GPIOA).ODR` 的简写，非常常用。

### 5. 位运算

寄存器大多是「一个位控制一个功能」，所以位运算是电控的基本功：

```c
uint32_t reg = 0;

reg |= (1u << 0);        // 置位：第 0 位置 1
reg &= ~(1u << 2);       // 清位：第 2 位置 0
reg ^= (1u << 4);        // 翻转：第 4 位取反

uint32_t bit3 = (reg >> 3) & 1u;   // 读第 3 位是 0 还是 1

// 对一段连续位（比如配置分频系数）：
reg = (reg & ~0xFu) | 0b1010;      // 把低 4 位清 0 再写 1010
```

### 6. `volatile` 与 `static`

这两个关键词在嵌入式里几乎天天见。

**`volatile`**：告诉编译器「这个变量随时可能被外部改变，每次都要真正去读内存，别优化掉」。硬件寄存器、中断里会变的变量，都要加：

```c
volatile uint32_t *reg = (uint32_t *)0x40021018;  // 硬件寄存器
volatile int flag;   // 中断里会置 1 的标志位
```

不加 `volatile`，编译器可能认为值不变，把循环里的读取优化成只读一次，导致死循环读不到更新。

**`static`** 有两个含义：

- **局部 `static`**：变量只在函数内可见，但生命周期和程序一样长（下次进入函数值还在）：

```c
void tick() {
    static int count = 0;  // 只初始化一次
    count++;
}
```

- **全局 `static`**：变量/函数只在当前文件可见，别的文件访问不到（类似「私有」）：

```c
static int internal_state;    // 别的 .c 文件看不到
static void helper(void) { }  // 内部辅助函数
```

### 7. 内存大致分三块

| 区域 | 特点 | 例子 |
| --- | --- | --- |
| 栈（stack） | 函数局部变量，自动分配释放 | `int a = 10;` |
| 静态区（static/global） | 全局变量、`static` 变量 | `static int g;` |
| 堆（heap） | 手动 `malloc`/`free` 分配 | 嵌入式里**尽量少用** |

嵌入式 MCU 内存小，一般**避免动态分配**（堆），能用栈和静态区解决就用它们。

## 三、C++ 面向对象

### 1. 类与对象

类把「数据 + 操作这些数据的函数」绑在一起。比如一台电机，有编号、有当前速度，还能设置输出：

```cpp
class Motor {
public:
    void setOutput(float out) { output_ = out; }   // 成员函数（方法）
    float getSpeed() const { return speed_; }      // const 表示不修改数据

private:
    int id_;        // 电机编号
    float speed_;   // 当前速度
    float output_;  // 输出量
};
```

用起来：

```cpp
Motor m;
m.setOutput(0.5f);       // 调用成员函数
float s = m.getSpeed();
```

`public` 成员外部可见，`private` 成员只有类内部能访问——这是**封装**：外部不需要知道内部细节，只通过公开的方法操作。

### 2. 构造函数与析构函数

**构造函数**在对象创建时自动调用，用来初始化成员：

```cpp
class Motor {
public:
    Motor(int id) : id_(id), speed_(0), output_(0) {}  // 初始化列表
    // ...
private:
    int id_;
    float speed_;
    float output_;
};

Motor m(1);  // 创建时传入电机编号
```

**析构函数** `~Motor()` 在对象销毁时调用，用来清理资源（比如关闭外设、释放内存）。

### 3. 继承

继承表达「A 是一种 B」。队里可能有好几种电机（M3508、M2006…），它们都是「电机」，有共同的行为，但细节不同：

```cpp
class Motor {                 // 基类
public:
    Motor(int id) : id_(id) {}
    virtual void setOutput(float out) = 0;   // 纯虚函数：只声明，由子类实现
    virtual ~Motor() = default;              // 虚析构，保证子类正确析构
protected:
    int id_;                  // protected：子类可访问，外部不可
};

class M3508 : public Motor {  // M3508 是一种 Motor
public:
    M3508(int id) : Motor(id) {}
    void setOutput(float out) override {
        canSend(id_, out);    // 通过 CAN 发送电流指令（第三章会讲）
    }
};

class M2006 : public Motor {
public:
    M2006(int id) : Motor(id) {}
    void setOutput(float out) override {
        pwmSet(id_, out);     // 通过 PWM 控制（第三章会讲）
    }
};
```

好处：上层代码只面对 `Motor` 这个接口，不用关心具体是哪款电机。

### 4. 虚函数与多态

上面的 `virtual` 和 `override` 实现的就是**多态**：同一个调用，根据对象实际类型走不同的实现：

```cpp
Motor *m1 = new M3508(1);
Motor *m2 = new M2006(2);

m1->setOutput(0.5f);  // 实际调用 M3508::setOutput，走 CAN
m2->setOutput(0.5f);  // 实际调用 M2006::setOutput，走 PWM
```

把电机放进一个数组统一驱动，第三章写底盘控制时就会大量用到：

```cpp
Motor *motors[4] = { new M3508(1), new M3508(2), new M3508(3), new M3508(4) };
for (int i = 0; i < 4; i++) {
    motors[i]->setOutput(0.3f);
}
```

## 四、小结

这一节你只需要记住几个「地标」：

- **指针 + 结构体 + 位运算** → 直接操作硬件寄存器
- **`volatile` / `static`** → 硬件与中断场景的正确写法
- **类 + 继承 + 虚函数** → 把电机、传感器封装成可复用的对象

后续第三章会把这里的 `Motor` 基类继续展开，接上真正的 CAN 通信和 PID 控制。如果 C/C++ 语法还不熟，随时回来看这节，或者查任意一本 C/C++ 教程对照。
