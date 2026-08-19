# 纳新环境配置

::: tip 本页来源
本节整理自队内《纳新环境配置》文档（作者：蔡坤镇），工具链为 **CubeMX + VS Code + CMake + Ozone**。原文含大量截图，这里以文字步骤为主，具体界面可对照原文档。
:::

## 写在前面：为什么换掉 MDK

针对原有 **MDK-ARM** 开发环境的诸多不便，我们尝试更换嵌入式开发工具链，以实现更便捷、高效、优雅的嵌入式开发。

- **CLion 方案**（JetBrains）：功能齐全，对嵌入式开发提供完善支持；缺点是需收费、内存占用较高。
- **VS Code 方案**：轻量化的开源方案，摒弃 IDE，深入掌控项目构建过程。

两种方案都值得尝试。此外，我们**强烈推荐使用 SEGGER Ozone 进行调试**。

下面介绍使用 CubeMX + VS Code + Ozone 配置 STM32 开发环境所涉及的工具。

## 一、工具链总览

| 工具 | 作用 |
| --- | --- |
| STM32CubeMX | 图形化配置 MCU：选型、引脚、时钟、外设参数，最后按所选 IDE 生成工程和初始化 C 代码 |
| Visual Studio Code | 轻量级源代码编辑器，靠扩展生态支持 C/C++ 等语言 |
| CMake | 跨平台构建工具，用 `CMakeLists.txt` 控制编译，生成 makefile |
| Ninja | 轻量快速的构建工具，替代 make，负责执行编译 |
| arm-none-eabi-gcc | 交叉编译工具链，把源码编译成 ARM 架构的 `.elf` / `.bin` |
| SEGGER Ozone | 用于 J-Link / J-Trace 的调试器与性能分析器，可实时监看变量、显示波形 |

> 关于调试器：官方说明中 Ozone 仅支持 J-Link。我们发现部分老版本 J-Link 驱动扩展了对 CMSIS-DAP 的支持（详见下文「使用 Ozone 调试」），但无法保证稳定工作。

## 二、软件下载与安装

::: warning 注意
安装路径不要含有中文，最好只含有字母、数字、`-` 与 `_`。
:::

| 软件 | 版本要求 | 说明 |
| --- | --- | --- |
| STM32CubeMX | ≥ 6.11 | 官网下载安装，运行需要 Java 支持 |
| Visual Studio Code | 最新版 | 官网下载安装 |
| CMake | ≥ 3.22 | 官网下载安装 |
| Ninja | — | 下载 `ninja-win.zip`，解压即可 |
| GNU Arm Embedded Toolchain | ≥ 11.0 | 官网下载压缩包，选择 `mingw-w64-i686` 版本，自行解压 |
| J-Link | — | 官网下载安装，附带 J-Link RTT、J-Link GDB Server 等工具 |
| Ozone | V3.26 | J-Link 官网 Ozone 分区下载安装（见下注） |
| OpenOCD | 可选 | 预构建版本（Windows）下载解压，路径名不可包含空格 |
| VOFA+ | 可选 | 串口助手，可显示浮点波形 |
| MobaXTerm | 可选 | 调试终端 |

> Ozone 建议选择 **V3.26** 版本，便于后续替换同时支持 J-Link 和 CMSIS-DAP 的驱动文件后正常运行。

## 三、环境变量配置

1. Windows 搜索「环境变量」→ 编辑系统环境变量 → 环境变量 → **Path（系统变量）** → 编辑 → 新建
2. 添加以下目录：
   - `arm-none-eabi` 安装目录下的 `bin`
   - `OpenOCD`（可选）安装目录下的 `bin`
   - `ninja.exe` 所在文件夹

在终端测试是否安装成功：

```bash
ninja --version
arm-none-eabi-gcc -v
openocd -v
```

## 四、VS Code 扩展

在 VS Code 中安装以下扩展：

- **C/C++**（必须）
- **CMake**（必须）
- **CMake Tools**（必须）
- **koroFileHeader**（可选，生成源码文件模板，配置请参考编程风格指南）
- **Cortex-Debug**（可选，用于 GDB 调试）

## 五、STM32CubeMX 生成工程

工程配置方法请参考其他教程。生成工程时注意两点：

1. `Project Manager → Project → Toolchain/IDE` 选择 **CMake**
2. 勾选 **Generate Under Root**

然后点击右上角 **GENERATE CODE** 生成代码。

## 六、用 VS Code 打开工程

用 VS Code 打开工程文件夹，目录结构如下：

