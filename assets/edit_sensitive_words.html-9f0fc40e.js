import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as c,c as p,a as n,d as s,b as e,e as t}from"./app-d6b81ca0.js";const o={},d=t(`<h1 id="编写敏感词库" tabindex="-1"><a class="header-anchor" href="#编写敏感词库" aria-hidden="true">#</a> 编写敏感词库</h1><div class="hint-container info"><p class="hint-container-title">本节内容</p><p>本节将介绍敏感词库的编写，请善用侧边栏和搜索，按需阅读文档。</p></div><h2 id="创建文本格式的敏感词库" tabindex="-1"><a class="header-anchor" href="#创建文本格式的敏感词库" aria-hidden="true">#</a> 创建文本格式的敏感词库</h2><p>你可以直接按照以下格式书写 <code>&lt;words&gt;.txt</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#notice
提醒级词汇 1
提醒级词汇 2

#caution
注意级词汇 1
注意级词汇 2

#warning
警告级词汇

#danger
危险级词汇
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建-toml-格式的敏感词库" tabindex="-1"><a class="header-anchor" href="#创建-toml-格式的敏感词库" aria-hidden="true">#</a> 创建 TOML 格式的敏感词库</h2>`,6),r={class:"hint-container info"},u=n("p",{class:"hint-container-title"},"TOML 格式",-1),v=n("p",null,"我们假定你已了解 TOML 格式。如果你对 TOML 还很陌生，可以阅读以下教程或自行在互联网搜索：",-1),m={href:"https://toml.io/cn/v1.0.0",target:"_blank",rel:"noopener noreferrer"},k={href:"https://zhuanlan.zhihu.com/p/348057345",target:"_blank",rel:"noopener noreferrer"},b=t(`<p>你可以直接按照以下格式书写 <code>&lt;words&gt;.toml</code>：</p><div class="language-toml line-numbers-mode" data-ext="toml"><pre class="language-toml"><code><span class="token comment"># 元信息，用于填写一些额外的展示内容</span>
<span class="token punctuation">[</span><span class="token table class-name">meta</span><span class="token punctuation">]</span>
<span class="token comment"># 词库名称</span>
<span class="token key property">name</span> <span class="token punctuation">=</span> <span class="token string">&#39;测试词库&#39;</span>
<span class="token comment"># 作者，和 authors 存在一个即可</span>
<span class="token key property">author</span> <span class="token punctuation">=</span> <span class="token string">&#39;&#39;</span>
<span class="token comment"># 作者（多个），和 author 存在一个即可</span>
<span class="token key property">authors</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span> <span class="token string">&#39;&lt;匿名&gt;&#39;</span> <span class="token punctuation">]</span>
<span class="token comment"># 版本，建议使用语义化版本号</span>
<span class="token key property">version</span> <span class="token punctuation">=</span> <span class="token string">&#39;1.0&#39;</span>
<span class="token comment"># 简介</span>
<span class="token key property">desc</span> <span class="token punctuation">=</span> <span class="token string">&#39;一个测试词库&#39;</span>
<span class="token comment"># 协议</span>
<span class="token key property">license</span> <span class="token punctuation">=</span> <span class="token string">&#39;CC-BY-NC-SA 4.0&#39;</span>
<span class="token comment"># 创建日期，使用 RFC 3339 格式</span>
<span class="token key property">date</span> <span class="token punctuation">=</span> <span class="token date number">2023-10-30</span>
<span class="token comment"># 更新日期，使用 RFC 3339 格式</span>
<span class="token key property">updateDate</span> <span class="token punctuation">=</span> <span class="token date number">2023-10-30</span>

<span class="token comment"># 词表，出现相同词汇时按最高级别判断</span>
<span class="token punctuation">[</span><span class="token table class-name">words</span><span class="token punctuation">]</span>
<span class="token comment"># 忽略级词表，没有实际作用</span>
<span class="token key property">ignore</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token comment"># 提醒级词表</span>
<span class="token key property">notice</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span>
  <span class="token string">&#39;提醒级词汇 1&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;提醒级词汇 2&#39;</span>
<span class="token punctuation">]</span>
<span class="token comment"># 注意级词表</span>
<span class="token key property">caution</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span>
  <span class="token string">&#39;注意级词汇 1&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;注意级词汇 2&#39;</span>
<span class="token punctuation">]</span>
<span class="token comment"># 警告级词表</span>
<span class="token key property">warning</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span>
  <span class="token string">&#39;警告级词汇 1&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;警告级词汇 2&#39;</span>
<span class="token punctuation">]</span>
<span class="token comment"># 危险级词表</span>
<span class="token key property">danger</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span>
  <span class="token string">&#39;危险级词汇 1&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;危险级词汇 2&#39;</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function h(_,g){const a=l("ExternalLinkIcon");return c(),p("div",null,[d,n("div",r,[u,v,n("ul",null,[n("li",null,[n("a",m,[s("TOML 文档"),e(a)]),s("、"),n("a",k,[s("TOML 教程"),e(a)])])])]),b])}const x=i(o,[["render",h],["__file","edit_sensitive_words.html.vue"]]);export{x as default};
