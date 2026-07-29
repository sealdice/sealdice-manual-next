---
lang: zh-cn
title: 数据库检查和修复
---

# 数据库检查和修复

::: info 本节内容

本节包括两项内容：如何判断海豹的数据库是否损坏，在损坏时如何修复。

数据库损坏发生的原因很多，包括但不限于突发断电、硬盘受到物理损坏、或硬盘空间占满。

:::

## 确定问题

如果你发现角色卡或 Log 会在重启海豹后丢失，或数据库文件变得很大（通常在 200MB 以上），建议对数据库进行完整性检查。

首先，停止海豹运行。在 Windows 系统上，你可以右键点击托盘图标并选择退出；在其他系统上，通常是在执行海豹核心的终端使用 ctrl+c 组合键；如果你注册了系统服务，通常是使用 `systemctl stop sealdice` 命令。

稍作等待，以确保数据被写入硬盘。

::: danger 拷贝数据库时必须同时处理 WAL 和 SHM 文件

如果要把数据库复制到其他目录或电脑上修复，必须同时处理与数据库同名的 `-wal` 和 `-shm` 文件。例如，复制 `data.db` 时，可能还需要处理 `data.db-wal` 和 `data.db-shm`。

关闭海豹后，请选择以下任一方式：

- 将 `.db`、`.db-wal` 和 `.db-shm` 三个文件一起复制到修复目录；
- 只复制 `.db` 文件，但在打开它之前，先删除修复目录中同名的旧 `.db-wal` 和 `.db-shm` 文件。

不要将某一份数据库与另一时间点或另一份数据库产生的 WAL、SHM 文件混用，否则可能造成数据丢失或数据库损坏。海豹仍在运行时，不要直接删除原目录中的 WAL、SHM 文件。

:::

随后，使用命令行程序进入海豹的目录，执行以下命令。如果对使用命令行感到困难，后面有一个简化的替代方案。

::: tabs key:shell

== Windows-命令提示符（cmd）

```shell
sealdice-core /db-check
```

== 其他 Shell

```shell
./sealdice-core --db-check
```

:::

你将看到类似的输出

```text
数据库检查结果：
data.db: true
data-logs.db: true
data-censor.db: true
```

这代表数据库是正常的。列出的是海豹核心使用的 3 个数据库文件：

- data.db - 人物卡和群内临时卡
- data-logs.db - 跑团日志
- data-censor.db - 敏感词库

如果有某个数据库文件后输出了 `false`，说明该文件内容损坏。

### 无法使用命令行

如果你对使用命令行感到困难，可以这样做：

打开记事本，将以下内容复制进去：

```shell
sealdice-core /db-check
pause
```

将它命名为 `检查.cmd`，保存在海豹的主程序所在目录，或者保存完复制过去。

双击 `检查.cmd` 执行，之后同上。

::: info 双击后无法执行？