| 文件 / 目录 | 说明 |
| --- | --- |
| `.mxproject` | 可删去 |
| `CMakeLists.txt` | 删去，后续换为提供的模板 |
| `*.ld` | 链接脚本，规定设备内存相关信息 |
| `Core/` `Drivers/` | CubeMX 按模板生成的文件，除 `Core/Src/main.c` 外一般不做改动 |
| `cmake/` | CubeMX 根据 STM32 型号生成的 cmake 配置文件 |
| `CMakePresets.json` | cmake 的预先配置 |

::: warning 注意事项
若原 Toolchain/IDE 选择为 STM32CubeIDE、后改为 CMake 的工程，需检查 `Core/` 文件夹下是否存在 `Startup/` 文件夹，存在则需删去。
:::

在工程根目录添加子目录和文件，在 VS Code 中编辑即可。

> 若开发工程与战队相关、需要队内共享或合作或开源，请遵循文件组织规范、代码架构规范和风格指南。

常用快捷键：

| 快捷键 | 作用 |
| --- | --- |
| `Ctrl + Shift + P` | 命令面板 |
| `Ctrl + P` | 快速打开文件 |
| `Ctrl + Tab` | 切换标签页 |
| `Ctrl + ,` | 打开设置 |
| `Ctrl + F` / `Ctrl + Shift + F` | 文件内 / 全局搜索 |
| `Alt + ←/→` | 前进 / 后退 |
| `Alt + ↑/↓` | 上下移动行 |
| `Shift + Alt + F` | 格式化代码 |
| `F2` | 重命名符号 |

更多快捷键通过 `Ctrl + K, Ctrl + S` 唤出。

## 七、配置 CMake 工程

1. 添加 `CMakeLists.txt` 模板（见文末附录）至工程根目录，修改模板中的 TODO，主要包括：
   - 工程名
   - 用户使用的文件夹（`user_folders`）
   - 队伍组件所在文件夹（`HWC_DIR`）
   - 组件内部默认配置的重写
   - 添加个人的 `*.cmake` 文件
2. 运行配置，任选其一：
   - 更改构建类型来运行配置
   - 修改 `CMakeLists.txt` 并保存，将自动配置
   - 命令面板运行 **CMake: Configure**
   - 尚未配置时直接运行 build（其中包含配置步骤）
   - 命令行：
     ```bash
     mkdir build
     cd build
     cmake ..
     ```

配置成功后会输出类似信息。

::: warning 注意
- 若更改 `CMakeLists.txt` 中的 `option`、`set` 等，运行配置并不会更新选项，此时需要删除 `build` 目录重新配置。
- 最新版 CubeMX 与低版本 CubeMX 所用的 `CMakeLists.txt` 不同，注意注释中的 TODO。
:::

在工程根目录添加、删除或重命名子目录和文件，可直接在 Windows 资源管理器或 VS Code 资源管理器中操作。

## 八、构建工程

三种方式任选：

- 命令面板运行 **CMake: Build**（快捷键 `F7`）
- 点击状态栏中的 **Build**
- 命令行（`-jn` 指定 n 线程编译，如 `-j10`）：
  ```bash
  cd build
  make -j
  ```

构建成功后，默认情况下 CMake 工具将构建输出写入 `build/` 子目录，可找到调试所需的 `.elf` 文件。

## 九、使用 Ozone 调试

### 让 Ozone 同时支持 J-Link 与 CMSIS-DAP

Ozone 官方仅支持 J-Link。通过以下方式，可让 Ozone V3.26 及之前的 V3.xx 版本同时支持 J-Link 和 CMSIS-DAP：

1. 安装 Ozone 后，将安装目录下的 `JLink_x64.dll` 文件替换为破解版本（下载地址见队内原文档）。
2. 使用 CMSIS-DAP 调试时，Ozone 会弹窗提示设备没有 License；此问题可通过在 J-Link License Manager 注册解决。
3. 连接好 CMSIS-DAP 调试器，用 New Project Wizard 新建工程，读取调试器序列号。
4. 下载 J-Link / J-Flash 注册机（下载地址见队内原文档），将序列号输入注册机生成 License。
5. 打开 J-Link License Manager（已与 J-Link 捆绑安装），添加生成的 License。

### 创建项目

1. 添加对应 `*.svd` 文件（CMSIS SVD，系统视图描述文件，可选）至工程根目录，以支持查看外设信息。
2. 进入 Ozone，`File → New → New Project Wizard`：
   - 选择目标开发板对应的 **Device**（如 `STM32F407IG`）、**Register Set**（如 `Cortex-M4 (with FPU)`）；**Peripherals**（可选）选择对应的 `.svd` 文件 → Next
   - **Target Interface = SWD**，**Target Interface Speed = 4MHz**（默认或合适速率），**Host Interface = USB**；连接多个调试器时选择需要使用的那个 → Next
   - 选择要调试的可执行文件（如 `.elf`）→ Next
   - 无特殊要求，其他选项保持默认
