---
lang: zh-cn
title: 切换数据库连接
---
::: Warning 注意：

在在这一节开始前，我们默认你具有数据库相关背景知识。本节仅介绍如何切换海豹核心对接的数据库，不包含任何如何部署数据库等内容。

如果你不了解什么是数据库，那么你大概并不需要相关配置，可以直接跳过本节。

此外，切换数据库后如果需要保留原数据，请自行进行数据迁移。

另外注意：在新版本中，若你已经启动过海豹，则生成的 `upgrade_metadata.json` 会导致海豹不自动在数据库内建表。
在这种情况下，可考虑使用新海豹，或者修改该 JSON 去除 150 迁移升级建表的部分使得其自动建表，或手动建表。

:::

::: info 本节内容

本节将展示如何切换海豹核心对接的数据库。目前支持 `SQLite`（默认）、`MySQL` 以及 `PostgreSQL`。
:::

从 <Badge type="tip" text="v1.5.0"/> 起，海豹支持对接多种数据库，目前可以使用 `SQLite`、`MySQL` 或 `PostgreSQL`。

在 `sealdice-core` 可执行程序文件的同级目录下，创建/修改 `.env` 文件，用于配置数据库连接。

::: tabs key:database-env

== MySQL 数据库

``` .env
DB_TYPE=mysql
DB_DSN="<username>:<userpasswd>@tcp(<ip>:<host>)/<yourdatabase>?charset=utf8mb4&parseTime=True&loc=Local"

```

注意，这里的 `<yourdatabase>` 应替换为你实际创建的数据库实例名称，`"<username>`应替换为你实际的数据库用户名， `<userpasswd>` 则应该替换为密码，`<ip>:<port>` 应替换为你实际的数据库服务端地址与端口。

== Postgre 数据库

``` .env
DB_TYPE=postgres
DB_DSN="postgres://postgres:<userpasswd>@<ip>:<port>/<databasename>?sslmode=disable"

```

注意，这里的 `:<userpasswd>` 应替换为你实际创建的数据库密码，`<ip>:<port>` 应替换为你实际的数据库服务端地址与端口，`<databasename>` 应替换为你实际创建的数据库实例名称。

配置完成后，保持数据库服务运行，双击启动海豹，如果连接正确，你的海豹核心应当会成功运行，并在 WebUI 输出类似以下的信息：

:::

:::: tabs key:db-webui-proved

== MySQL 数据库

``` WebUI
INFO 当前选择使用: MYSQL数据库  

```

== PostgreSQL 数据库

``` WebUI
INFO 当前选择使用: POSTGRESQL数据库  

```

:::
