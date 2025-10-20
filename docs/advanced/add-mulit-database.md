---
lang: zh-cn
title: 添加多数据库连接
---
::: Warning 注意：

在这一节开始前，我们默认屏幕前的你具有数据库操作的基本知识，清楚如何将 `SQLite` 数据库的数据迁移至其他数据库，你也清楚如何部署自己需要的 `MySQL` 或 `PostgreSQL` 数据库服务端。

另外，我们本节亦假设，你的确存在需要使用除 `SQLite` 以外的数据库（例如海豹已经适配的 `PostgreSQL` 或 `MySQL`）的情况，你才会需要这一节的内容，否则，本节内容无法帮助到你。

因此，本节内容不包含任何从 `SQLite` 迁移数据或部署 `MySQL` 或 `PostgreSQL` 数据库服务端的内容。如有需要，请自行学习。

:::

::: info 本节内容

本节将展示如何将海豹数据库对接至 `MySQL` 与 `PostgreSQL` 数据库

:::

从 <Badge type="tip" text="v1.5.0"/> 起，海豹支持了多数据库的实现，海豹可以使用 `MySQL` 或 `PostgreSQL` 数据库作为软件的数据库。

在进行连接之前，你应该已经部署好了 `MySQL` 或 `PostgreSQL` 数据库服务端，并且已经创建好了可供海豹读取的数据库实例并将可能存在的原 SQLite 数据库中的数据库迁移至这个新的数据库实例中。

接下来，你可以在 `sealdice-core.exe` 文件的同级目录下，创建一个 `.env` 文件，用于配置海豹数据库的连接。

如果你使用的是 `MySQL` 数据库，你需要按照如下格式进行配置 :

``` .env
DB_TYPE=mysql
DB_DSN="root:root@tcp(127.0.0.1:3306)/yourdatabase?charset=utf8mb4&parseTime=True&loc=Local"

```

注意，这里的 `yourdatabase` 应替换为你实际创建的数据库实例名称，`root:root`应替换为你实际的数据库用户名与密码，`127.0.0.1:3306` 应替换为你实际的数据库服务端地址与端口。

如果你使用的是 `PostgreSQL` 数据库，你需要按照如下格式进行配置 :

``` .env
DB_TYPE=postgres
DB_DSN="postgres://postgres:youruserpasswd@localhost:5432/yourdatabasename?sslmode=disable"

```

注意，这里的 `youruserpasswd` 应替换为你实际创建的数据库密码，`localhost:5432` 应替换为你实际的数据库服务端地址与端口，`yourdatabasename` 应替换为你实际创建的数据库实例名称。

配置完成后，保持数据库服务运行，双击启动海豹，如果连接正确，你的海豹核心应当会成功运行，并在 WebUI 输出类似以下的信息：

``` WebUI
INFO 当前选择使用: POSTGRESQL数据库   // 对接PostgreSQL数据库的情况

INFO 当前选择使用: MYSQL数据库   // 对接MySQL数据库的情况

// 一般两个情况只会出现一个

```
