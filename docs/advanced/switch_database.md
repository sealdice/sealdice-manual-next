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

在 `sealdice-core` 可执行程序文件的同级目录下，创建/修改 `.env` 文件，配置数据库连接：

::: tabs key:database

== SQLite

```dotenv
DB_TYPE=sqlite
DATA_DIR="<dir>"
```

- `<dir>`：SQLite 数据文件存放目录，默认为 `./data/default`

== MySQL

```dotenv
DB_TYPE=mysql
DB_DSN="<username>:<password>@tcp(<ip>:<host>)/<database>?charset=utf8mb4&parseTime=True&loc=Local"

```

- `<username>`：实际的数据库用户名
- `<password>`：密码
- `<ip>:<port>`：实际的数据库服务端地址与端口
- `<database>`：实际的数据库实例名称

== PostgreSQL

```dotenv
DB_TYPE=postgres
DB_DSN="postgres://<username>:<password>@<ip>:<port>/<database>?sslmode=disable"

```

- `<username>`：实际的数据库用户名，PostgreSQL 通常为 `postgres`
- `<password>`：实际的数据库密码
- `<ip>:<port>`：实际的数据库服务端地址与端口
- `<database>`：实际的数据库实例名称

:::

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

在新版本中，若你已经启动过海豹，则生成的 `upgrade_metadata.json` 会导致海豹不自动在数据库内建表。

在这种情况下，可考虑使用新版本海豹，或者修改该 JSON 去除 150 迁移升级建表的部分使得其自动建表，或手动建表。
