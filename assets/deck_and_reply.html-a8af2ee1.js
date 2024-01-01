import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as l,c as h,a as e,d as n,b as t,w as a,f as d,e as r}from"./app-d6b81ca0.js";const _={},p=e("h1",{id:"牌堆-自定义回复",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#牌堆-自定义回复","aria-hidden":"true"},"#"),n(" 牌堆 自定义回复")],-1),u=e("div",{class:"hint-container info"},[e("p",{class:"hint-container-title"},"本节内容"),e("p",null,"本节将展示牌堆和自定义回复相关的指令，请善用侧边栏和搜索，按需阅读文档。")],-1),f={class:"hint-container tip"},w=e("p",{class:"hint-container-title"},"如何自定义？",-1),E=e("h2",{id:"draw-抽牌-管理牌堆",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#draw-抽牌-管理牌堆","aria-hidden":"true"},"#"),n(),e("code",null,".draw"),n(" 抽牌 / 管理牌堆")],-1),m=r('<p><code>.draw help</code> 显示帮助信息。</p><h3 id="信息查询" tabindex="-1"><a class="header-anchor" href="#信息查询" aria-hidden="true">#</a> 信息查询</h3><p><code>.draw list</code> 列出当前装载的牌堆列表。</p><p><code>.draw keys &lt;牌堆&gt;</code> 查看特定牌堆可抽取的牌组列表。</p><p><code>.draw search &lt;牌组名称&gt;</code> 模糊搜索指定牌组。</p><p><code>.draw desc &lt;牌组名称&gt;</code> 查看牌组所属牌堆的详细信息。</p>',6),R={class:"hint-container note"},g=e("p",{class:"hint-container-title"},"示例",-1),G=e("p",null,[n("需要说明，在以上的例子中，「GRE单词」同时是牌堆名与牌组名。在 "),e("code",null,".draw keys GRE单词"),n(" 中，它作为牌堆名出现；在 "),e("code",null,".draw desc GRE单词"),n(" 中，它作为牌组名出现。")],-1),x=r('<p><code>.draw keys</code> 列出所有可抽取的牌组列表。</p><div class="hint-container warning"><p class="hint-container-title">谨慎使用</p><p>这一指令会将<strong>所有</strong>可抽取的牌组列出，在牌组较多时造成刷屏。</p></div><h3 id="抽牌" tabindex="-1"><a class="header-anchor" href="#抽牌" aria-hidden="true">#</a> 抽牌</h3><p><code>.draw &lt;牌组名称&gt; (&lt;数量&gt;#)</code> 在指定牌组抽指定数量的牌，默认为抽 1 张。</p>',4),y={class:"hint-container note"},v=e("p",{class:"hint-container-title"},"示例",-1),k=e("p",null,[n("当指定的牌组名称不存在时，将会进行模糊搜索，效果与 "),e("code",null,"draw search"),n(" 类似。")],-1),b={class:"hint-container note"},L=e("p",{class:"hint-container-title"},"示例",-1),T=e("h3",{id:"牌堆管理",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#牌堆管理","aria-hidden":"true"},"#"),n(" 牌堆管理")],-1),D=e("p",null,[e("code",null,".draw reload"),n(" 重新加载牌堆，仅限 Master 使用。")],-1),B=e("h2",{id:"reply-管理自定义回复",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#reply-管理自定义回复","aria-hidden":"true"},"#"),n(),e("code",null,".reply"),n(" 管理自定义回复")],-1),C=e("p",null,[e("code",null,".reply (on|off)"),n(" 开启、关闭本群的自定义回复功能。")],-1),N=e("p",null,[n("以上指令等价于 "),e("code",null,".ext reply (on|off)"),n("。")],-1);function S(V,F){const o=s("RouterLink"),c=s("ChatBox");return l(),h("div",null,[p,u,e("div",f,[w,e("p",null,[n("牌堆和自定义回复都是海豹提供的扩展性功能，此处只展示相关控制指令，如果你想知道如何进行自定义，请转到 "),t(o,{to:"/advanced/introduce.html"},{default:a(()=>[n("进阶介绍")]),_:1}),n("。")])]),E,e("p",null,[n("关于牌堆功能的一般性介绍，请参阅 "),t(o,{to:"/config/deck.html"},{default:a(()=>[n("配置 - 牌堆")]),_:1}),n("。")]),m,e("div",R,[g,t(c,{messages:[{content:".draw list",send:!0},{content:`载入并开启的牌堆:
- GRE单词 格式: Dice! 作者:于言诺 版本:1.0.1 牌组数量: 1
- IELTS单词 格式: Dice! 作者:于言诺 版本:1.0.1 牌组数量: 1
- TOEFL单词 格式: Dice! 作者:于言诺 版本:1.0.1 牌组数量: 1
- SealDice内置牌堆 格式: Dice! 作者:<因过长略去> 版本:1.2.0 牌组数量: 8`},{content:".draw keys GRE单词",send:!0},{content:`牌组关键字列表:
GRE单词`},{content:".draw search 单词",send:!0},{content:`找到以下牌组:
- GRE单词
- TOEFL单词
- IELTS单词`},{content:".draw desc GRE单词",send:!0},{content:`牌堆信息:
牌堆: GRE单词
格式: Dice!
作者: 于言诺
版本: 1.0.1
牌组数量: 1
时间: 2022/5/23
更新时间: 2022/8/16
牌组: GRE单词`}]},null,8,["messages"])]),d("  autocorrect-disable: GRE单词 是牌堆名专词 "),G,d(" autocorrect-enable "),x,e("div",y,[v,t(c,{messages:[{content:".draw GRE单词 3#",send:!0},{content:`<木落>抽出了：
GRE3178
invoice n.
发票, 发货单, 货物。`},{content:`<木落>抽出了：
GRE4889
rig n.
索具装备, 钻探设备, 钻探平台, 钻塔。`},{content:`<木落>抽出了：
GRE5421
austerity n.
严峻, 严厉, 朴素, 节俭, 苦行。`}]},null,8,["messages"])]),k,e("div",b,[L,t(c,{messages:[{content:".draw 单词",send:!0},{content:`找不到这个牌组，但发现一些相似的:
- GRE单词
- TOEFL单词
- IELTS单词`}]},null,8,["messages"])]),T,D,B,e("p",null,[n("关于自定义回复功能的一般性介绍，请参阅 "),t(o,{to:"/config/reply.html"},{default:a(()=>[n("配置 - 自定义回复")]),_:1}),n("。")]),C,N])}const M=i(_,[["render",S],["__file","deck_and_reply.html.vue"]]);export{M as default};
