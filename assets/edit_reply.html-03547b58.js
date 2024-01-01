import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as v,c as m,a as e,d as n,b as i,w as t,f as h,e as c}from"./app-d6b81ca0.js";const b="/sealdice-manual-next/assets/edit-reply-random-pic-d4a0463d.png",$="/sealdice-manual-next/assets/edit-reply-single-person-mod1-830dda41.png",x="/sealdice-manual-next/assets/edit-reply-single-person-mod2-76ef5a70.png",g="/sealdice-manual-next/assets/edit-reply-single-person-mod3-023a3e78.png",f={},_=e("h1",{id:"编写自定义回复",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#编写自定义回复","aria-hidden":"true"},"#"),n(" 编写自定义回复")],-1),y={class:"hint-container info"},q=e("p",{class:"hint-container-title"},"本节内容",-1),k=e("p",null,"本节将展示自定义回复编写的进阶部分，请善用侧边栏和搜索，按需阅读文档。",-1),R=e("p",null,"在部分内容中，我们假定你了解海豹变量机制和正则表达式。如果你对正则表达式还很陌生，可以阅读以下教程或在互联网自行搜索学习。",-1),D={href:"https://www.runoob.com/regexp/regexp-tutorial.html",target:"_blank",rel:"noopener noreferrer"},A=e("h2",{id:"第一个自定义回复",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#第一个自定义回复","aria-hidden":"true"},"#"),n(" 第一个自定义回复")],-1),P=e("p",null,"首先我们打开「自定义回复」页，新建一项自定义回复。",-1),C=e("div",{class:"hint-container tip"},[e("p",{class:"hint-container-title"},"使用 .text 帮助测试"),e("p",null,[e("code",null,".text <文本>"),n(" 将是你的一大助力，它会输出后面文本的执行结果，你可以将它看成不需要触发词的自定义回复。")]),e("p",null,[n("当然，在采用 "),e("code",null,".text"),n(" 指令进行 debug 时，可能出现因为测试的内容对变量造成影响，而不得不频繁复制黏贴清空指令的情况。此时建议专门开一个一两个字即可触发的自定义回复，用来测试。")])],-1),B={class:"hint-container tip"},S=e("p",{class:"hint-container-title"},"嵌入 CQ 码",-1),W={href:"https://docs.go-cqhttp.org/cqcode",target:"_blank",rel:"noopener noreferrer"},w=c(`<h2 id="触发条件" tabindex="-1"><a class="header-anchor" href="#触发条件" aria-hidden="true">#</a> 触发条件</h2><h3 id="文本匹配-模糊匹配" tabindex="-1"><a class="header-anchor" href="#文本匹配-模糊匹配" aria-hidden="true">#</a> 文本匹配：模糊匹配</h3><p>模糊匹配将比较收到的消息与指定文本，内容相似时触发。</p><p>比较定义在 <code>dice/ext_reply_logic.go</code> 中，内容 jaro 和 hamming 平均值高于阈值（0.7）被认为是相似：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">strCompare</span><span class="token punctuation">(</span>a <span class="token builtin">string</span><span class="token punctuation">,</span> b <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">float64</span> <span class="token punctuation">{</span>
	va <span class="token operator">:=</span> strsim<span class="token punctuation">.</span><span class="token function">Compare</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> strsim<span class="token punctuation">.</span><span class="token function">Jaro</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	vb <span class="token operator">:=</span> strsim<span class="token punctuation">.</span><span class="token function">Compare</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> strsim<span class="token punctuation">.</span><span class="token function">Hamming</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token punctuation">(</span>va <span class="token operator">+</span> vb<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">模糊匹配未命中</p><p>模糊匹配可能出现感觉能匹配上，但实际上没办法匹配上的情况。我们更建议你使用「包含文本」或「正则匹配」。</p></div><h3 id="文本匹配-正则匹配" tabindex="-1"><a class="header-anchor" href="#文本匹配-正则匹配" aria-hidden="true">#</a> 文本匹配：正则匹配</h3><p>使用正则匹配时，直接在要匹配的文本一栏中写入正则表达式即可。</p><p>正则匹配可以将回复中的一部分存入变量中以备调用：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>正则匹配：^购买(.+)
输出文本：{$t玩家}购买了{$t1}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,10),T={class:"hint-container note"},F=e("p",{class:"hint-container-title"},"示例",-1),Q=c('<p>正则匹配会将满足匹配的整条消息存入 <code>$t0</code>，而正则中的分组会按顺序存入 <code>$t1</code> <code>$t2</code> 等中。在如上例子中，就是将 <code>购买</code> 后用括号括起来的部分存入了 <code>$t1</code> 中，从而可以进行调用。</p><p>如额外存在组名，如 <code>(?P&lt;A&gt;cc)</code>，将会额外存入 <code>$tA</code>。</p><div class="hint-container warning"><p class="hint-container-title">不要使用某些前缀！</p><p>由于 <code>.</code> <code>。</code> <code>/</code> <code>!</code> 等符号会作为海豹中指令的前缀，因此作为前缀时可能导致将其识别为指令而非自定义回复的情况，建议换成别的前缀。</p></div><div class="hint-container tip"><p class="hint-container-title">正则中匹配 CQ 码</p><p>海豹支持用正则匹配 CQ 码，但是如果你这么做了，请在 <code>[</code> <code>]</code> 前面进行转义。</p><p>示例：<code>^\\[CQ:xxx,xx=xxx\\]</code></p></div><h3 id="表达式为真" tabindex="-1"><a class="header-anchor" href="#表达式为真" aria-hidden="true">#</a> 表达式为真</h3><p>在「表达式为真」匹配中，只需要直接在匹配文本中写出形如 <code>变量名 == 需要的值</code> 的形式即可，不需要使用任何 <code>{}</code> 。</p><h2 id="回复结果" tabindex="-1"><a class="header-anchor" href="#回复结果" aria-hidden="true">#</a> 回复结果</h2>',7),L=e("h3",{id:"嵌入脚本语言",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#嵌入脚本语言","aria-hidden":"true"},"#"),n(" 嵌入脚本语言")],-1),E={class:"hint-container note"},N=e("p",{class:"hint-container-title"},"示例",-1),V=c(`<div class="hint-container tip"><p class="hint-container-title">未赋值的变量</p><p>所有变量在未被赋值时被调用的值都为 0。</p></div><h3 id="执行块" tabindex="-1"><a class="header-anchor" href="#执行块" aria-hidden="true">#</a> 执行块</h3><p><code>{% %}</code> 被称为执行块。由 <code>{% %}</code> 括起来的部分会被作为代码执行，输出最后一个语句的结果。执行块中的两个语句之间要使用 <code>;</code> 隔开。</p><p>如果想要输出字符串，则应该用 <code>\`</code> / <code>&quot;</code> / <code>&#39;</code> 括上。</p><ul><li>例：形如 <code>{% \\$t1=&quot;114514&quot; %}</code> 的式子会输出 <code>114514</code>。</li></ul><div class="hint-container warning"><p class="hint-container-title">结果中调用变量</p><p>若想在结果中调用变量，请用反引号。目前海豹只支持在反引号中调用变量。</p></div><p>下面是一个简单的示例，这里的第一句也是最后一句，所以它的结果会被输出。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.text {% $t测试=1 %}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="示例-使用-if" tabindex="-1"><a class="header-anchor" href="#示例-使用-if" aria-hidden="true">#</a> 示例：使用 <code>if</code></h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{%  
$t测试=1;  
if $t测试==1 {$t输出=&quot;赞美木落&quot;};  
if $t测试==2 {$t输出=&quot;快点更新&quot;};  
if $t测试!=2&amp;&amp;$t测试!=1 {$t输出=&quot;群主女装&quot;}  
%}
{$t输出}  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先给 <code>$t测试</code>赋值为 1，然后进入判断：</p><ol><li>如果 <code>$t测试</code> 等于 1，则变量 <code>$t输出</code> 等于 <code>&quot;赞美木落&quot;</code>；</li><li>如果 <code>$t测试</code> 等于 2，则变量 <code>$t输出</code> 等于 <code>&quot;快点更新&quot;</code>；</li><li>如果 <code>$t测试</code> 既不等于 2 也不等于 1，则变量 <code>$t输出</code> 等于 <code>&quot;群主女装&quot;</code>;</li></ol><p>最后，输出变量 <code>$t输出</code>。</p><div class="hint-container tip"><p class="hint-container-title">容易误解的 if 使用</p><p>目前海豹语并不支持 <code>else if</code>，<code>if</code> 和 <code>else</code> 是一对一匹配的。所以当形如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if xxx {xxx};  
if xxx {xxx}  
else {xxx}  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>的语句出现时，并不是 <code>if elseif elseif else</code> 的关系！即使满足了第一个 <code>if</code>，其结果也是执行 <code>else</code> 中的内容！</p></div><h4 id="示例-变量运算" tabindex="-1"><a class="header-anchor" href="#示例-变量运算" aria-hidden="true">#</a> 示例：变量运算</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{%  
$t0=1;  
$tRand=d6;  
if $t0==1 {$t0=$t0+$tRand}  
%}  
{$t0}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子里，我们先给 <code>$t0</code> 赋值为 1，然后判断 <code>$t0</code> 是否等于 1，若通过则 <code>$t0</code> 的值增加 1d6，最后输出结果。</p><h2 id="更多示例片段" tabindex="-1"><a class="header-anchor" href="#更多示例片段" aria-hidden="true">#</a> 更多示例片段</h2><h3 id="牌堆与自定义回复的结合" tabindex="-1"><a class="header-anchor" href="#牌堆与自定义回复的结合" aria-hidden="true">#</a> 牌堆与自定义回复的结合</h3><p>以养猫功能中猫好感度为例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{% 
$mCatFavor&lt;=100 ? \`#{DRAW-第一档猫好感}\`,
$mCatFavor&lt;=250 ? \`#{DRAW-第二档猫好感}\` ,
$mCatFavor&lt;=600 ? \`#{DRAW-第三档猫好感}\` ,
$mCatFavor&lt;=1500 ? \`#{DRAW-第四档猫好感}\` ,
$mCatFavor&lt;=2500 ? \`#{DRAW-第五档猫好感}\` ,
1 ? \`#{DRAW-第六档猫好感}\`
%}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这一脚本中，根据猫好感度 <code>$mCatFavor </code>不同，需要输出不同回复的机制。</p><details class="hint-container details"><summary>其它写法</summary><p>除了形如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{% 
判断1 ? \`#{DRAW-牌组1}\`,
判断2 ? \`#{DRAW-牌组2}\`,
判断3 ? \`#{DRAW-牌组3}\`,
1 ? \`#{DRAW-牌组4}\`,
 %}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>的写法外，还可以使用：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{% 
if 判断1 {
  $tRand=d6;
  $t输出=$tRand==1?\`内容1\`,
  $t输出=$tRand==2?\`内容2\`,
  $t输出=$tRand==3?\`内容3\`,
  $t输出=$tRand==4?\`内容4\`,
  $t输出=$tRand==5?\`内容5\`,
  $t输出=$tRand==6?\`内容6\`
  };
if 判断2 {$tRand=d10;$t输出=$tRand==1?\`内容1\`,……};
if 判断3 {$tRand=d10;$t输出=$tRand==1?\`内容1\`,……};
 %}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实质上没有太大区别，可根据喜好选择。</p></details><h3 id="多回复行的错误使用" tabindex="-1"><a class="header-anchor" href="#多回复行的错误使用" aria-hidden="true">#</a> 多回复行的错误使用</h3><p>以踢海豹为例，这一自定义回复的多行输出实现上并不是：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{$t输出0}
{$t输出1}
{$t输出2}
{$t输出3}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而是在为四个 <code>$t输出</code> 变量赋值时，于内部写上 <code>\\n</code>，采用 <code>{$t输出0}{$t输出1}{$t输出2}{$t输出3}</code> 的形式。</p><p>这是因为如果某一变量可能为空时，如果采用第一种分行的写法，会出现这样的效果：</p>`,28),z={class:"hint-container note"},I=e("p",{class:"hint-container-title"},"示例",-1),j=c(`<p>可以看见，在中间会出现突兀的空行。这是因为虽然并没有在变量内部赋值 <code>\\n</code>，但是由于海豹读取时会按照写的格式读取，因此在应当是 <code>$t输出2</code> 的一行中，会照样调用 <code>{$t输出2}</code>，照常空行。</p><p>所以，如果想要某个变量为空时，看不出来这里应该存在什么，就最好多做几次实验，好好规划一下换行符 <code>\\n</code> 的位置。</p><h3 id="限定每人-每群每天一次" tabindex="-1"><a class="header-anchor" href="#限定每人-每群每天一次" aria-hidden="true">#</a> 限定每人/每群每天一次</h3><p>海豹提供了一系列时间变量来调用，以打卡指令为例，可以采用如下两种写法中的一种（示例为每人每天一次，如要每群自行将 <code>$m</code> 换成 <code>$g</code>）：</p><p><strong>写法 1</strong> 文本匹配：你需要的文本 表达式为真：<code>$m变量 != $tDate</code> 回复：<code>{if 1 {$m变量=$tDate}}你需要的回复文本</code></p><ul><li><code>$m变量</code> 作为标记变量，用 <code>if</code> 是防止它出现在回复文本中。</li></ul><p>文本匹配：你需要的文本 表达式为真：<code>$m变量==$tDate</code></p><ul><li>可以不写在另一条里，选择放到相较于上一条的后面，利用海豹从上往下逐个匹配的机制达成相同效果</li></ul><p>回复：<code>在一天触发多次时的回复</code></p><p><strong>写法 2</strong> 文本匹配：你需要的文本 回复：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{% 
if $m变量!=$tDate {
  $t输出=\`你需要的回复文本\`;
  $m变量=$tDate//对其赋值，作为标记
} else {
  $t输出=\`在一天触发多次时的回复\`
  }
 %}
{$t输出}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上两种写法实现效果没有差别，具体使用哪种请自行决断。</p><h3 id="条件语句嵌套条件算符-多条件条件语句" tabindex="-1"><a class="header-anchor" href="#条件语句嵌套条件算符-多条件条件语句" aria-hidden="true">#</a> 条件语句嵌套条件算符，多条件条件语句</h3><p>以石头剪刀布为例，为了实现骰子随机出招的效果，令 <code>$tRand=d3</code>，然后根据 <code>$tRand</code> 的情况赋值 <code>$tDicePlay</code>。通过骰子出招和玩家出招两个变量判断，输出游戏结果，并记录场次。</p><p>为了防止直接使用 <code>{%%}</code> 进行赋值导致的变量显示，需要在最外面写 <code>if 1</code> ，则在生成 <code>$tRand</code>之后再次判断的时候，可以使用 <code>$tDicePlay=条件算符</code>，或是再新开一行用条件算符或者条件语句实现。</p><p>以下给出在同一个 <code>if</code> 内直接赋值的写法和新开一行使用条件语句的写法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{% //在同一个if内直接赋值。可以在赋值时使用条件算符。
if 1 {
    $tRand=d3;
    $tDicePlay=$tRand==1?&quot;石头&quot;,
                $tRand==2?&quot;剪刀&quot;,
                1?&quot;布&quot;
    } 
%}

{% //新开一行赋值
if 1 {
    $tRand=d3;
    } ;
if $tRand==1 {$tDicePlay=&quot;石头&quot;};
if $tRand==2 {$tDicePlay=&quot;剪刀&quot;};
if $tRand==3 {$tDicePlay=&quot;布&quot;}
%}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>两种写法实现效果相同，石头剪刀布内在这里采用了第一种，实际上没有差别。</p><p>生成骰子出招并获取玩家出招之后，就开始判断。这里除了平局可以使用 <code>$tDicePlay==$t0</code> 省事之外，其他的都需要在条件中用多个进行嵌套。</p><div class="hint-container warning"><p class="hint-container-title">条件判断</p><p>豹语语法中，判断时条件中的 <code>||</code> 和 <code>&amp;&amp;</code> 是从左往右计算的，如果后面有需要优先计算与或的东西，请加好括号。</p></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if $t0==$tDicePlay {
    $t输出=\`那我出{$tDicePlay}！{$t玩家}出的是{$t0}啊，我们平局了。\`;
    $mPlayerTime=$mPlayerTime+1
    };
if $t0==&quot;剪刀&quot;&amp;&amp;$tDicePlay==&quot;石头&quot;||($t0==&quot;石头&quot;&amp;&amp;$tDicePlay==&quot;布&quot;)||($t0==&quot;布&quot;&amp;&amp;$tDicePlay==&quot;剪刀&quot;) {
     //后两个与需要单独计算，加上括号
    $t输出=\`那我出{$tDicePlay}！{$t玩家}出的是{$t0}啊，我赢了。\`;
    $mPlayerTime=$mPlayerTime+1;
    $mPlayerLose=$mPlayerLose+1
    };
if $t0==&quot;石头&quot;&amp;&amp;$tDicePlay==&quot;剪刀&quot;||($t0==&quot;布&quot;&amp;&amp;$tDicePlay==&quot;石头&quot;)||($t0==&quot;剪刀&quot;&amp;&amp;$tDicePlay==&quot;布&quot;) {
    $t输出=\`那我出{$tDicePlay}！{$t玩家}出的是{$t0}啊，你赢了。\`;
    $mPlayerTime=$mPlayerTime+1;
    $mPlayerWin=$mPlayerWin+1
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="同时使用前缀和后缀匹配-以匹配-axxxxxxxb-型文本" tabindex="-1"><a class="header-anchor" href="#同时使用前缀和后缀匹配-以匹配-axxxxxxxb-型文本" aria-hidden="true">#</a> 同时使用前缀和后缀匹配，以匹配 <code>AxxxxxxxB</code> 型文本</h3><p>前缀匹配：<code>A</code> 后缀匹配：<code>B</code> 回复：<code>怎么辉石呢</code></p>`,23),H={class:"hint-container note"},J=e("p",{class:"hint-container-title"},"示例",-1),G=c('<h3 id="随机看图" tabindex="-1"><a class="header-anchor" href="#随机看图" aria-hidden="true">#</a> 随机看图</h3><figure><img src="'+b+'" alt="随机看图" tabindex="0" loading="lazy"><figcaption>随机看图</figcaption></figure><h3 id="单人模组" tabindex="-1"><a class="header-anchor" href="#单人模组" aria-hidden="true">#</a> 单人模组</h3>',3),K={class:"hint-container note"},M=e("p",{class:"hint-container-title"},"示例",-1),O=c('<p>具体实现，第一段</p><figure><img src="'+$+'" alt="单人模组第一段" tabindex="0" loading="lazy"><figcaption>单人模组第一段</figcaption></figure><p>第二段</p><figure><img src="'+x+'" alt="单人模组第二段" tabindex="0" loading="lazy"><figcaption>单人模组第二段</figcaption></figure><p>这两段较为常规，第三段开始变形了：</p><figure><img src="'+g+`" alt="单人模组第三段" tabindex="0" loading="lazy"><figcaption>单人模组第三段</figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{%
	if $mStory == 4 { $mStory = 5 };
	if $mStory == 3 { $mStory = 4 };
	if $mStory == 2 { $mStory = 3 };

         $mStory == 3 ? &#39;这个村子有一户人家，门前有两棵树&#39;,
         $mStory == 4 ? &#39;一棵是函树，一棵是反函树&#39;,
         $mStory == 5 ? &#39;我讲完了。&#39;,
         1 ? &#39;？&#39;
%}

{% if $mStory == 5 { $mStory=0 } %}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7);function U(X,Y){const r=o("ExternalLinkIcon"),l=o("RouterLink"),a=o("ChatBox"),u=o("Tabs");return v(),m("div",null,[_,e("div",y,[q,k,R,e("ul",null,[e("li",null,[e("a",D,[n("正则表达式 - 菜鸟教程"),i(r)])])])]),A,P,C,e("div",B,[S,e("p",null,[n("返回内容可以嵌入 CQ 码。CQ 码文档见 "),e("a",W,[n("CQ 码列表"),i(r)]),n("。")])]),e("p",null,[n("自定义回复中分「条件」和「结果」两个部分。在 "),i(l,{to:"/config/reply.html"},{default:t(()=>[n("配置 - 自定义回复")]),_:1}),n(" 中，我们已经了解了一些简单的回复编写，下面将补充介绍进阶内容。")]),w,e("div",T,[F,i(a,{messages:[{content:"购买猫粮",send:!0},{username:"海豹牌猫粮店",content:"<木落>购买了猫粮"}]})]),Q,e("p",null,[n("在回复文本中，可以调用一些 "),i(l,{to:"/advanced/script.html#%E5%8F%98%E9%87%8F"},{default:t(()=>[n("变量")]),_:1}),n("，也可以嵌入 "),i(l,{to:"/advanced/script.html"},{default:t(()=>[n("内置脚本语言")]),_:1}),n("。")]),L,e("div",E,[N,i(a,{messages:[{content:".text {$t玩家}进行测试",send:!0},{content:"<木落>进行测试"},{content:".text {d100}",send:!0},{content:"1"}]},null,8,["messages"])]),V,e("div",z,[I,i(a,{messages:[{content:"踢海豹",send:!0},{content:`<木落>一脚踢向海豹，踢了3格。
海豹现在离终点还有37格。

海豹的逃走骰：1d100=60，海豹没能逃脱凶猛恶汉们的掌控！`}]})]),j,e("div",H,[J,i(u,{id:"297",data:[{id:"输入：AB"},{id:"输入：A间隔B"},{id:"输入：A（无回复）"},{id:"输入：B（无回复）"}]},{title0:t(({value:s,isActive:d})=>[n("输入：AB")]),title1:t(({value:s,isActive:d})=>[n("输入：A间隔B")]),title2:t(({value:s,isActive:d})=>[n("输入：A（无回复）")]),title3:t(({value:s,isActive:d})=>[n("输入：B（无回复）")]),tab0:t(({value:s,isActive:d})=>[i(a,{messages:[{content:"AB",send:!0},{content:"怎么辉石呢"}]})]),tab1:t(({value:s,isActive:d})=>[i(a,{messages:[{content:"A间隔B",send:!0},{content:"怎么辉石呢"}]})]),tab2:t(({value:s,isActive:d})=>[i(a,{messages:[{content:"A",send:!0}]})]),tab3:t(({value:s,isActive:d})=>[i(a,{messages:[{content:"B",send:!0}]})]),_:1})]),G,h(" ![单人模组](./images/edit-reply-single-person-mod.png) "),e("div",K,[M,i(a,{messages:[{content:"开始吧 @海豹核心",send:!0},{content:"那么，故事就这么开始了？如果你想听的话，回复我：说下去"},{content:"说下去 @海豹核心",send:!0},{content:"那么，故事要从一个村子说起……（说下去）"},{content:"说下去 @海豹核心",send:!0},{content:"这个村子有一户人家，门前有两棵树"},{content:"说下去 @海豹核心",send:!0},{content:"一棵是函树，一棵是反函树"},{content:"说下去 @海豹核心",send:!0},{content:"我讲完了。"}]})]),O])}const ne=p(f,[["render",U],["__file","edit_reply.html.vue"]]);export{ne as default};
