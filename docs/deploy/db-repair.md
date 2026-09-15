---
lang: zh-cn
title: 数据库检查和修复
---

# 数据库检查和修复

::: info 本节内容

本节包括两项内容：如何判断海豹的数据库是否损坏，在损坏时如何修复。

数据库损坏发生的原因很多，包括但不限于突发断电、硬盘受到物理损坏、或硬盘空间占满。

如果准备升级海豹，建议先把数据库修好再升级，海豹目前暂无法通过迁移与升级修复过往产生的数据库损坏。

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

同时，请注意，删除 wal 文件和 shm 文件可能会造成部分数据库的数据丢失。若无必要，建议选择第一个方案。

另外，在执行了下文的修复操作后，修复完毕的数据库往往并不包含 wal/shm 文件，这是由 SQLite 的特性决定的。我们可以认为，在修复过程中产生的 wal,shm 文件的数据内容已经被写入修复完毕的数据库中。

因此，在将修复完毕的 db 文件拷贝回海豹目录时，应当删除海豹目录下的 wal/shm 文件，防止对数据库进行干扰导致数据损坏。

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

如果有某个数据库文件后输出了 `false`，说明该文件内容已损坏。

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

## 修复数据库 - 通过 SQLite 导出和重建

如果没有可用备份，或者你想尽量从损坏库里抢回数据，可以用 SQLite 3 的 `.recover` 命令导出后重建。

全程需要保持海豹关闭，不要在海豹运行时复制或替换数据库。也不要直接在 `data/default/` 里对原文件做 `.recover`，先复制出来再进行操作。

这套方法对命令行和 SQLite 版本都有一点要求。下面以 Windows 为例，其他系统会存在可执行文件名和路径不同，但原理相同，理解原理后自行替换即可。

首先，准备一个 SQLite 3 程序。

