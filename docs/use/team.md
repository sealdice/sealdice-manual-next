---
lang: zh-cn
title: 队伍管理
---

# 队伍管理指令 <Badge type="tip" text="v1.5.0"/>

::: info 本节内容

从 <Badge type="tip" text="v1.5.0"/> 起，海豹支持了一系列队伍管理指令，方便用户管理团队成员，进行团队操作。

:::

## 管理指令

### 创建和管理队伍

`.team <团队名> add/del <@成员...>` 此指令用于增加或删除队伍成员。如果指定的团队名不存在，系统会自动创建一个新的团队。

`.team <团队名> clear` 此指令用于清空指定队伍中的所有成员。

::: info 示例

<!-- autocorrect-disable -->
<ChatBox :messages="[
{content: '.team 探险队 add @玩家1 @玩家2', send: true},
{content: '已经添加2名玩家至团队探险队'},
{content: '.team 探险队 del @玩家1', send: true},
{content: '已经从团队探险队删除1名玩家'},
{content: '.team 探险队 clear', send: true},
{content: '清空了团队探险队'}
]"/>
<!-- autocorrect-enable -->

:::

### 呼叫队伍成员

`.team <团队名> call` 此指令会艾特（@）队伍中的所有成员，可用于通知全体队员。

### 随机抽取队员

`.team <团队名> draw [<数量>]` 此指令用于从队伍中随机抽取指定数量的成员。如果不指定数量，默认抽取 1 名成员。

### 查看队员属性

`.team <团队名> <属性>` 此指令用于列出队伍中所有成员的指定属性值。属性名与角色卡中的属性名对应。

<!-- autocorrect-disable -->
<ChatBox :messages="[
{content: '.team 探险队 call', send: true},
{content: '呼叫探险队：@玩家1 @玩家2'},
{content: '.team 探险队 draw', send: true},
{content: '从团队探险队中随机抽取到：@玩家2'},
{content: '.team 探险队 draw 2', send: true},
{content: '从团队探险队中随机抽取2名成员：@玩家1 @玩家2'},
{content: '.team 探险队 侦察', send: true},
{content: '队伍探险队的属性：\n侦察 60 @玩家1\n侦察 55 @玩家2'}
]"/>
<!-- autocorrect-enable -->
