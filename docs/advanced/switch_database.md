---
lang: zh-cn
title: 切换数据库
---

# 切换数据库

::: warning 注意

在阅读这一节时，我们默认你具有数据库相关背景知识。本节仅介绍如何切换海豹核心对接的数据库，不包含任何如何部署数据库等内容。

如果你不了解什么是数据库，那么你大概并不需要关心相关配置，可以直接跳过本节。

此外，切换数据库后如果需要保留原数据，请自行进行数据迁移。

:::

::: info 本节内容

本节将展示如何切换海豹核心对接的数据库。目前支持 `SQLite`（默认）、`MySQL` 以及 `PostgreSQL`。
:::

从 <Badge type="tip" text="v1.5.0"/> 起，海豹支持对接多种数据库，目前可以使用 `SQLite`、`MySQL` 或 `PostgreSQL`。

## 数据库配置

海豹会从启动时的当前工作目录读取 `.env` 文件。常规解压后直接启动时，当前工作目录通常就是 `sealdice-core` 可执行程序所在的目录；通过服务或脚本启动时，请以启动日志中的“当前工作路径”为准。

在该目录中创建或修改 `.env` 文件，配置数据库连接：

::: tabs key:database

== SQLite

```dotenv
DB_TYPE=sqlite
DATADIR="<dir>"
```

- `<dir>`：SQLite 数据文件存放目录，默认为 `./data/default`；相对路径以当前工作目录为基准

== MySQL

```dotenv
DB_TYPE=mysql
DB_DSN="<username>:<password>@tcp(<host>:<port>)/<database>?charset=utf8mb4&parseTime=True&loc=Local"

```

- `<username>`：实际的数据库用户名
- `<password>`：密码
- `<host>:<port>`：实际的数据库服务端地址与端口
- `<database>`：实际的数据库实例名称

== PostgreSQL

```dotenv
DB_TYPE=postgres
DB_DSN="postgres://<username>:<password>@<host>:<port>/<database>?sslmode=disable"

```

- `<username>`：实际的数据库用户名，PostgreSQL 通常为 `postgres`
- `<password>`：实际的数据库密码
- `<host>:<port>`：实际的数据库服务端地址与端口
- `<database>`：实际的数据库实例名称

:::

`DB_TYPE` 的值区分大小写，请按示例填写。若操作系统中已经存在同名环境变量，其值优先于 `.env` 文件中的配置。

配置完成后，重新启动海豹，如果连接正确，你的海豹核心应当会成功运行，并在 WebUI 输出类似以下的信息：

::: tabs key:database

== SQLite

```text
INFO 当前选择使用: SQLITE数据库
```

== MySQL

```text
INFO 当前选择使用: MYSQL数据库
```

== PostgreSQL

```text
INFO 当前选择使用: POSTGRESQL数据库
```

:::

## 数据迁移相关问题

海豹会在当前工作目录的 `upgrade_metadata.json` 中记录已经执行的数据库升级。V150 数据库初始化对应的升级 ID 为 `006_V150UpgradeAttrsMigration`。

如果海豹已经使用原数据库启动过，该升级 ID 通常已经被记录。此时直接切换到一个空的 MySQL 或 PostgreSQL 数据库，核心会认为 V150 升级已经完成，因而跳过其中的数据表初始化。

切换前，请先停止海豹，并备份以下内容：

- `upgrade_metadata.json`
- 原数据库及目标数据库

如果需要保留原数据，应先将数据库结构和数据迁移到目标数据库。不要在已经导入数据的目标数据库上贸然重跑 V150 升级；无法确认表结构是否完整时，请手动补齐表结构或联系开发者处理。

如果目标数据库是确认无数据的空数据库，可以按以下步骤让核心重新执行 V150 初始化：

1. 使用文本编辑器打开 `upgrade_metadata.json`。
2. 从 JSON 数组中删除 `id` 为 `006_V150UpgradeAttrsMigration` 的完整记录，并确保文件仍是合法的 JSON。
3. 保持数据库服务运行，重新启动海豹并检查升级日志。

::: danger 不要删除整个升级记录文件

删除整个 `upgrade_metadata.json` 会让核心尝试重新执行所有历史升级，可能修改已有数据或配置。仅升级海豹核心版本也不会清除已经记录的升级 ID。

:::
