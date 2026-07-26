---
lang: zh-cn
title: API 列表
---

# API 列表

::: info 本节内容

本节为海豹提供的 JS API 列表。目前的内容是从上古文档中直接迁移过来的，难免存在错误和缺失，参考本节时请注意识别。

更好的方式是参考海豹提供的 [seal.d.ts](https://raw.githubusercontent.com/sealdice/sealdice-js-ext-template/master/types/seal.d.ts) 文件。（但同样存在缺失）

如果你需要最准确的内容，当前只能查阅海豹源码。主要查看 [dice_jsvm.go](https://github.com/sealdice/sealdice-core/blob/master/dice/dice_jsvm.go)，还有一些 API 以结构体方法的形式存在。

:::

> 其中 ctx 为信息的 MsgContext，msg 为信息的 Message，一般会在定义指令函数时就声明，如：

```javascript
cmd.solve = (ctx, msg, cmdArgs) => {
    someFunction;
}
```

## 带注释的 API 速查

以下保留原 API 列表中逐项写在代码旁的注释，并补入 <Badge type="tip" text="LatestVersion"/> 接口。详细限制仍以后续各节和类型声明为准。

```javascript
// 以下两个旧接口在原文中即为注释状态；新插件应使用 seal.vars 下的类型化接口。
// seal.setVarInt(ctx, '$XXX', valueToSet); // 将变量设为 int 类型。
// seal.setVarStr(ctx, '$XXX', valueToSet); // 将变量设为 string 类型。

seal.replyGroup(ctx, msg, something); // 向收到指令的群中发送 something，私聊中不会发送。
seal.replyPerson(ctx, msg, something); // 向指令触发者私聊发送 something。
seal.replyToSender(ctx, msg, something); // 群聊中回复群聊，私聊中回复私聊。
seal.memberBan(ctx, groupID, userID, dur); // 将指定群的指定用户禁言 dur 秒，是否可用取决于平台实现和权限。
seal.memberKick(ctx, groupID, userID); // 将指定群的指定用户移出群，是否可用取决于平台实现和权限。
seal.format(ctx, something); // 经 DiceScript/RollVM 求值后返回文本，不会自动发送。
seal.formatTmpl(ctx, something); // 调用并格式化键名为 something 的自定义文案。
seal.getCtxProxyFirst(ctx, cmdArgs); // 获取第一个被 @ 的人的上下文，等价于 getCtxProxyAtPos(..., 0)。
seal.getCtxProxyAtPos(ctx, cmdArgs, pos); // 获取第 pos 个被 @ 的人的上下文，pos 从 0 开始。

seal.vars.intGet(ctx, '$XXX'); // 返回 [int 值，是否存在且类型匹配]。
seal.vars.intSet(ctx, '$XXX', valueToSet); // 将变量设为 int 类型的 valueToSet。
seal.vars.strGet(ctx, '$XXX'); // 返回 [string 值，是否存在且类型匹配]。
seal.vars.strSet(ctx, '$XXX', valueToSet); // 将变量设为 string 类型的 valueToSet。
// seal.vars.varSet(ctx, '$XXX', valueToSet); // 原文保留接口，使用前请以 seal.d.ts 和运行时为准。
// seal.vars.varGet(ctx, '$XXX'); // 原文保留接口，使用前请以 seal.d.ts 和运行时为准。

seal.ext.newCmdItemInfo(); // 创建新的指令定义对象。
seal.ext.newCmdExecuteResult(true); // 创建指令执行结果，true 表示成功处理。
seal.ext.new(extName, extAuthor, version); // 创建扩展，三个参数均为字符串。
seal.ext.find(extName); // 查找指定名称的扩展，未找到时返回空值。
seal.ext.register(newExt); // 注册 seal.ext.new() 返回的扩展对象。

seal.coc.newRule(); // 创建自定义 CoC 规则。
seal.coc.newRuleCheckResult(); // 创建自定义 CoC 规则检定结果。
seal.coc.registerRule(rule); // 注册自定义 CoC 规则。

seal.deck.draw(ctx, deckName, isShuffle); // 抽取牌堆并返回包含 exists、result、err 的结果对象。
seal.deck.reload(); // 重新加载牌堆。

// v1.2 起提供的接口。
seal.newMessage(); // 返回一个空白 Message 对象，结构与收到消息的 msg 相同。
seal.createTempCtx(endpoint, msg); // 创建临时 ctx，至少需要正确设置消息类型和发送者 ID。
seal.applyPlayerGroupCardByTemplate(ctx, tmpl); // 设置当前玩家的自动群名片格式。
seal.gameSystem.newTemplate(jsonText); // 从 JSON 解析并注册新的游戏规则模板。
seal.gameSystem.newTemplateByYaml(yamlText); // 从 YAML 解析并注册新的游戏规则模板。
atob(base64String); // 解码 Base64 字符串并返回结果。
btoa(string); // 将字符串编码为 Base64 并返回结果。

// v1.4.1 起提供的插件配置接口。
seal.ext.newConfigItem(ext, key, defaultValue, description); // 创建复杂配置项对象。
seal.ext.registerConfig(ext, ...items); // 注册一个或多个复杂配置项。
seal.ext.getConfig(ext, key); // 获取完整配置项。
seal.ext.registerStringConfig(ext, key, defaultValue, description, group); // 注册 string 配置项。
seal.ext.registerIntConfig(ext, key, defaultValue, description, group); // 注册 int 配置项。
seal.ext.registerFloatConfig(ext, key, defaultValue, description, group); // 注册 float 配置项。
seal.ext.registerBoolConfig(ext, key, defaultValue, description, group); // 注册 bool 配置项。
seal.ext.registerTemplateConfig(ext, key, defaultValue, description, group); // 注册 template 配置项。
seal.ext.registerOptionConfig(ext, key, defaultValue, options, description, group); // 注册 option 配置项。
seal.ext.getStringConfig(ext, key); // 获取 string 配置项的值。
seal.ext.getIntConfig(ext, key); // 获取 int 配置项的值。
seal.ext.getFloatConfig(ext, key); // 获取 float 配置项的值。
seal.ext.getBoolConfig(ext, key); // 获取 bool 配置项的值。
seal.ext.getTemplateConfig(ext, key); // 获取 template 配置项的值。
seal.ext.getOptionConfig(ext, key); // 获取 option 配置项的值。

// v1.4.4 起提供的接口。
seal.setPlayerGroupCard(ctx, tmpl); // 立即设置当前玩家的群名片。
seal.ban.addBan(ctx, id, place, reason); // 将目标加入黑名单。
seal.ban.addTrust(ctx, id, place, reason); // 将目标加入信任名单。
seal.ban.remove(ctx, id); // 从黑名单或信任名单中移除目标。
seal.ban.getList(); // 获取名单条目列表。
seal.ban.getUser(id); // 获取指定目标的名单信息。

// vA.B.C 核验和补充的接口；实际版本见本节 LatestVersion 标记。
seal.ext.registerTask(ext, taskType, value, callback, key, description, group); // 注册 cron 或 daily 定时任务。
seal.getVersion(); // 返回版本号、版本代码和结构化版本详情。
seal.getEndPoints(); // 返回当前接入端点列表的浅拷贝。
ext.getPackageConfig(); // 获取扩展所属 .sealpack 的包级配置；不属于扩展包时返回空对象。
new WebSocket(url, protocols); // 创建 WebSocket 客户端连接，protocols 可省略。
```

## 消息与回复

```javascript
seal.replyGroup(ctx, msg, text);
seal.replyPerson(ctx, msg, text);
seal.replyToSender(ctx, msg, text);
seal.format(ctx, expression);
seal.formatTmpl(ctx, templateKey);
```

- `replyGroup` 只向群聊回复，私聊中调用不会发送消息。
- `replyPerson` 向消息发送者私聊回复。
- `replyToSender` 在群聊中回复群聊，在私聊中回复私聊。
- `format` 执行 DiceScript 表达式并返回文本，不会自动发送消息。
- `formatTmpl` 按文案键读取并格式化自定义文案。

平台不支持或机器人没有相应权限时，`memberBan`、`memberKick` 等群管理接口会失败。插件不应假定所有接入方式都支持群管理操作。

## 变量

```javascript
const [count, countExists] = seal.vars.intGet(ctx, '$m计数');
seal.vars.intSet(ctx, '$m计数', count + 1);

const [text, textExists] = seal.vars.strGet(ctx, '$g公告');
seal.vars.strSet(ctx, '$g公告', '今晚开团');
```

`intGet` 和 `strGet` 返回 `[值, 是否存在且类型匹配]`。变量前缀和作用域见
[变量](./script.md#变量)。

## 扩展与指令

```javascript
let ext = seal.ext.find('example');
if (!ext) {
  ext = seal.ext.new('example', 'author', '1.0.0');
  seal.ext.register(ext);
}

const cmd = seal.ext.newCmdItemInfo();
cmd.name = 'example';
cmd.help = 'example <参数>';
cmd.solve = (ctx, msg, cmdArgs) => {
  seal.replyToSender(ctx, msg, cmdArgs.getArgN(1));
  return seal.ext.newCmdExecuteResult(true);
};
ext.cmdMap.example = cmd;
```

内置扩展和内置指令不能被 JS 插件覆盖。`help` 和 `all` 也是保留的扩展名，不应作为插件注册名。

## 配置项

从 <Badge type="tip" text="v1.6.0"/> 起，以下注册函数支持末尾的 `description` 和 `group` 参数。`group` 非空时，WebUI 会把配置项放入对应的二级配置页签。

```javascript
seal.ext.registerStringConfig(ext, key, defaultValue, description, group);
seal.ext.registerIntConfig(ext, key, defaultValue, description, group);
seal.ext.registerFloatConfig(ext, key, defaultValue, description, group);
seal.ext.registerBoolConfig(ext, key, defaultValue, description, group);
seal.ext.registerTemplateConfig(ext, key, defaultValue, description, group);
seal.ext.registerOptionConfig(ext, key, defaultValue, options, description, group);
```

读取时可以使用对应类型的 `getStringConfig`、`getIntConfig`、`getFloatConfig`、
`getBoolConfig`、`getTemplateConfig`、`getOptionConfig`，也可以通过 `getConfig` 读取完整配置项。

复杂配置可先使用 `seal.ext.newConfigItem(ext, key, defaultValue, description)` 创建，设置
`type`、`option`、`group` 等字段后，再用 `seal.ext.registerConfig(ext, ...items)` 注册。

完整示例见[注册插件配置项](./js_example.md#注册插件配置项)。

## 定时任务

```javascript
seal.ext.registerTask(
  ext,
  'daily',
  '08:30',
  (taskCtx) => console.log(taskCtx.now),
  'daily_news',
  '每日新闻发送时间',
  '推送设置',
);
```

接口签名为：

```javascript
seal.ext.registerTask(ext, taskType, value, callback, key, description, group);
```

`taskType` 支持 `cron` 和 `daily`。填写 `key` 后，任务时间可在 WebUI 中配置；从 <Badge type="tip" text="v1.6.0"/> 起，`group` 可用于将任务配置放入二级页签。完整说明见[注册定时任务](./js_example.md#注册定时任务)。

## 版本与端点 <Badge type="tip" text="v1.6.0"/>

```javascript
const version = seal.getVersion();
console.log(version.versionCode);
console.log(version.version);
console.log(version.versionSimple);
console.log(version.versionDetail.major);

const endpoints = seal.getEndPoints();
```

`versionDetail` 包含 `major`、`minor`、`patch`、`prerelease` 和 `buildMetaData`。`getEndPoints()` 返回当前端点列表的浅拷贝；列表中的端点对象仍指向运行时对象，插件不应随意修改。

## 临时消息与上下文 <Badge type="tip" text="v1.6.0"/>

主动发送消息前，可以根据端点构造临时上下文：

```javascript
const endpoint = seal.getEndPoints().find((item) => item.userId === targetBotId);
if (endpoint) {
  const msg = seal.newMessage();
  msg.messageType = 'private';
  msg.platform = endpoint.platform;
  msg.sender.userId = targetUserId;

  const tempCtx = seal.createTempCtx(endpoint, msg);
  seal.replyPerson(tempCtx, msg, '定时通知');
}
```

`createTempCtx` 至少依赖正确的 `messageType` 和 `sender.userId`；群消息还应设置 `groupId`。平台 ID 必须使用相应接入端认可的完整格式。临时上下文不会替插件补齐不存在的用户、群或平台权限。

## 代骰上下文

```javascript
const first = seal.getCtxProxyFirst(ctx, cmdArgs);
const third = seal.getCtxProxyAtPos(ctx, cmdArgs, 2);
```

位置从 `0` 开始。没有对应的 @ 对象时，应先判断返回值再访问 `player` 等字段。

## 角色卡 `actor` 对象 <Badge type="tip" text="v1.6.0"/>

从 <Badge type="tip" text="v1.6.0"/> 起，DiceScript/RollVM 会注入 `actor` 角色卡对象。它不是普通 JavaScript 全局对象，JS 插件可以在 `seal.format(ctx, expression)` 等 DiceScript 求值场景中使用它：

```javascript
const dex = seal.format(ctx, '{actor.DEX}');
```

在 DiceScript 表达式中也可以写入属性，例如 `actor.DEX = 60`，随后读取 `actor.敏捷` 会得到按规则模板归一化后的值。

属性名会经过当前规则模板的别名转换，例如 CoC 中的 `DEX` 会解析为 `敏捷`。对象支持属性和索引读写，以及 `keys()`、`values()`、`items()`、`len()`、`has()`、`get()`、`getRaw()`。`get()` 会计算计算型属性，`getRaw()` 保留原始计算值。

只提供 `actor`；旧名称 `player` 和 `character` 不会注入 DiceScript。直接访问确实不存在的属性会得到 `0`，需要区分“不存在”时应使用 `has()` 或 `get()`。

## 游戏系统模板

```javascript
seal.gameSystem.newTemplate(jsonText);
seal.gameSystem.newTemplateByYaml(yamlText);
```

两种接口分别从 JSON 或 YAML 注册规则模板。模板名称与现有模板冲突、内容无效或字段不完整时会返回错误；插件应在加载日志中报告失败，不应继续注册依赖该模板的指令。详见[编写新的 TRPG 规则](./js_gamesystem.md)。

## 扩展包配置 <Badge type="tip" text="v1.6.0"/>

扩展属于 `.sealpack` 时，可以读取清单中声明并由用户填写的包级配置：

```javascript
const packageConfig = ext.getPackageConfig();
const apiBase = packageConfig.api_base ?? 'https://example.com';
```

普通单文件插件、未关联扩展包或读取失败时返回空对象。扩展包配置与上述 JS 插件配置项不同：前者来自扩展包清单，后者由脚本调用 `registerXXXConfig` 注册。用户侧说明见[扩展包与商店](../config/package.md)。

## WebSocket 客户端 <Badge type="tip" text="v1.5.1"/>

JS 运行时提供全局 `WebSocket` 构造函数，用于连接 `ws://` 或 `wss://` 服务。它是浏览器 WebSocket API 的客户端子集，不需要从 `seal` 对象调用。

```javascript
const socket = new WebSocket(url, protocols);
```

- `url: string`：WebSocket 服务地址。
- `protocols?: string | string[]`：可选的子协议，服务端选中的值可在连接成功后从 `socket.protocol` 读取。

### 状态与属性

| 属性或常量 | 类型或值 | 说明 |
| --- | --- | --- |
| `socket.url` | `string` | 构造连接时使用的地址，只读 |
| `socket.protocol` | `string` | 服务端选中的子协议，未选择时为空字符串，只读 |
| `socket.readyState` | `number` | 当前连接状态，只读 |
| `WebSocket.CONNECTING` | `0` | 正在连接 |
| `WebSocket.OPEN` | `1` | 已连接，可以发送消息 |
| `WebSocket.CLOSING` | `2` | 正在关闭 |
| `WebSocket.CLOSED` | `3` | 已关闭或连接失败 |

### 方法

```javascript
socket.send(message);
socket.close(code, reason);
socket.addEventListener(type, listener);
socket.removeEventListener(type, listener);
```

- `send(message: string)` 发送文本消息。连接不处于 `OPEN` 状态或发送失败时会触发 `error` 事件；当前接口不发送二进制消息。
- `close(code = 1000, reason = '')` 主动关闭连接并触发 `close` 事件。
- `addEventListener(type, listener)` 添加事件监听器。同一事件不会重复添加同一个函数。
- `removeEventListener(type, listener)` 移除先前添加的同一个监听函数。

### 事件

可以设置 `onopen`、`onmessage`、`onerror`、`onclose`，也可以通过 `addEventListener` 监听对应的 `open`、`message`、`error`、`close`。属性处理器先执行，随后按添加顺序执行监听器。

| 事件 | 额外字段 | 说明 |
| --- | --- | --- |
| `open` | 无 | 连接建立完成 |
| `message` | `data` | 文本帧为字符串，二进制帧为字节数据 |
| `error` | `error: string` | 连接或发送错误；`error` 是错误文本，不是 `Error` 对象 |
| `close` | `code`、`reason`、`wasClean` | 关闭状态；当前运行时可能将远端断开统一报告为 `1006` 和 `connection lost` |

所有事件都包含 `type`、`target` 和 `currentTarget`，其中后两者均为当前连接对象。连接建立失败时会进入 `CLOSED` 并触发 `error`，插件不应只依赖 `close` 处理失败。

插件重载或 JS 运行时重建时，海豹会关闭此前创建的全部 WebSocket。插件不再使用某个连接时也应主动调用 `close()`。当前接口不提供 WebSocket 服务端、自定义握手请求头、二进制发送、`binaryType`、`bufferedAmount` 或浏览器 WebSocket 的其他完整能力。

::: warning WSS 证书校验

当前运行时会跳过 `wss://` 服务端证书校验。连接仍会加密，但插件无法据此确认服务端身份；不要仅依赖该连接传输敏感凭据。

:::

## 牌堆、黑名单与规则

```javascript
const draw = seal.deck.draw(ctx, '牌堆名', false);
seal.deck.reload();

seal.ban.addBan(ctx, id, place, reason);
seal.ban.addTrust(ctx, id, place, reason);
seal.ban.remove(ctx, id);
seal.ban.getUser(id);
seal.ban.getList();

const rule = seal.coc.newRule();
seal.coc.registerRule(rule);
```

`seal.deck.draw` 返回包含 `exists`、`result` 和 `err` 的对象。自定义 CoC 规则的完整写法请参考
[官方示例仓库](https://github.com/sealdice/javascript/tree/main/examples_ts)。

## 常用对象

字段使用 JS 绑定后的驼峰命名。对象字段会随核心版本和接入平台变化，完整定义应以 `seal.d.ts` 为准。为兼容不同平台，不要只根据 QQ 的 ID 形式推断用户或群组类型。

### `ctx` 的内容

```javascript
// 成员。
ctx.group; // 当前群信息对象；私聊时可能为空。
ctx.player; // 当前玩家数据对象。
ctx.endPoint; // 当前接入端点对象。
ctx.isCurGroupBotOn; // bool，当前群是否开启骰子。
ctx.isPrivate; // bool，当前消息是否为私聊。
ctx.privilegeLevel; // int，权限等级：40 邀请者、50 管理、60 群主、70 信任、100 Master。
ctx.delegateText; // string，代骰附加文本。
ctx.commandHideFlag; // string，暗骰标记；填写群 ID 可将私聊回复记入对应 log。

// 角色卡与变量相关方法；具体参数和返回值以 seal.d.ts 为准。
ctx.chBindCur;
ctx.chBindCurGet;
ctx.chBindGet;
ctx.chBindGetList;
ctx.chExists;
ctx.chGet;
ctx.chLoad;
ctx.chNew;
ctx.chUnbind;
ctx.chUnbindCur;
ctx.chVarsClear;
ctx.chVarsGet;
ctx.chVarsNumGet;
ctx.chVarsUpdateTime;
ctx.loadGroupVars;
ctx.loadPlayerGlobalVars;
ctx.loadPlayerGroupVars;
```

### `ctx.group` 的内容

```javascript
// 成员。
ctx.group.active; // 当前群是否处于活动状态。
ctx.group.groupId; // 群 ID。
ctx.group.guildId; // 频道或服务器 ID。
ctx.group.groupName; // 群名称。
ctx.group.cocRuleIndex; // 当前 CoC 房规序号。
ctx.group.logCurName; // 当前日志名称。
ctx.group.logOn; // 是否正在记录日志。
ctx.group.recentDiceSendTime; // 最近一次发送骰子消息的时间。
ctx.group.showGroupWelcome; // 是否发送入群欢迎词。
ctx.group.groupWelcomeMessage; // 入群欢迎词。
ctx.group.enteredTime; // 骰子进入群的时间。
ctx.group.inviteUserId; // 邀请骰子入群的用户 ID。

// 方法；具体参数和返回值以 seal.d.ts 为准。
ctx.group.extActive;
ctx.group.extClear;
ctx.group.extGetActive;
ctx.group.extInactive;
ctx.group.extInactiveByName;
ctx.group.getCharTemplate;
ctx.group.isActive;
ctx.group.playerGet;
```

### `ctx.player` 的内容

```javascript
// 成员。
ctx.player.name; // 当前玩家名称。
ctx.player.userId; // 当前玩家的用户 ID。
ctx.player.lastCommandTime; // 最近一次执行指令的时间。
ctx.player.autoSetNameTemplate; // 自动群名片模板。

// 方法。
ctx.player.getValueNameByAlias; // 根据规则模板别名取得规范属性名。
```

### `ctx.endPoint` 的内容

```javascript
// 成员。
ctx.endPoint.baseInfo; // 接入点基础信息。
ctx.endPoint.id; // 接入点 ID。
ctx.endPoint.nickname; // 机器人昵称。
ctx.endPoint.state; // 接入点状态。
ctx.endPoint.userId; // 机器人用户 ID。
ctx.endPoint.groupNum; // 已加入群数量。
ctx.endPoint.cmdExecutedNum; // 已执行指令数量。
ctx.endPoint.cmdExecutedLastTime; // 最近一次执行指令的时间。
ctx.endPoint.onlineTotalTime; // 累计在线时间。
ctx.endPoint.platform; // 平台标识。
ctx.endPoint.enable; // 是否启用接入点。

// 方法；不应在不了解运行时影响时主动修改端点。
ctx.endPoint.adapterSetup;
ctx.endPoint.refreshGroupNum;
ctx.endPoint.setEnable;
ctx.endPoint.unmarshalYAML;
```

### `msg` 的内容

```javascript
// 成员。
msg.time; // int64，发送时间。
msg.messageType; // string，group 表示群聊，private 表示私聊。
msg.groupId; // string，群聊中的群 ID。
msg.guildId; // string，Discord、KOOK、DoDo 等平台的服务器或频道组 ID。
msg.sender; // 发送者信息对象。
msg.sender.nickname; // 发送者昵称。
msg.sender.userId; // 发送者用户 ID。
msg.message; // 消息正文。
msg.rawId; // 原始消息 ID，可用于撤回等平台操作。
msg.platform; // 消息来源平台。

// 原文未列出稳定的 msg 方法；使用前应查阅 seal.d.ts。
```

### `cmdArgs` 的内容

```javascript
// 成员。
cmdArgs.command; // string，指令名。
cmdArgs.args; // string[]，位置参数。
cmdArgs.kwargs; // Kwarg[]，关键字参数。
cmdArgs.at; // AtInfo[]，消息中的 @ 信息。
cmdArgs.rawArgs; // string，原始参数文本。
cmdArgs.amIBeMentioned; // bool，骰子是否被 @。
cmdArgs.cleanArgs; // string，归一化分隔符后的参数文本。
cmdArgs.specialExecuteTimes; // int，对应 3# 等特殊执行次数。

// 方法。
cmdArgs.isArgEqual(n, ...values); // 检查第 n 个参数是否匹配给定值之一。
cmdArgs.eatPrefixWith(...values); // 从 cleanArgs 中移除匹配的前缀。
cmdArgs.chopPrefixToArgsWith(...values); // 按匹配前缀重新切分参数；使用前请核对类型声明。
cmdArgs.getArgN(n); // 返回第 n 个参数字符串。
cmdArgs.getKwarg(name); // 返回指定名称的关键字参数；不存在时返回空值。
cmdArgs.getRestArgsFrom(n); // 从第 n 个参数开始，以空格拼接剩余参数。
```

## 核验入口

- [JS 插件模板与类型声明](https://github.com/sealdice/sealdice-js-ext-template)
- [JS API 运行时实现](https://github.com/sealdice/sealdice-core/blob/master/dice/dice_jsvm.go)
- [扩展运行时对象](https://github.com/sealdice/sealdice-core/blob/master/dice/ext.go)
- [官方插件示例](https://github.com/sealdice/javascript/tree/main/examples_ts)