3. `File → Save Project as`，将 `.jdebug` 调试文件保存至工程根目录。

### 下载调试

- 点击左上角绿色图标，下载并复位程序；点击工具栏按钮进行调试。
- 操作和一般调试器类似：运行、复位、单步运行、打断点。

::: warning 注意
使用 CMSIS-DAP 时，若要退出调试，请勿直接点击关闭（否则会导致闪退，目前尚未解决）；这个问题不影响调试，一般点击「运行 / 停止 / 复位」按钮组合即可。使用 J-Link 则一切功能正常。
:::

### 常用窗口（View 标签下）

| 窗口 | 作用 |
| --- | --- |
| Call Stack | 查看调用栈 |
| Global Data / Local Data | 程序暂停时更新全局 / 局部变量 |
| Register | 查看外设信息 |
| Watched Data | 实时更新变量，右键可设定刷新频率 |
| Data Sampling | 实时采集数据，配合 Timeline 实现波形可视化，可导出 `.csv` |
| Source Files | 展示工程源文件，方便断点调试 |

- 右键快捷菜单可将变量添加到窗口。
- 若需编辑源码，建议在 VS Code 中修改编译，无需退出调试，Ozone 会自动检测并提示重新加载可执行文件。

### J-Link RTT（Real Time Transfer）

J-Link RTT 基于调试器建立主机和目标开发板之间的**非侵入式交互**，需目标开发板中调用接口编写对应程序处理交互信息。

- 开启 Ozone 内置的 Terminal 窗口，可接收日志或作为终端执行在线调试；也可用其他软件建立多个终端。
- RTT 不占用开发板串口资源。相关信息参考官方 Wiki 或 Ozone 安装目录下的 `UM08025_Ozone.pdf` 手册。

## 附录：CMakeLists 模板