可能是未正确修改后缀 `.cmd`，对于 Windows 用户，请确认启用了文件后缀的展示。可以参考 [在 Windows 中启用文件后缀名显示](https://zhuanlan.zhihu.com/p/121811288) 。

如果仍不能执行，请检查系统环境是否存在损坏，或是否有其他软件阻止执行。

:::

## 修复数据库 - 通过回滚备份

对于大多数情况，我们推荐直接回滚到备份文件的状态。这种方法简便、容易成功。代价是损失从备份时间点到当前时间的数据。

海豹核心默认每 12 小时进行一次备份，你可在 `backups/` 目录下找到所有的备份文件。备份的时间可以直接查看文件创建时间，也可以从文件名中确定。

将你损坏的数据库文件另外保存一份以防万一，并且确保你的硬盘有适当的空闲空间。

在备份文件中找到最新的一份（如果你能确定导致你数据库出问题的事件，也可以找到该时间点前的最后一份），从中解压出数据库文件，替换掉你发现损坏的数据库。

替换完成后，再进行一次完整性检查。如果仍然提示损坏，则使用更早的一份备份重新替换，直到数据库文件正常。

## 修复数据库 - 通过数据库修复指令

如果你熟悉 SQLite 3，或者没有可用的备份文件，尝试以下方案。

这种办法有一定的操作难度，酌情进行使用。这里我们以 Windows 系统为例。

首先，你需要安装或下载一个 SQLite 3 程序。

你可以从其[官网下载页](https://www.sqlite.org/download.html)，找到 Precompiled Binaries for Windows，下载其中的 sqlite-tools。确保你下载的是 3.40 以上版本，通常来说，直接下载最新版即可。

下载完成后，找出 `sqlite3.exe` 放到空目录备用。

将损坏的数据文件（如 `data.db`）从海豹的 `data/default/` 目录中复制出来，放在和 `sqlite3.exe` 同一个目录。复制时必须按照前文的警告，同时处理对应的 WAL、SHM 文件。

使用命令行工具打开这个目录，在此目录下，执行下面的指令：

导出数据：

```shell
sqlite3.exe data.db
.output 1.sql
.recover
.exit
```

恢复数据到 `a.db`：

```shell
sqlite3.exe a.db
.read 1.sql
```

接下来需要根据数据库版本检查数据，并删除 `id` 为空的无效记录。下面的 SQL 仅适用于修复 `data.db`；修复 `data-logs.db` 或 `data-censor.db` 时，不要照搬这些清理语句。

### V146 数据库

V146（v1.4.6）的 `data.db` 使用 `attrs_user`、`attrs_group` 和 `attrs_group_user` 等旧表。先执行 `.tables` 查看表名，再抽查各表的 `id`：

```sql
.tables
SELECT id FROM attrs_user LIMIT 20;
SELECT id FROM attrs_group LIMIT 20;
SELECT id FROM attrs_group_user LIMIT 20;
SELECT id FROM group_info LIMIT 20;
SELECT id FROM group_player_info LIMIT 20;
```

确认查询结果符合预期后，删除恢复过程中产生的无效记录：

```sql
delete from attrs_group where id is null;
delete from attrs_user where id is null;
delete from group_info where id is null;
delete from attrs_group_user where id is null;
delete from ban_info where id is null;
delete from group_player_info where id is null;
.exit
```

### V150 及以上数据库

V150（v1.5.0）起，人物卡和群组属性等数据由旧的 `attrs_user`、`attrs_group`、`attrs_group_user` 表迁移到统一的 `attrs` 表，不能继续使用 V146 的清理语句。先执行 `.tables`，确认存在 `attrs` 表，再抽查 `id`：

```sql
.tables
SELECT id FROM attrs LIMIT 20;
SELECT id FROM group_info LIMIT 20;
SELECT id FROM ban_info LIMIT 20;
SELECT id FROM group_player_info LIMIT 20;
```

确认查询结果符合预期后，删除恢复过程中产生的无效记录：

```sql
delete from attrs where id is null;
delete from group_info where id is null;
delete from ban_info where id is null;
delete from group_player_info where id is null;
.exit
```

此时 `a.db` 就是修复后的数据库。保持海豹关闭，将原路径中待替换数据库对应的旧 WAL、SHM 文件删除，再把 `a.db` 复制回 `data/default/` 并改回原数据库文件名，例如 `data.db`。启动海豹前，建议再次执行数据库完整性检查。

## 数据库升级记录（高级用户）

::: danger 仅供了解数据库结构的高级用户使用

手动修改升级记录会让海豹跳过本应执行的数据库迁移，或重复执行已经完成的迁移。操作前必须关闭海豹并备份整个 `data/default/` 目录。只有在确认数据库实际结构和数据状态后，才能执行下面的 SQL。

:::

默认使用 SQLite 时，数据库升级记录保存在 `data/default/data.db` 的 `upgrade_records` 表中，不在 `data-logs.db` 或 `data-censor.db` 中。旧的 `upgrade_metadata.json` 已不再作为升级状态来源。

`upgrade_records` 表包含以下字段：

| 字段 | 含义 |
| --- | --- |
| `id` | 升级项目的唯一 ID，也是判断是否已执行的依据 |
| `timestamp` | 执行或写入记录的时间 |
| `success` | 执行结果，`1` 为成功，`0` 为失败 |
| `message` | 结果或错误信息 |
| `logs` | 此升级项目产生的日志，保存为 JSON 数组 |

海豹启动时会按 `id` 顺序检查升级项目。只要 `upgrade_records` 中已经存在对应的 `id`，该项目就会被视为已应用并跳过；当前判断不区分 `success` 是 `0` 还是 `1`。未找到 `id` 时，海豹会执行升级，并在执行结束后写入成功或失败记录。

V150 数据库结构升级对应两个记录：

| ID | 作用 |
| --- | --- |
| `006_V150UpgradeAttrsMigration` | 将旧的三个 `attrs_*` 表合并为 `attrs`，并升级相关表结构 |
| `007_V150FixGroupInfoMigration` | 清理 V146 遗留的异常 `group_info` 数据 |

可以先查看当前记录：

```sql
SELECT id, timestamp, success, message
FROM upgrade_records
ORDER BY id;
```

### 手动跳过升级

仅当迁移实际上已经完成、数据库中已经存在正确的 V150 表结构，但升级记录丢失时，才可以手动补写记录。以下示例会把两个 V150 升级项目标记为已应用：

```sql
INSERT OR REPLACE INTO upgrade_records
    (id, timestamp, success, message, logs)
VALUES
    ('006_V150UpgradeAttrsMigration', strftime('%Y-%m-%dT%H:%M:%SZ', 'now'), 1, '手动标记为已应用', '[]'),
    ('007_V150FixGroupInfoMigration', strftime('%Y-%m-%dT%H:%M:%SZ', 'now'), 1, '手动标记为已应用', '[]');
```

如果数据库仍是 V146 结构，手动添加这些记录会跳过必要迁移，导致人物卡、群组属性等数据无法正常使用。

### 重置升级

要让海豹在下次启动时重新尝试某个升级项目，应删除对应的记录，而不是删除 `upgrade_records` 表。重置两个 V150 升级项目的示例如下：

```sql
DELETE FROM upgrade_records
WHERE id IN (
    '006_V150UpgradeAttrsMigration',
    '007_V150FixGroupInfoMigration'
);
```

删除后先退出 SQLite，再启动海豹。重新执行迁移可能再次修改表结构或数据，因此只应在确认上次迁移未完成、或需要在备份副本上重新验证迁移时使用。
