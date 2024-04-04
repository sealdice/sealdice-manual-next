---
lang: zh-cn
title: 牌堆 自定义回复
---

# 牌堆 自定义回复

::: info 本节内容

本节将展示牌堆和自定义回复相关的指令，请善用侧边栏和搜索，按需阅读文档。

:::

::: tip 提示：如何自定义？

牌堆和自定义回复都是海豹提供的扩展性功能，此处只展示相关控制指令，如果你想知道如何进行自定义，请转到 [进阶介绍](../advanced/introduce.md)。

:::

## `.draw` 抽牌 / 管理牌堆

关于牌堆功能的一般性介绍，请参阅 [配置 - 牌堆](../config/deck.md)。

`.draw help` 显示帮助信息。

### 信息查询

`.draw list` 列出当前装载的牌堆列表。

`.draw keys <牌堆>` 查看特定牌堆可抽取的牌组列表。

`.draw search <牌组名称>` 模糊搜索指定牌组。

`.draw desc <牌组名称>` 查看牌组所属牌堆的详细信息。

::: info 示例

<ChatBox :messages="[
{content: '.draw list', send: true},
{content: '载入并开启的牌堆:\n- GRE单词 格式: Dice! 作者:于言诺 版本:1.0.1 牌组数量: 1\n- IELTS单词 格式: Dice! 作者:于言诺 版本:1.0.1 牌组数量: 1\n- TOEFL单词 格式: Dice! 作者:于言诺 版本:1.0.1 牌组数量: 1\n- SealDice内置牌堆 格式: Dice! 作者:<因过长略去> 版本:1.2.0 牌组数量: 8'},
{content: '.draw keys GRE单词', send: true},
{content: '牌组关键字列表:\nGRE单词'},
{content: '.draw search 单词', send: true},
{content: '找到以下牌组:\n- GRE单词\n- TOEFL单词\n- IELTS单词'},
{content: '.draw desc GRE单词', send: true},
{content: '牌堆信息:\n牌堆: GRE单词\n格式: Dice!\n作者: 于言诺\n版本: 1.0.1\n牌组数量: 1\n时间: 2022/5/23\n更新时间: 2022/8/16\n牌组: GRE单词'},
]" />

:::

<!--  autocorrect-disable: GRE单词 是牌堆名专词 -->
需要说明，在以上的例子中，「GRE单词」同时是牌堆名与牌组名。在 `.draw keys GRE单词` 中，它作为牌堆名出现；在 `.draw desc GRE单词` 中，它作为牌组名出现。
<!-- autocorrect-enable -->

`.draw keys` 列出所有可抽取的牌组列表。

::: warning 注意：谨慎使用

这一指令会将**所有**可抽取的牌组列出，在牌组较多时造成刷屏。

:::

### 抽牌

`.draw <牌组名称> (<数量>#)` 在指定牌组抽指定数量的牌，默认为抽 1 张。

::: info 示例

<ChatBox :messages="[
{content: '.draw GRE单词 3#', send: true},
{content: '<木落>抽出了：\nGRE3178\ninvoice n.\n发票, 发货单, 货物。'},
{content: '<木落>抽出了：\nGRE4889\nrig n.\n索具装备, 钻探设备, 钻探平台, 钻塔。'},
{content: '<木落>抽出了：\nGRE5421\nausterity n.\n严峻, 严厉, 朴素, 节俭, 苦行。'},
]" />

:::

当指定的牌组名称不存在时，将会进行模糊搜索，效果与 `draw search` 类似。

::: info 示例

<ChatBox :messages="[
{content: '.draw 单词', send: true},
{content: '找不到这个牌组，但发现一些相似的:\n- GRE单词\n- TOEFL单词\n- IELTS单词'},
]" />

:::

### 牌堆管理

`.draw reload` 重新加载牌堆，仅限 Master 使用。

## `.reply` 管理自定义回复

关于自定义回复功能的一般性介绍，请参阅 [配置 - 自定义回复](../config/reply.md)。

`.reply (on|off)` 开启、关闭本群的自定义回复功能。

以上指令等价于 `.ext reply (on|off)`。