```cmake
# ##############################################################################
# #################   CMake Template (CUSTOM)   #################################
# #################   Copyright (c) 2026 Hello World   #########################
# ##############################################################################

# Set the system name and version
set(CMAKE_SYSTEM_VERSION 1)

# Specify the minimum required version of CMake
cmake_minimum_required(VERSION 3.22)
include("cmake/gcc-arm-none-eabi.cmake")

# Set the C++ and C standards
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS ON)
set(CMAKE_C_STANDARD 11)
set(CMAKE_C_STANDARD_REQUIRED ON)
set(CMAKE_C_EXTENSIONS ON)

# Set the library path
set(CMAKE_LIBRARY_PATH "${CMAKE_CURRENT_SOURCE_DIR}/Lib")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/build)

# ########################## USER CONFIG SECTION ##############################
# Set the project name and the languages used
project(project C CXX ASM) # TODO: change project name here

# Specify user folders
set(user_folders "Tasks") # TODO Add your own user folders here

# Specify the path to the HW-Components directory
# set(HWC_DIR "HW-Components") # TODO: Set your own HW-Components path here
# # Include utility functions and default configuration
# include("${HWC_DIR}/cmake/utils/function_tools.cmake")
# include("${HWC_DIR}/config.cmake") # Default configuration
# TODO: Overwrite default configuration instead of changing it in file

# tools
# set(use_hwcomponents_tools ON)
# set(use_prebuilt_hwcomponents_tools OFF)
# set(... ON)
# TODO: Add your own `config.cmake` file or set your own configuration here

# Enable preprocessing for assembler files
add_compile_options($<$<COMPILE_LANGUAGE:ASM>:-x$<SEMICOLON>assembler-with-cpp>)

# Disable some warnings
set(COM_FLAGS "-Wno-unused-parameter -Wno-missing-field-initializers -Wno-pedantic -Wno-unknown-pragmas -Wno-comment")
set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} ${COM_FLAGS}")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} ${COM_FLAGS} -Wno-reorder")

## ADD_FUNCTIONS
function(search_incs_recurse root_dir res_list)
    get_filename_component(root_name ${root_dir} NAME)
    set(_${root_name}_incs ${root_dir})
    file(GLOB children RELATIVE ${root_dir} ${root_dir}/*)
    foreach(child ${children})
        set(sub_dir ${root_dir}/${child})
        if(IS_DIRECTORY ${sub_dir})
            get_filename_component(child_name ${child} NAME)
            set(__${child_name}_incs)
            search_incs_recurse(${sub_dir} __${child_name}_incs)
            list(APPEND _${root_name}_incs ${__${child_name}_incs})
        endif()
    endforeach()
    set(${res_list} ${_${root_name}_incs} PARENT_SCOPE)
    return()
endfunction()

# #################### ADD LIBRARIES AND EXECUTABLE SECTION ####################
# Initialize source and include lists
set(project_srcs)
set(project_incs)

# Search for include files and source files in the Core directory
search_incs_recurse("${CMAKE_CURRENT_SOURCE_DIR}/Core" core_incs)
file(GLOB_RECURSE core_srcs "Core/*.*")
# 排除所有形如 system_stm32*.c 的文件，提升通用性
# TODO: 若使用低版本的 cubemx，需要将这两行注释掉
file(GLOB EXCLUDE_SYSTEM_SRC_FILES "${CMAKE_CURRENT_SOURCE_DIR}/Core/Src/system_stm32*.c")
list(REMOVE_ITEM core_srcs ${EXCLUDE_SYSTEM_SRC_FILES})
list(APPEND project_srcs ${core_srcs})
list(APPEND project_incs ${core_incs})

# Search for include files and source files in the Drivers directory
search_incs_recurse("${CMAKE_CURRENT_SOURCE_DIR}/Drivers" drivers_incs)
file(GLOB_RECURSE drivers_srcs "Drivers/*.*")
list(APPEND project_incs ${drivers_incs})

# For each user folder, search for include files and source files
foreach(user_folder ${user_folders})
    search_incs_recurse("${CMAKE_CURRENT_SOURCE_DIR}/${user_folder}" ${user_folder}_incs)
    file(GLOB_RECURSE ${user_folder}_srcs "${user_folder}/*.*")
    list(APPEND project_incs ${${user_folder}_incs})
    list(APPEND project_srcs ${${user_folder}_srcs})
endforeach()

# Add a static library for the drivers
add_library(drivers ${drivers_srcs})
target_include_directories(drivers ${core_incs} ${drivers_incs})

# Add an executable for the project
file(GLOB_RECURSE startup_file "*.s")
add_executable(${PROJECT_NAME} ${project_srcs} ${startup_file})
message(STATUS "Project name: ${PROJECT_NAME}")
add_subdirectory(cmake/stm32cubemx)
get_target_property(STM32_COMPILE_DEFINES stm32cubemx INTERFACE_COMPILE_DEFINITIONS)
list(APPEND STM32_COMPILE_DEFINES DEBUG) # Add DEBUG definition
foreach(STM32_COMPILE_DEFINE ${STM32_COMPILE_DEFINES})
    # Exclude the element if it starts with "$"
    if(STM32_COMPILE_DEFINE MATCHES "^\\$")
        continue()
    endif()
    add_definitions(-D${STM32_COMPILE_DEFINE})

    # Get HAL filename
    if(STM32_COMPILE_DEFINE MATCHES "STM32[A-Z][0-9]")
        string(SUBSTRING ${STM32_COMPILE_DEFINE} 0 7 STM32_DEVICE)
        string(TOLOWER ${STM32_DEVICE} stm32_hal_filename)
        string(CONCAT stm32_hal_filename ${stm32_hal_filename} "xx_hal.h")
        message(STATUS "HAL file name: ${stm32_hal_filename}")
        # Set macro for the HAL filename
        add_definitions(-DSTM32_HAL_FILENAME="${stm32_hal_filename}")
    endif()
endforeach()

# Add the HW-Components directory as a subdirectory
# add_subdirectory(${HWC_DIR})

# Add the project includes to the executable
target_include_directories(${PROJECT_NAME} ${project_incs})
target_include_directories(${PROJECT_NAME} ${${HWC_LIB_PREFIX}_incs})

# Link the drivers library and the HW-Components library to the executable
target_link_libraries(${PROJECT_NAME} drivers)
target_link_libraries(${PROJECT_NAME} ${${HWC_LIB_PREFIX}_libs})

# Define the output hex and bin files
set(HEX_FILE ${PROJECT_BINARY_DIR}/${PROJECT_NAME}.hex)
set(BIN_FILE ${PROJECT_BINARY_DIR}/${PROJECT_NAME}.bin)

# Add a post-build command to generate the hex and bin files
add_custom_command(
    TARGET ${PROJECT_NAME}
    POST_BUILD
    COMMAND ${CMAKE_OBJCOPY} -Oihex $<TARGET_FILE:${PROJECT_NAME}> ${HEX_FILE}
    COMMAND ${CMAKE_OBJCOPY} -Obinary $<TARGET_FILE:${PROJECT_NAME}> ${BIN_FILE}
    COMMENT "Building ${HEX_FILE} Building ${BIN_FILE}")
```

## 参考资料

- 薛东来. CubeMX + VSCode + Ozone 配置 STM32 开发环境.
- [STM32CubeMX 官网](https://www.st.com/en/development-tools/stm32cubemx.html)
- [CMake 官网](https://cmake.org/)
- [SEGGER Ozone 官网](https://www.segger.com/products/development-tools/ozone-j-link-debugger/)
- [OpenOCD 官网](https://openocd.org/)
- [Cortex-Debug Wiki](https://github.com/Marus/cortex-debug/wiki)
