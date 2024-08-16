---
lang: zh-cn
title: 其它归档内容
---

# 其它归档内容

## Go-cqhttp / Mirai

::: warning 注意：海豹已于 <Badge type="warning" text="v1.4.5"/> 版本弃用此方案，以下内容归档于 2024 年 5 月 7 日。

:::

::: danger 危险：此方案已经接近不可用

由于 QQ 官方的检测，使用 Go-cqhttp 方案成功连接的成功率已经越来越低。即使成功连接，也可能面临高达每月 2 次的频繁冻结等情况。

我们不推荐任何用户再使用此方案连接 QQ 平台。

:::

::: danger 危险：Go-cqhttp 已停止维护

Go-cqhttp 的开发者已无力维护项目（见 [go-cqhttp/issue#2471](https://github.com/Mrs4s/go-cqhttp/issues/2471)）。在未来 qsign 签名服务彻底被官方封死之后，Go-cqhttp 将无法继续使用。

:::

### 使用签名服务

::: danger 危险：qsign 已停止维护

原 qsign 作者已因「不可抗力」无法再维护此项目，对应原代码仓库也已删除，该方法会在未来逐渐失效，请做好预期准备。

:::

部署签名服务，即使用开源签名服务 [qsign](https://github.com/fuqiuluo/unidbg-fetch-qsign)，是目前用来绕过检测的最有效手段。

#### 怎么使用签名服务？

你可以自己在本地搭一个 qsign 服务，也可以使用别人搭好的。

::: warning 注意：自行搭建签名服务

如果你的动手能力足够强或者有足够的电脑知识，**强烈推荐** 自己搭建本地签名服务器。

使用他人的签名服务可能会泄漏以下信息 *（截取自 qsign 的说明）*：

> - 登录账号
> - 登录时间
> - 登录后发送的消息内容
> - 登录后发送消息的群号/好友 ID

不会泄露的信息：

> - 账号密码
> - 账号 `session`
> - 群列表/好友列表
> - 接收的消息
> - 除发送消息外的任何历史记录

使用共享签名服务可能会提高账号被封禁的概率。

:::

在登录账号的时候会看到这样一个界面：

<img src="./images/platform-qq-qsign-1.png" alt="海豹的 qq 登录页" width="65%">

点击下面的「签名服务」一栏的「简易配置」，可以看到如下配置项：

<img src="./images/platform-qq-qsign-2.png" alt="配置签名服务" width="65%">

- 服务 url：你要链接的 qsign url
- 服务 key：密码
- 服务鉴权：默认为空，如果有的服务器要求特定的鉴权，就填上吧

::: tip 提示：默认的 qsign 配置

没有特殊设置的话，qsign 的 url 通常默认为 `http://localhost:13579`，key 通常默认为 `114514`。

:::

#### 如何搭建签名服务

::: tip 提示：有能力的用户可以自行搭建服务。
:::

::: warning

由于项目的特殊性，下面的方法随时可能失效，我们不对信息的及时性做任何保证。可以加入海豹官方群寻求帮助。

:::

::: tabs key:os

== Windows

可以尝试使用 [一键 qsign](https://github.com/rhwong/unidbg-fetch-qsign-onekey)。

引用自说明：
> 点开以后删掉文件夹里的 `go-cqhttp.bat` 及 `go-cqhttp_windows_386.exe`，然后运行里面的 `Start_Qsign.bat` 启动 qsign，按照提示依次键入 `txlib_version` 参数、设定 `host`、`port`、`key`的值。（如果不知道这些是干什么的，请直接依次按下 Enter）

== Linux

参阅 qsign 提供的完整教程，看 [这里](https://github.com/fuqiuluo/unidbg-fetch-qsign/wiki/%E9%83%A8%E7%BD%B2%E5%9C%A8Linux)。

== MacOS

可以尝试使用 [AutoQSignForMac](https://github.com/Verplitic/AutoQSignForMac)。

在终端运行 `start.sh` 即可配置和启动签名服务器。如果提示 `zsh: access denied`，需要先运行 `chmod -x start.sh` 来给予权限。

初次启动会选择 txlib 版本，及运行 QSign 的主机、端口和 API Key。通常情况下，可以回车跳过而使用默认配置。

:::

### 手动抓取 ticket

目前，Gocq 的过验证码网站已经停止服务，你需要自行抓取 ticket 进行登录。

步骤如下：

#### 前置工作

启动海豹，打开海豹的管理 ui，账号设置，添加账号；

账号类型选 QQ 账号，设备选「Android Pad-可共存」（此协议登录手机可同时在线，qsign 仅 Android 协议和 Android Pad 协议可用）：

![添加账号](./images/select-account.png)

版本选择 8.9.70（如果你的 qsign 是其它版本，请选择对应版本）：

![选择 qsign 版本](./images/qsign-version.png)

填写 QQ 账号密码：

![填写 QQ 账号密码](./images/qq-account-and-pass.png)

选择简易配置：

![选择简易配置](./images/qsign-select.png)

服务 url 填你的 qsign 服务地址。

服务 key 填你的 qsign 服务密码，没有可以不填。

服务鉴权不填写。

![服务鉴权](./images/qsign-config.png)

接着点击登录，然后退出海豹（结束进程）。

#### 分离部署登录流程

1. 将 `go-cqhttp\go-cqhttp.exe` 文件复制到 `海豹目录/data/default/extra/gocqQQ号(你登录骰娘的qq号)` 这个文件夹下。

   ![文件夹结构](./images/gocq-folder.png)

2. 双击运行 `go-cqhttp.exe`，两次确认后出现 `go-cqhttp.bat` 文件。

   ![运行警告 1](./images/gocq-warn1.png) ![运行警告 2](./images/gocq-warn2.png)

3. 双击运行 `go-cqhttp.bat`，出现以下消息后输入 `2`，回车，复制链接到浏览器（终端选中后右键即可复制粘贴，没有选项）。

   ![运行](./images/gocq-step1.png)

   ::: tip 提示：出现 `open image cache db failed`

   出现该报错的原因很可能是因为 gocq 的缓存数据库损坏，可以尝试删除 gocq 的 data 目录后重新运行 gocq。（注意是 gocq 的 data 而不是海豹的！）

   :::

4. 按照 [手动抓取 ticket 教程 - 哔哩哔哩](https://b23.tv/GRGg4GR) 视频教程操作，成功滑条后（需要抓 ticket，不只是滑条）复制 ticket 到终端后回车。

   ![滑块 ticket 输入](./images/gocq-step2.png)

5. 如果登录成功，你应当能看到一条类似于 `2022-05-06 20:00:00 [INFO] 登录成功，欢迎使用：XXX` 的日志。

   ![登录成功](./images/gocq-success.png)

   同时你应当在下方看到一条类似于 `2022-05-06 20:00:00 [INFO] CQ Websocket 服务器已启动：[::]:8080` 的日志。

   结尾的 `8080` 即为 gocq 的 ws 端口。你的端口号可能不同，总之请记住这个端口号。

6. 打开海豹，删除之前添加的账号，然后重新添加账号，选择 QQ(OneBot11 分离部署)

   ![添加账号](./images/onebot11.png)

   在连接地址中填写 `ws://localhost:8080`（请把`8080`替换为你的 gocq 端口号）。填写完成后点击下一步。
7. 你的账号应当已经成功连接。

   ![连接成功](./images/onebot11-success.png)

### GoCqhttp FAQ

#### 1. 出现 Code 1

1. 账号密码错误，输入正确的账号密码。

#### 2. QSign 闪退

1. 确认没有启动多个 qsign（多个 qsign 需要端口不重复）；
2. 确认端口没有重复。若重复，请重新配置 qsign，修改 port；
3. 将 qsign 文件夹放到硬盘根目录试试（如 D 盘、C 盘）。

#### 3. 出现 Code 45

1. 没连上 qsign，重启 qsign，重新登录；
2. QSign 协议版本和 gocq 协议版本没对应，切换对应协议后重新登录；
3. 该版本 qsign 已失效，升级版本。

#### 4. 出现 Code 235

1. Ticket 复制错误（多复制了 `""` 或少复制了内容），重新登录；
2. 更换网络进行滑条，如电脑连手机热点，复制链接发给手机滑条，换台电脑等；
3. 登录频繁，过段时间重新尝试登录（时间不确定）。

#### 5. 出现 Code 237

1. 登录过于频繁，请等待一段时间继续；
2. 内置的 ticket 抓取工具失效，需要手动抓取；
3. 让他人帮助你滑条。

#### 5. 如何启动多个 qsign？（仅当需要备用签名或不同协议版本的时候有此需求）

解压一个新的 qsign 文件，重新配置，端口需要输入不同于前面的端口。

#### 6. 什么是 go-cqhttp？（通常简称 gocq）

登录 QQ 的程序，现各大骰系都用此程序，此外还有 mirai 等其他程序。

#### 7. 什么是签名？

- 手机 QQ 有内置的签名程序，可以不太准确的简单理解为会生成一些密码发给腾讯，让它识别是不是人；
- qsign 把手机 QQ 的签名程序偷了出来，提供了让我们自己生成密码的功能；
- gocq 在配置后可以对接 qsign，那样骰子也可以证明自己是正常人了。

#### 8. 对于 SignServer（即 Start_Qsign.bat，俗称签名服务器）崩溃闪退可能的一种情况

通常 SignServer 都不会出现用户可直接读出的报错信息。如果出现了崩溃或闪退的情况，可以同时按下键盘上 `Ctrl` `Alt` `Delete` 这三个按键，找到任务管理器，在右上角的`内存`一栏，那里会出现数字，有些调过设置了的会出现占用的运行内存占可用运行内存的百分比。

很显然，这里的内存就是指**电脑 CPU 的可用运行内存不足**，这时候通过在任务管理器关闭部分没有在使用的进程就可以解决。

::: warning 注意：进程不能轻易关闭

通常情况下，Windows 系统会运行一些进程以保证系统的正常运行。这些进程一旦关闭，系统可能会出现无法运行的问题。

在一般情况下，不推荐关闭这些进程。如果需要通过关闭进程来腾出运行内存，可以选择关闭其他应用程序运行的进程。

当然，关闭应用进程跟直接退出应用程序差别不大。对于在看这个界面的你来说，关闭应用程序是更好的选择。

:::

## Chronocat Red 协议

::: warning 注意：海豹已于 <Badge type="warning" text="v1.4.5"/> 版本弃用此方案，以下内容归档于 2024 年 5 月 7 日。

:::

::: danger 危险：支持 Chronocat 为 0.0.54

海豹 Red 协议所适配的目标 Chronocat 版本为 0.0.54，低于该版本（主要为 0.0.52）缺少必要接口，使用时会出现报错，不建议使用。

:::

在账号添加中，选择「QQ Red 协议」，填写相应信息进行连接。

## Shamrock <Badge type="tip" text="v1.4.2" />

::: warning 注意：已发现 QQ 客户端针对 Shamrock 增加了检测机制。在新版 QQ 客户端上，Shamrock 已无法使用。以下内容归档于 2024 年 7 月 17 日。

:::

海豹从 <Badge type="tip" text="v1.4.2"/> 开始适配了 Shamrock 的连接。

::: danger 危险：Shamrock 已停止更新

Shamrock 已于 2024 年 4 月 20 日归档，将不再进行更新。

:::

::: danger 危险：`1.1.0` 及以上版本的 Shamrock 不适用以下教程

2024 年 4 月 2 日，OpenShamrock 开发组于 [Discussion#272](https://github.com/whitechi73/OpenShamrock/discussions/272#discussion-6300354) 宣布，Shamrock 将会从 `1.1.0` 版本起弃用 OneBot V11 支持，迁移至新的 [Kritor](https://github.com/KarinJS/kritor) 协议。

**这意味着 `1.1.0` 及之后版本的 Shamrock 将不再支持 OneBot V11，以下教程也不再适用**。请仔细分辨，以免造成麻烦。

海豹开发组也正在着手对新的 Kritor 协议进行适配，请耐心等待。

:::

::: warning 注意：有难度的操作

此方式存在一定难度，你可能需要对 Root，使用命令行程序等有所了解。

:::

::: info Shamrock

[Shamrock](https://whitechi73.github.io/OpenShamrock/) 是一个基于 [LSPosed](https://github.com/LSPosed/LSPosed)/Xposed 框架，实现劫持 QQ 以对外暴露 Onebot Api 的软件。你可以在 Android 手机/模拟器中使用 Shamrock 代替已经停止开发的 gocq。

遗憾的是，Shamrock 的使用依赖于 Android 的 root 权限，而手机厂商对 root 管控愈加严格，实体手机获取 root 权限的门槛很高，而模拟器中使用 Shamrock 的效果也不是很可观。因此，这种解决方案适合个人与朋友使用骰子的场景。

此外，如果你想使用 Shamrock 代替 gocq，请确保你有良好的计算机使用能力。

本节主要讲解如何使用模拟器实现 Shamrock，如果你有一台已经 root 的手机，也可以参考本节内容，**本教程不涉及说明如何 root 手机**，海豹官方也不对 root 手机造成的后果负责，请自行斟酌。

:::

::: tip 提示：如何 Root 手机

Root 手机可以参阅 [小米手机安装面具教程](https://magiskcn.com)。也可以前往 [酷安](https://www.coolapk.com/) 寻找更详细的教程。

:::

::: warning 注意：低配置设备可能无法使用 Shamrock！

在尝试通过模拟器使用 Shamrock 的场景下，由于模拟器对性能要求较高，包括 **轻量级服务器**、旧电脑、小主机等配置较低的设备可能无法支持使用。

:::

### 准备模拟器

下面将使用 [夜神模拟器](https://www.yeshen.com/) 作为示例。

使用时，确保安卓版本在安卓 8 以上，而在安卓 11 以下，最好使用安卓 9。

### 获取 Root 权限

::: info Magisk

Magisk（面具）是一套开源的 Android 自定义工具，通常用于获取 root 权限。

Root 即 Android 的超级用户权限，如对 QQ 应用进行注入等的危险操作需要 root 权限。

:::

*在使用之前，请在模拟器设置中打开 root 选项，软件中获取的一切权限都给予 **通过**，包括 **root 权限**。*

使用 [面具安装工具](https://cowtransfer.com/s/9794ead1113d47)，把它安装到模拟器。

然后启动软件，输入 `m` 回车，再输入 `y` 回车，会索取超级用户权限，给予，然后输入 `1` 回车，再输入 `a` 回车，输入 `1` 回车，此时面具就安装到你的模拟器上了。

打开面具模块，此时面具会索取超级用户权限，给予，此时你会发现你的超级用户权限那里是灰的，**关闭你的超级用户权限**，重新启动你的模拟器。

**此时你会发现你的超级用户模块已经激活**。在面具的设置里启动 `zygisk` 模块，随后你需要再次重启模拟器，使得 `zygisk` 模块生效。

![启用 zygisk](./images/platform-qq-shamrock-1.png)

### 安装 LSPosed 模块

::: tip 提示：使用 xposed/edxposed

理论上，使用更为老旧的 xposed/edxposed 或在手机上运行虚拟机的 virtualXposed 的方案也是可行的，但我们不推荐也未尝试过使用它们。

**任何不按教程的行动请自行处理疑难问题**，海豹官方不对此提供帮助。

:::

请于 [LSPosed Releases](https://github.com/LSPosed/LSPosed/releases) 页下载模块。

::: warning 注意：zygisk

**务必**选择以 `zygisk` 结尾的包。

:::

下载完成后，把文件上传到模拟器中。一般情况下，直接把文件拖动到模拟器就可以传文件了，且文件一般在 `picture` 文件夹中，如果没有请参照你使用的模拟器说明。

在你传完文件之后，在最右侧切换到「模块」页后，你可以看到从本地安装的选项。单击你刚刚传到模拟器里的文件，等待安装完成即可，随后你可以在右下角看到重启按钮，点击等待重启。

安装完成后应该如下所示：

![完成 LSPosed 模块安装](./images/platform-qq-shamrock-2.png)

### 安装 Shamrock

请于 [Shamrock Releases](https://github.com/whitechi73/OpenShamrock/actions/workflows/build-apk.yml) 下载 Shamrock 的 apk 安装包，直接将 apk 文件拖动到模拟器即可进行安装。

如果模拟器中没有安装 QQ，此时你还需要将 [QQ](https://im.qq.com) 安装到模拟器中。

安装完成后，**首先启动 Shamrock**。在通知上，你可以打开 LSPosed 的页面，在**模块一栏中启用 Shamrock**。

![启用 Shamrock](./images/platform-qq-shamrock-3.png)

选中 Shamrock，进入勾选 QQ，并长按 QQ 选择 **强行停止**。

![Shamrock 中勾选 QQ](./images/platform-qq-shamrock-4.png)

随后再打开 QQ，你可以看到「加载 Shamrock 库成功」的提示，这代表 Shamrock 已经成功注入了 QQ。

成功注入后，打开 Shamrock 启用 ws 服务，通常情况下无需修改 Shamrock 的任何内容，如有其它需求请阅读 [Shamrock 文档](https://whitechi73.github.io/OpenShamrock/)。

![Shamrock 启用 ws](./images/platform-qq-shamrock-5.png)

### 开放模拟器端口供海豹对接

首先下载 [adb](https://developer.android.google.cn/studio/releases/platform-tools?hl=zh-cn) 工具，解压到电脑中任何可用的位置。

随后找到模拟器供 adb 连接的端口，夜神模拟器路径示例如下：

![夜神模拟器 adb 端口](./images/platform-qq-shamrock-6.png)

其中：

- `Nox` 是模拟器根路径。
- `Nox_4` 是模拟器的编号，你可以在多开助手中看到你的编号。
- 选中的文件就是要找的文件，在 vscode 中（或者其它文本编辑器）中打开。

![打开 `Nox_4.vbox`](./images/platform-qq-shamrock-7.png)

`guestport` 值为 `5555` 的 `hostport` 即为所需端口，如示例中就是 **62028**，记住这个端口号。

在你解压的 `platform-tools` 里打开终端，或者把 `platform-tools` 加入环境变量后再启用终端。也可以在 `platform-tools` 里新建一个 `.bat` 文件，把下面的命令写到文件里面。

在打开的终端中输入命令：

```cmd
.\adb connect 127.0.0.1:端口
```

如替换为上面示例中的 **62828**:

```cmd
.\adb connect 127.0.0.1:62028
```

随后再执行：

```cmd
.\adb forward tcp:5800 tcp:5800
```

此时你已经成功开启端口了。

![执行 adb 命令](./images/platform-qq-shamrock-8.png)

### 连接海豹

在账号添加中，选择「QQ(onebot11正向WS)」，按照下面的格式进行填写：

<img src="./images/platform-qq-shamrock-9.png" alt="连接 Shamrock" width="100%">

成功连接后即可使用。

## Shamrock LSPatch <Badge type="tip" text="v1.4.2" />

::: warning 注意：已发现 QQ 客户端针对 Shamrock 增加了检测机制。在新版 QQ 客户端上，Shamrock 已无法使用。以下内容归档于 2024 年 7 月 17 日。

:::

::: warning 注意：有难度的操作

此方式存在一定难度，你可能需要对使用命令行程序有所了解。

:::

::: warning 注意：Andriod 版本要求

由于 LSPatch 要求安卓版本 9.0 以上，因此你的安卓手机版本必须超过安卓 9。

:::

::: info LSPatch

LSPatch 是在无 root 环境下使用 Shamrock 的一种途径，原理是利用 Shizuku 安装经 LSPatch 修补后的 QQ，再使用 Shamrock 劫持 QQ 并对外开放 API。

:::

### 安装 Shizuku

::: info Shizuku

[Shizuku](https://github.com/RikkaApps/Shizuku/releases) 是一个帮助其他应用直接使用系统 API 的应用，而 Shizuku 本身则需要通过电脑使用 adb 工具赋予权限。

Adb 即 [Android 调试桥](https://developer.android.com/studio/command-line/adb?hl=zh-cn)，是安卓官方提供的帮助在电脑端调试 Android 设备的命令行工具。

:::

首先需要在你的手机安装 Shizuku，安装后需要在电脑中使用 adb 命令为其赋予权限。

::: tabs

== Windows

**在 Windows 中使用 cmd 执行 adb 命令：**

1. 安装 adb，工具下载见 [上文](#开放模拟器端口供海豹对接)；
2. 打开 cmd 窗口；
    - 如果你的电脑是 Window 11 操作系统，你可以直接右键 `platform-tools` 文件夹单击 **在此处打开命令行**；
    - 其它版本的打开方式请自行搜索。
3. 你有多种方式使用 adb：

- 将 adb 添加至系统环境变量，在系统开始一栏中可以直接搜索到该功能，随后将 **解压好的** `platform-tools` 路径填入至系统变量中的 `path`，例如，adb 在 `E:/shamrock achieve/platform-tools` 文件夹中，那么你只需要将该路径填入 `path` 即可。
  ![adb path](./images/image-016.png)
  - 如果你是旧版本 Window（如 Win 7），系统未提供对应的 GUI，你需要使用 **`;`** 隔开不同的路径。
- 也可以选择使用 `cd` 命令切换至 adb 目录，使用此方法请将 adb 放在 C 盘；（由于 Windows 权限问题，使用运行开启的 cmd 实例无法访问 C 盘之外的路径。）
  - `win + R` 键启动「运行」；
  - 在运行中输入 `cmd` 并回车；
  - 在打开的黑框框中输入命令 `cd <替换为对应路径>`。
  ![切换到 adb 文件夹](./images/image-017.png)
- 还可以选择在 `platform-tools` 文件夹中新建`.bat` 文件。

:::

在手机中，你需要开启 **USB 调试** ，在手机设置中，选择「更多设置—关于手机」，多次点击软件版本号，即可进入开发者模式。

随后在「更多设置—开发者选项」中打开 **USB 调试**，使用数据线连接电脑和手机，随后在你的手机中出现指纹调试弹框，给予通过。

在电脑中使用命令：

```cmd
adb shell sh /storage/emulated/0/Android/data/moe.shizuku.privileged.api/start.sh
```

![为 Shizuku 赋予 adb 权限](./images/image-018.png)

### 安装 LSPatch

:::info LSPatch

[LSPatch](https://github.com/LSPosed/LSPatch/releases) 可以在无 root 环境使用 LSPosed 框架。

可以参看 [LSPatch 使用教程](https://duzhaokun123.github.io/2022/05/06/simple-lspatch-guide.html) 了解更多。

:::

1. 你需要在 Shizuku 中启用 LSPatch，并重启 Shizuku。
2. 在管理中，单击加号，选择已经下载的 QQ apk 文件，选择本地修补，等待一会，然后就可以安装了。

### 安装并激活 Shamrock

安装方式 [上文](#安装-shamrock) 有提及，此处不予重复。

在 LSPatch 中，长按修补后的 QQ 出现模块作用域，允许 Shamrock 然后重启 LSPatch。

激活 Shamrock 模块有三个前提，即 QQ 进程，Shamrock 进程和 LSPatch 进程存活，请自行配置保活策略，例如允许自启动，允许后台存活和关闭后台高耗电等。

### 对接海豹

首先安装海豹安卓端。

::: warning 注意：确认海豹版本

请使用版本为 1.4.2 以上的安卓端海豹。

:::

建议使用 **反向 ws** 设置。在海豹中，账号添加中选择「QQ(onebot11反向WS)」，填入骰子 QQ 号和要开放的 ws 端口（例如 `:6544`）。

随后在 Shamrock 中的被动 ws 连接地址中写 `ws://localhost:6544/ws`。
