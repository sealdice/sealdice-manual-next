import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as l,o as c,c as o,a as n,d as s,b as e,e as t}from"./app-BzNOc3l9.js";const p={},r=t(`<h1 id="编写敏感词库" tabindex="-1"><a class="header-anchor" href="#编写敏感词库"><span>编写敏感词库</span></a></h1><div class="hint-container info"><p class="hint-container-title">本节内容</p><p>本节将介绍敏感词库的编写，请善用侧边栏和搜索，按需阅读文档。</p></div><h2 id="创建文本格式的敏感词库" tabindex="-1"><a class="header-anchor" href="#创建文本格式的敏感词库"><span>创建文本格式的敏感词库</span></a></h2><p>你可以直接按照以下格式书写 <code>&lt;words&gt;.txt</code>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#notice
提醒级词汇 1
提醒级词汇 2

#caution
注意级词汇 1
注意级词汇 2

#warning
警告级词汇

#danger
危险级词汇
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建-toml-格式的敏感词库" tabindex="-1"><a class="header-anchor" href="#创建-toml-格式的敏感词库"><span>创建 TOML 格式的敏感词库</span></a></h2>`,6),d={class:"hint-container info"},u=n("p",{class:"hint-container-title"},"TOML 格式",-1),m=n("p",null,"我们假定你已了解 TOML 格式。如果你对 TOML 还很陌生，可以阅读以下教程或自行在互联网搜索：",-1),v={href:"https://toml.io/cn/v1.0.0",target:"_blank",rel:"noopener noreferrer"},k={href:"https://zhuanlan.zhihu.com/p/348057345",target:"_blank",rel:"noopener noreferrer"},b=t(`<p>你可以直接按照以下格式书写 <code>&lt;words&gt;.toml</code>：</p><div class="language-toml line-numbers-mode" data-ext="toml" data-title="toml"><pre class="language-toml"><code><span class="token comment"># 元信息，用于填写一些额外的展示内容</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function h(g,_){const a=l("ExternalLinkIcon");return c(),o("div",null,[r,n("div",d,[u,m,n("ul",null,[n("li",null,[n("a",v,[s("TOML 文档"),e(a)]),s("、"),n("a",k,[s("TOML 教程"),e(a)])])])]),b])}const x=i(p,[["render",h],["__file","edit_sensitive_words.html.vue"]]),f=JSON.parse('{"path":"/advanced/edit_sensitive_words.html","title":"编写敏感词库","lang":"zh-cn","frontmatter":{"lang":"zh-cn","title":"编写敏感词库","description":"编写敏感词库 本节内容 本节将介绍敏感词库的编写，请善用侧边栏和搜索，按需阅读文档。 创建文本格式的敏感词库 你可以直接按照以下格式书写 <words>.txt： 创建 TOML 格式的敏感词库 TOML 格式 我们假定你已了解 TOML 格式。如果你对 TOML 还很陌生，可以阅读以下教程或自行在互联网搜索： TOML 文档、TOML 教程 你可以直...","head":[["meta",{"property":"og:url","content":"http://localhost:8080/sealdice-manual-next/advanced/edit_sensitive_words.html"}],["meta",{"property":"og:site_name","content":"海豹手册"}],["meta",{"property":"og:title","content":"编写敏感词库"}],["meta",{"property":"og:description","content":"编写敏感词库 本节内容 本节将介绍敏感词库的编写，请善用侧边栏和搜索，按需阅读文档。 创建文本格式的敏感词库 你可以直接按照以下格式书写 <words>.txt： 创建 TOML 格式的敏感词库 TOML 格式 我们假定你已了解 TOML 格式。如果你对 TOML 还很陌生，可以阅读以下教程或自行在互联网搜索： TOML 文档、TOML 教程 你可以直..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-cn"}],["meta",{"property":"og:updated_time","content":"2023-10-30T09:14:16.000Z"}],["meta",{"property":"article:author","content":"SealDice Team"}],["meta",{"property":"article:modified_time","content":"2023-10-30T09:14:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"编写敏感词库\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-10-30T09:14:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"SealDice Team\\",\\"url\\":\\"https://github.com/sealdice\\"}]}"]]},"headers":[{"level":2,"title":"创建文本格式的敏感词库","slug":"创建文本格式的敏感词库","link":"#创建文本格式的敏感词库","children":[]},{"level":2,"title":"创建 TOML 格式的敏感词库","slug":"创建-toml-格式的敏感词库","link":"#创建-toml-格式的敏感词库","children":[]}],"git":{"createdTime":1698072668000,"updatedTime":1698657256000,"contributors":[{"name":"JustAnotherID","email":"just-another-id@outlook.com","commits":2}]},"readingTime":{"minutes":1.34,"words":402},"filePathRelative":"advanced/edit_sensitive_words.md","localizedDate":"2023年10月23日","autoDesc":true,"excerpt":"\\n<div class=\\"hint-container info\\">\\n<p class=\\"hint-container-title\\">本节内容</p>\\n<p>本节将介绍敏感词库的编写，请善用侧边栏和搜索，按需阅读文档。</p>\\n</div>\\n<h2>创建文本格式的敏感词库</h2>\\n<p>你可以直接按照以下格式书写 <code>&lt;words&gt;.txt</code>：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>#notice\\n提醒级词汇 1\\n提醒级词汇 2\\n\\n#caution\\n注意级词汇 1\\n注意级词汇 2\\n\\n#warning\\n警告级词汇\\n\\n#danger\\n危险级词汇\\n</code></pre></div>"}');export{x as comp,f as data};