你可以从其[官网下载页](https://www.sqlite.org/download.html)找到 Precompiled Binaries for Windows，下载其中的 sqlite-tools。确保你下载的是 3.40 以上版本，通常直接下载最新版即可。

把 `sqlite3.exe` 放到一个空目录里备用。

把损坏的数据库从海豹的 `data/default/` 目录复制出来，放到和 `sqlite3.exe` 同一个目录。复制时要把对应的 `-wal`、`-shm` 文件一起带上；没有就跳过。

::: tip 提示：

若你使用了 MySQL/PGSQL 数据库，此处的数据恢复对你仅有参考作用。

:::

使用命令行工具打开这个目录，在此目录下，根据不同的数据库，调整对应的指令：

- `data.db`
- `data-logs.db`
- `data-censor.db`

### 导出数据库

三个数据库都可以先用 `.recover` 导出，再把导出的 SQL 读回一个新的数据库文件，这样做可以保留原本的数据库，防止可能的、因出现意外而数据丢失的情况发生。

以下以 `data.db` 为例：

```shell
sqlite3.exe data.db
.output recover-data.sql
.recover
.exit
```

```shell
sqlite3.exe fixed-data.db
.read recover-data.sql
.exit
```

处理其他两个库时，只需要把文件名替换成 `data-logs.db` / `data-censor.db`，以及对应的 `recover-*.sql` / `fixed-*.db`。

之后，我们通过命令行打开数据库，对数据库进行修复，以打开 `data.db` 进行修复为例：

```shell
sqlite3.exe fixed-data.db
```

其他数据库同样可以这样操作以打开数据库，之后，再通过下列章节的内容输入指令对数据库进行修复。

### 修复 `data.db`

`data.db` 会随版本变化而不同。先执行 `.tables`，确认你面对的是旧结构还是新结构，再决定清理语句。

#### 旧结构：V146 / v1.4.6

如果 `.tables` 里还能看到 `attrs_user`、`attrs_group`、`attrs_group_user`，说明这是旧结构。

通过下列的命令先进行检查：

```sql
.tables
SELECT id FROM attrs_user LIMIT 20;
SELECT id FROM attrs_group LIMIT 20;
SELECT id FROM attrs_group_user LIMIT 20;
SELECT id FROM group_info LIMIT 20;
SELECT id FROM group_player_info LIMIT 20;
SELECT id FROM ban_info LIMIT 20;
```

确认结果基本正常无误后，再通过下列命令清理恢复过程中产生的坏行：

```sql
delete from attrs_group where id is null;
delete from attrs_user where id is null;
delete from attrs_group_user where id is null;
delete from group_info where id is null;
delete from ban_info where id is null;
delete from group_player_info where id is null;

delete from group_info
where not (
    (created_at is null or cast(created_at as integer) > 0)
    and (updated_at is null or cast(updated_at as integer) > 0)
    and data is not null
);

delete from ban_info
where data is null or data = '' or length(data) = 0;
```

#### 新结构：V150 / v1.5.0 及以上

如果 `.tables` 里已经有统一的 `attrs` 表，旧结构的清理语句会报错，需要先使用下列的命令进行检查，确认数据库结构是否为新结构。

```sql
.tables
SELECT id FROM attrs LIMIT 20;
SELECT id FROM group_info LIMIT 20;
SELECT id FROM ban_info LIMIT 20;
SELECT id FROM group_player_info LIMIT 20;
```

确认结果基本正常无误后，再通过下列命令清理恢复过程中产生的坏行：

```sql
delete from attrs where id is null;
delete from group_info where id is null;
delete from ban_info where id is null;
delete from group_player_info where id is null;

delete from attrs
where data is null or data = '' or length(data) = 0;

delete from group_info
where not (
    (created_at is null or cast(created_at as integer) > 0)
    and (updated_at is null or cast(updated_at as integer) > 0)
    and data is not null
);

delete from ban_info
where data is null or data = '' or length(data) = 0;
```

::: warning 注意：

如果 `.tables` 里同时能看到 `attrs` 和 `attrs_*`，那说明你的数据库处在迁移边界或者残留状态，你需要根据自己使用的海豹版本进行评估

1.如果你在注意到数据库损坏前使用的是 V1.4.6 的海豹核心，本次为升级 V1.5.0 及以上版本时，发现了数据库损坏，那么，你可以考虑备份文件后，可以在修复前执行如下命令以删除 attrs 表（这是升级 V1.5.0 的残留）：

```sql
delete table attrs;
```

2.若您已经长期使用 V1.5.0 及 V1.5.0 以上的海豹，并且没有发现数据库相关的报错，那么说明，升级遗留下来的产物已经存在，你可以考虑什么都不做，海豹会自行处理这部分的残留，或者，你也可以在修复前执行下述语句以清理残留产物：

```sql
delete table attrs_group;
delete table attrs_user;
delete table attrs_group_user;
```

最后，无论您是否出现交界情况，均要执行：

.exit
以退出程序。

处理完后，fixed-data.db 就是修复后的 data.db。
处理完后，`fixed-data.db` 就是修复后的 `data.db`。

### 修复 `data-logs.db`

`data-logs.db` 是单独的日志库，主要是 `logs` 和 `log_items`，不要套用 `data.db` 的清理 SQL。这里也不需要按 V146 / V150 分两套方案。

先抽查：

```sql
.tables
PRAGMA table_info(logs);
PRAGMA table_info(log_items);
SELECT id FROM logs LIMIT 20;
SELECT log_id FROM log_items LIMIT 20;
```

如果恢复后出现了 `id = 0` 或 `log_id = 0` 的坏行，可以按当前代码里已知的日志修复逻辑清理：

```sql
delete from log_items where log_id = 0;
delete from logs where id = 0;
```

如果 `logs` 表里已经有 `size` 列，再执行一次重算：

```sql
update logs
set size = (
    select count(1)
    from log_items
    where log_items.log_id = logs.id
      and log_items.removed is null
);
```

如果 `PRAGMA table_info(logs);` 看不到 `size` 列，就先不要执行上面的 `update logs set size = ...`，先保留 `fixed-data-logs.db`，再结合当前版本确认是否需要手工补列处理。

处理完后，`fixed-data-logs.db` 就是修复后的 `data-logs.db`。

### 修复 `data-censor.db`

`data-censor.db` 当前主要使用 `censor_log` 表，不要套用 `data.db` 或 `data-logs.db` 的清理语句。

先抽查：

```sql
.tables
PRAGMA table_info(censor_log);
SELECT id FROM censor_log LIMIT 20;
SELECT user_id, group_id, highest_level FROM censor_log LIMIT 20;
```

目前没有像 `data.db`、`data-logs.db` 那样对 `data-censor.db` 定义一组通用的自动清理 SQL，所以这里不要机械套删。先抽查，如果确实能看出恢复出了明显垃圾行，再按实际内容有针对性处理。

处理完后，`fixed-data-censor.db` 就是修复后的 `data-censor.db`。

### 复制回去前再做一次完整性检查

建议先检查修复结果：

```shell
sqlite3.exe fixed-data.db "PRAGMA integrity_check;"
sqlite3.exe fixed-data-logs.db "PRAGMA integrity_check;"
sqlite3.exe fixed-data-censor.db "PRAGMA integrity_check;"
```

只修其中一个库时，只检查对应那个 `fixed-*.db` 即可。

### 复制回 `data/default/`

保持海豹关闭，把原路径中待替换数据库对应的旧 `-wal`、`-shm` 文件删掉，再把修好的库复制回去并改回原文件名：

- `fixed-data.db` 改回 `data.db`
- `fixed-data-logs.db` 改回 `data-logs.db`
- `fixed-data-censor.db` 改回 `data-censor.db`

替换完成后，再启动海豹。

## 一键修复脚本

如果对命令行有困难，我们提供了下面的一键脚本，复制并在本地创建对应系统的脚本后，可通过执行脚本进行数据库一键修复。

以下脚本在运行时进行的操作如下：

1. 从 `data/default/` 复制目标库及其 `-wal` / `-shm`
2. 生成唯一的 `.recover` 导出文件
3. 恢复出唯一的修复结果库
4. 自动执行当前已知的内容清理 SQL
5. 跑一次 `PRAGMA integrity_check;`

脚本支持直接修复数据内容，但它不会自动把修复结果覆盖回海豹目录。你仍然应该先检查生成的 `fixed-*.db`，确认无误后再手工替换。

其中：

- `data.db` 会自动识别旧结构 `attrs_user/attrs_group/attrs_group_user` 和新结构 `attrs`，并选择对应的清理 SQL。
- `data-logs.db` 会自动清理 `id = 0` / `log_id = 0` 的坏行；如果存在 `size` 列，还会自动重算 `logs.size`。
- `data-censor.db` 当前没有通用的自动内容清理规则，所以脚本只做恢复和完整性检查。

### Bash (适用于 Linux/Mac 系统)

```bash
#!/usr/bin/env bash
set -euo pipefail

log() {
  printf '%s\n' "$1"
}

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 /path/to/data/default data.db|data-logs.db|data-censor.db"
  exit 1
fi

SRC_DIR="$1"
DB_NAME="$2"

log "[STEP 1/7] Validating arguments and tool path"

case "$DB_NAME" in
  data.db)
    SQL_OUT="recover-data.sql"
    FIXED_DB="fixed-data.db"
    ;;
  data-logs.db)
    SQL_OUT="recover-data-logs.sql"
    FIXED_DB="fixed-data-logs.db"
    ;;
  data-censor.db)
    SQL_OUT="recover-data-censor.sql"
    FIXED_DB="fixed-data-censor.db"
    ;;
  *)
    echo "Unsupported database: $DB_NAME"
    exit 1
    ;;
esac

BASE_DIR="$(pwd)"
if [ -f "$BASE_DIR/sqlite3.exe" ]; then
  SQLITE="$BASE_DIR/sqlite3.exe"
else
  SQLITE="$(command -v sqlite3 || true)"
fi

if [ -z "$SQLITE" ]; then
  echo "sqlite3 was not found in the current directory or PATH"
  exit 1
fi

if [ ! -f "$SRC_DIR/$DB_NAME" ]; then
  echo "Source database not found: $SRC_DIR/$DB_NAME"
  exit 1
fi

log "[STEP 2/7] Preparing workspace"
WORK_DIR="$BASE_DIR/recover-${DB_NAME%.db}"
mkdir -p "$WORK_DIR"

log "[STEP 3/7] Copying database and sidecar files"
cp "$SRC_DIR/$DB_NAME" "$WORK_DIR/$DB_NAME"
for sidecar in "-wal" "-shm"; do
  if [ -f "$SRC_DIR/$DB_NAME$sidecar" ]; then
    cp "$SRC_DIR/$DB_NAME$sidecar" "$WORK_DIR/$DB_NAME$sidecar"
    log "[INFO] Copied $DB_NAME$sidecar"
  else
    log "[INFO] Sidecar not found, skipped: $DB_NAME$sidecar"
  fi
done

cd "$WORK_DIR"

log "[STEP 4/7] Exporting recover SQL"
"$SQLITE" "$DB_NAME" <<EOF
.output $SQL_OUT
.recover
.exit
EOF

log "[STEP 5/7] Rebuilding recovered database"
"$SQLITE" "$FIXED_DB" <<EOF
.read $SQL_OUT
.exit
EOF

cleanup_data_db() {
  local schema
  schema="$("$SQLITE" "$FIXED_DB" "SELECT CASE WHEN EXISTS(SELECT 1 FROM sqlite_master WHERE type='table' AND name='attrs') THEN 'v150+' WHEN EXISTS(SELECT 1 FROM sqlite_master WHERE type='table' AND name='attrs_user') THEN 'v146' ELSE 'unknown' END;")"
  log "[INFO] data.db schema detected: $schema"

  case "$schema" in
    v146)
      "$SQLITE" "$FIXED_DB" <<'EOF'
delete from attrs_group where id is null;
delete from attrs_user where id is null;
delete from attrs_group_user where id is null;
delete from group_info where id is null;
delete from ban_info where id is null;
delete from group_player_info where id is null;
delete from group_info
where not (
    (created_at is null or cast(created_at as integer) > 0)
    and (updated_at is null or cast(updated_at as integer) > 0)
    and data is not null
);
delete from ban_info
where data is null or data = '' or length(data) = 0;
EOF
      log "[INFO] Applied V146 data.db cleanup SQL"
      ;;
    v150+)
      "$SQLITE" "$FIXED_DB" <<'EOF'
delete from attrs where id is null;
delete from group_info where id is null;
delete from ban_info where id is null;
delete from group_player_info where id is null;
delete from attrs
where data is null or data = '' or length(data) = 0;
delete from group_info
where not (
    (created_at is null or cast(created_at as integer) > 0)
    and (updated_at is null or cast(updated_at as integer) > 0)
    and data is not null
);
delete from ban_info
where data is null or data = '' or length(data) = 0;
EOF
      log "[INFO] Applied V150+ data.db cleanup SQL"
      ;;
    *)
      log "[WARN] Unknown data.db schema. Automatic content cleanup skipped."
      ;;
  esac
}

cleanup_logs_db() {
  local has_size

  "$SQLITE" "$FIXED_DB" <<'EOF'
delete from log_items where log_id = 0;
delete from logs where id = 0;
EOF
  log "[INFO] Applied log_id=0 / id=0 cleanup SQL"

  has_size="$("$SQLITE" "$FIXED_DB" "SELECT CASE WHEN EXISTS(SELECT 1 FROM pragma_table_info('logs') WHERE name = 'size') THEN 1 ELSE 0 END;")"
  if [ "$has_size" = "1" ]; then
    "$SQLITE" "$FIXED_DB" <<'EOF'
update logs
set size = (
    select count(1)
    from log_items
    where log_items.log_id = logs.id
      and log_items.removed is null
);
EOF
    log "[INFO] Recalculated logs.size"
  else
    log "[WARN] logs.size column not found. Skipped size recalculation."
  fi
}

cleanup_censor_db() {
  log "[INFO] No generic content cleanup is defined for data-censor.db"
}

log "[STEP 6/7] Applying automatic content cleanup"
case "$DB_NAME" in
  data.db)
    cleanup_data_db
    ;;
  data-logs.db)
    cleanup_logs_db
    ;;
  data-censor.db)
    cleanup_censor_db
    ;;
esac

log "[STEP 7/7] Running integrity check"
"$SQLITE" "$FIXED_DB" "PRAGMA integrity_check;"

log "[DONE] Generated files:"
log "  $WORK_DIR/$SQL_OUT"
log "  $WORK_DIR/$FIXED_DB"
```

### Batch (适用于 Windows 系统)

```bat
@echo off
setlocal enabledelayedexpansion

if "%~2"=="" (
  echo Usage: %~nx0 ^<data-default-dir^> ^<data.db^|data-logs.db^|data-censor.db^>
  exit /b 1
)

set "SRC_DIR=%~1"
set "DB_NAME=%~2"

echo [STEP 1/7] Validating arguments and tool path

if /I "%DB_NAME%"=="data.db" (
  set "SQL_OUT=recover-data.sql"
  set "FIXED_DB=fixed-data.db"
) else if /I "%DB_NAME%"=="data-logs.db" (
  set "SQL_OUT=recover-data-logs.sql"
  set "FIXED_DB=fixed-data-logs.db"
) else if /I "%DB_NAME%"=="data-censor.db" (
  set "SQL_OUT=recover-data-censor.sql"
  set "FIXED_DB=fixed-data-censor.db"
) else (
  echo Unsupported database: %DB_NAME%
  exit /b 1
)

set "SQLITE=%~dp0sqlite3.exe"
if not exist "%SQLITE%" (
  echo sqlite3.exe was not found in the current directory
  exit /b 1
)

if not exist "%SRC_DIR%\%DB_NAME%" (
  echo Source database not found: %SRC_DIR%\%DB_NAME%
  exit /b 1
)

echo [STEP 2/7] Preparing workspace
set "WORK_DIR=%~dp0recover-%DB_NAME:.db=%"
if not exist "%WORK_DIR%" mkdir "%WORK_DIR%"

echo [STEP 3/7] Copying database and sidecar files
copy /y "%SRC_DIR%\%DB_NAME%" "%WORK_DIR%\%DB_NAME%" >nul || exit /b 1
if exist "%SRC_DIR%\%DB_NAME%-wal" (
  copy /y "%SRC_DIR%\%DB_NAME%-wal" "%WORK_DIR%\%DB_NAME%-wal" >nul
  echo [INFO] Copied %DB_NAME%-wal
) else (
  echo [INFO] Sidecar not found, skipped: %DB_NAME%-wal
)
if exist "%SRC_DIR%\%DB_NAME%-shm" (
  copy /y "%SRC_DIR%\%DB_NAME%-shm" "%WORK_DIR%\%DB_NAME%-shm" >nul
  echo [INFO] Copied %DB_NAME%-shm
) else (
  echo [INFO] Sidecar not found, skipped: %DB_NAME%-shm
)

pushd "%WORK_DIR%"

echo [STEP 4/7] Exporting recover SQL
(
  echo .output %SQL_OUT%
  echo .recover
  echo .exit
) > recover-commands.txt
"%SQLITE%" "%DB_NAME%" < recover-commands.txt

echo [STEP 5/7] Rebuilding recovered database
(
  echo .read %SQL_OUT%
  echo .exit
) > import-commands.txt
"%SQLITE%" "%FIXED_DB%" < import-commands.txt

echo [STEP 6/7] Applying automatic content cleanup
if /I "%DB_NAME%"=="data.db" (
  for /f "usebackq delims=" %%i in (`"%SQLITE%" "%FIXED_DB%" "SELECT CASE WHEN EXISTS(SELECT 1 FROM sqlite_master WHERE type='table' AND name='attrs') THEN 'v150+' WHEN EXISTS(SELECT 1 FROM sqlite_master WHERE type='table' AND name='attrs_user') THEN 'v146' ELSE 'unknown' END;"`) do set "DATA_SCHEMA=%%i"
  echo [INFO] data.db schema detected: !DATA_SCHEMA!

  if /I "!DATA_SCHEMA!"=="v146" (
    (
      echo delete from attrs_group where id is null;
      echo delete from attrs_user where id is null;
      echo delete from attrs_group_user where id is null;
      echo delete from group_info where id is null;
      echo delete from ban_info where id is null;
      echo delete from group_player_info where id is null;
      echo delete from group_info
      echo where not ^(
      echo     ^(created_at is null or cast^(created_at as integer^) ^> 0^)
      echo     and ^(updated_at is null or cast^(updated_at as integer^) ^> 0^)
      echo     and data is not null
      echo ^);
      echo delete from ban_info
      echo where data is null or data = '' or length^(data^) = 0;
    ) > cleanup.sql
    "%SQLITE%" "%FIXED_DB%" < cleanup.sql
    echo [INFO] Applied V146 data.db cleanup SQL
  ) else if /I "!DATA_SCHEMA!"=="v150+" (
    (
      echo delete from attrs where id is null;
      echo delete from group_info where id is null;
      echo delete from ban_info where id is null;
      echo delete from group_player_info where id is null;
      echo delete from attrs
      echo where data is null or data = '' or length^(data^) = 0;
      echo delete from group_info
      echo where not ^(
      echo     ^(created_at is null or cast^(created_at as integer^) ^> 0^)
      echo     and ^(updated_at is null or cast^(updated_at as integer^) ^> 0^)
      echo     and data is not null
      echo ^);
      echo delete from ban_info
      echo where data is null or data = '' or length^(data^) = 0;
    ) > cleanup.sql
    "%SQLITE%" "%FIXED_DB%" < cleanup.sql
    echo [INFO] Applied V150+ data.db cleanup SQL
  ) else (
    echo [WARN] Unknown data.db schema. Automatic content cleanup skipped.
  )
) else if /I "%DB_NAME%"=="data-logs.db" (
  (
    echo delete from log_items where log_id = 0;
    echo delete from logs where id = 0;
  ) > cleanup.sql
  "%SQLITE%" "%FIXED_DB%" < cleanup.sql
  echo [INFO] Applied log_id=0 / id=0 cleanup SQL

  for /f "usebackq delims=" %%i in (`"%SQLITE%" "%FIXED_DB%" "SELECT CASE WHEN EXISTS(SELECT 1 FROM pragma_table_info('logs') WHERE name = 'size') THEN 1 ELSE 0 END;"`) do set "HAS_SIZE=%%i"
  if "!HAS_SIZE!"=="1" (
    (
      echo update logs
      echo set size = ^(
      echo     select count^(1^)
      echo     from log_items
      echo     where log_items.log_id = logs.id
      echo       and log_items.removed is null
      echo ^);
    ) > recalc-size.sql
    "%SQLITE%" "%FIXED_DB%" < recalc-size.sql
    echo [INFO] Recalculated logs.size
  ) else (
    echo [WARN] logs.size column not found. Skipped size recalculation.
  )
) else if /I "%DB_NAME%"=="data-censor.db" (
  echo [INFO] No generic content cleanup is defined for data-censor.db
)

echo [STEP 7/7] Running integrity check
"%SQLITE%" "%FIXED_DB%" "PRAGMA integrity_check;"

echo [DONE] Generated files:
echo   %WORK_DIR%\%SQL_OUT%
echo   %WORK_DIR%\%FIXED_DB%

popd
endlocal
```

## 数据库升级记录（高级用户）

如果你意识到了自己可能需要手动对数据库的升级记录进行修改，那么，下面将会帮助你如何自行手动修改数据库内的升级记录。

::: danger 仅供了解数据库结构的高级用户使用

手动修改升级记录会让海豹跳过本应执行的数据库迁移，或重复执行已经完成的迁移。操作前必须关闭海豹并备份整个 `data/default/` 目录。只有在确认数据库实际结构和数据状态后，才能执行下面的 SQL。

:::

在 <Badge type="tip" text="v1.5.1"/>之后，当你默认使用 SQLite 时，数据库的升级记录保存了在 `data/default/data.db` 的 `upgrade_records` 表中。在此之前所使用的 `upgrade_metadata.json` 已不再作为升级状态来源。因此，如果你想要通过手动修改升级记录以跳过/重复执行数据库迁移操作，你应当修改 `data.db` 的 `upgrade_records` 表。

`upgrade_records` 表包含以下字段：

| 字段 | 含义 |
| --- | --- |
| `id` | 升级项目的唯一 ID，也是判断是否已执行的依据 |
| `timestamp` | 执行或写入记录的时间 |
| `success` | 执行结果，`1` 为成功，`0` 为失败 |
| `message` | 结果或错误信息 |
| `logs` | 此升级项目产生的日志，保存为 JSON 数组 |

海豹启动时会按 `id` 顺序检查升级项目。只要 `upgrade_records` 中已经存在对应的 `id`，该项目就会被视为已应用并跳过；未找到 `id` 时，海豹会执行升级，并在执行结束后写入成功或失败记录。

V150 数据库结构升级对应两个记录：

| ID | 作用 |
| --- | --- |
| `006_V150UpgradeAttrsMigration` | 将旧的三个 `attrs_*` 表合并为 `attrs`，并升级相关表结构 |
| `007_V150FixGroupInfoMigration` | 清理 V146 遗留的异常 `group_info` 数据 |

可以先通过命令查看当前记录：

```sql
SELECT id, timestamp, success, message
FROM upgrade_records
ORDER BY id;
```

### 手动跳过升级

仅当迁移实际上已经完成、数据库中已经存在正确的 V150 表结构，但升级记录丢失时，才可以手动补写记录。以下命令会把两个 V150 升级项目标记为已应用：

```sql
INSERT OR REPLACE INTO upgrade_records
    (id, timestamp, success, message, logs)
VALUES
    ('006_V150UpgradeAttrsMigration', strftime('%Y-%m-%dT%H:%M:%SZ', 'now'), 1, '手动标记为已应用', '[]'),
    ('007_V150FixGroupInfoMigration', strftime('%Y-%m-%dT%H:%M:%SZ', 'now'), 1, '手动标记为已应用', '[]');
```

::: danger 非 V150 结构的数据库不可执行上述命令

如果数据库仍是前文所说的 V146 结构，手动添加这些记录会跳过必要的数据库迁移，导致人物卡、群组属性等数据无法正常使用。

因此，非 V150 结构的数据库最好不要通过手动添加记录以跳过升级迁移。

:::

### 重置升级

如果出现了升级失败、亦或是要让海豹在下次启动时重新尝试某个升级项目的情况，则应删除对应的记录重置两个 V150 升级项目的示例命令如下，执行后重启海豹，海豹会重新进行 V150 的对应升级项目：

```sql
DELETE FROM upgrade_records
WHERE id IN (
    '006_V150UpgradeAttrsMigration',
    '007_V150FixGroupInfoMigration'
);
```

删除后，应该先退出 SQLite，再启动海豹。

::: warning 注意：

重新执行迁移可能再次修改表结构或数据，因此，只应在确认上次迁移未完成、或需要在备份副本上重新验证迁移时使用重置升级功能。

:::
