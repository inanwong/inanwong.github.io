---
layout: blog-post
title: "Markdown语法规则"
excerpt: "Markdown语法规则"
location: "Shenzhen LYJ"
time: 05:27 PM
category: 规范
tags:
- Markdown
- Write
- 中文标签
---

*   [区块元素(Block Elements)](#block)
    *   [标题(Title)](#headertitle)
    *   [导航(Navigation)](#navg)
    *   [段落和换行(Paragraphs and Line Breaks)](#pandl) 
    *   [区块引用(Blockquotes)](#blockquote)
    *   [列表(Lists)](#list)
    *   [代码区块(Code Blocks)](#precode)
    *   [水平线(Horizontal Rules)](#hr)
*   [区段元素(Span Elements)](#span)
    *   [链接(Links)](#link)
    *   [锚点(Anchor)](#na_anchor)
    *   [强调(Emphasis)](#em)
    *   [代码(Code)](#code)
    *   [图片(Images)](#img)
*   [其他(Miscellaneous)](#misc)
    *   [反斜杠(Backslash Escapes)](#backslash)
    *   [自动链接(Automatic Links)](#autolink)
    *   [特殊字符自动转换(Automatic Escaping for Special Characters)](#autoescape)

<h2 id="block">区块元素(Block Elements)</h2>

<h3 id="headertitle">标题(Title)</h3>

规则：一阶标题以及二阶标题使用类Setext形式（即：底线形式），底线标号"="、"-"数量与标题长度保持一致。

    Markdown语法规则
    ===============

规则：三至六阶标题使用闭合的类atx形式，标题以连续的"#"开头，以相同数量的"#"结束，"#"与标题内容之间保留一个空格。例如："### 区块元素-标题 ###"。

规则：所有标题（一至六阶）前后保留空行。

规则：建议最多使用三级标题。

规则：出于对锚点功能的考虑，一阶标题依然使用类Setext形式，其他标题使用HTML语句。

    <h3 id="overview">Overview</h3>

<h3 id="navg">导航(Navigation)</h3>

规则：文章过长时建议写导航。

<h3 id="pandl">段落和换行(Paragraphs and Line Breaks)</h3>

规则：不使用段落开始时的文本缩进，而是使用空行分割段落。

规则：在一行末尾增加两个或者以上的空格，或者使用&lt;br />都可以实现换行，建议不使用强制换行，而是使用自动换行。如果必要，使用行尾空格进行换行。

<h3 id="blockquote">区块引用(Blockquotes)</h3>

规则：引用连续文本时，仅将">"用于段开头，便于自动换行，引用列表时将">"用于每一个列表项，引用的开始行和结束行不能出现单行仅有一个">",可以在引用内部使用">"标记下一段落开始。

规则：">"与内容之间保留一个空格，连续多个">"之间保留一个空格。

规则：使用&lt;br />来为连续的不同引用块增加换行。

<h3 id="list">列表(Lists)</h3>

规则：无序列表可以使用"\*"、"\+"、"\-"作为列表序号，规定以仅使用"\+"作为列表级别的标识号"\+"后加三个空格。

规则：有序列表使用"\[0~9\]" + "\." + "  "作为列表序号，不同列表项之间使用换行而不是换段落，保证布局紧凑。

规则：虽然Markdown可以自动校正序号大小，但是要求写正确的序号，或者全部写"0\.  "，不可跳跃增减序号。

规则：连续写多个不同序号的列表时可以在中间增加"&lt;br /> + 换行"或者"&lt;p /> + 换行"实现列表分隔，但是不建议连续写多个列表。

规则：建议列表缩进不超过三级，不建议有序列表，无序列表交叉缩进。

注意：列表换行时不需要行尾的若干个空格。

注意：jekyll的默认markdown引擎是maruku，不支持中文开头的列表，需要改为rdiscount。编辑_config.yml文件，在`pygments:true`上面添加`markdown: rdiscount`。

注意：rdiscount貌似不支持Html5标签，例如`<article></article>`要用`<div class="article"></div>`替代。

<h3 id="precode">代码区块(Code Blocks)</h3>

规则：Markdown支持4个空格或者1个制表符标识代码区块，规定仅使用4个空格。

规则：连续的代码区块可以使用"&lt;br /> + 换行"或者"&lt;p /> + 换行"进行分割，建议使用"&lt;p /> + 换行"分割，不会有空行。

<h3 id="hr">水平线(Horizontal Rules)</h3>

规则：Markdown支持单行仅有三个或以上的"\*"、"\-"、"\_"中的一个字符表示水平线，建议不使用水平线，必要情况下使用"\* \* \*"表示换行(以单个空格分割的三个"\*")。

<h2 id="span">区段元素(Span Elements)</h2>

<h3 id="link">链接(Links)</h3>

规则：内嵌链接(行内式：inline link)，格式为`[an example]("http://example.com/" "Title")`，其中"]"与"（"紧跟，链接与标题之间保留一个" "，建议写标题，同一个主机必须使用相对路径。参考如下格式：

    This is [an example]("http://example.com/" "Title") inline link.
    [This link]("http://example.net/") has no title attribute.  
    See my [About]("/about/") page for details.

规则：参考链接（reference link），链接文字定义格式为`[an example][id]`，其中"\]"与"\["紧跟，例如：`This is [an example][id] reference-style link.`。链接内容定义格式为`[id]: "http://example.com/"  "Optional Title Here"`，其中网址支持使用"<"和">"包含，标题支持使用""""""、"'""'"、"("")"包含。建议全部分行写，并对齐，参考如下格式：

    // 链接文字定义
    This is [an example][id] reference-style link.
<p />
    
    // 链接内容定义
    [id]: "http://example.com/" "Optional Title Here"
    // 链接过长时分行写
    [id]: "http://example.com/longish/path/to/resource/here"
          "Optional Title Here"

规则：链接的定义可以放在文件中的任何一个地方，建议视使用的范围放在链接出现段落的后面，或者放在文件的最后面，但禁止在未使用之前先定义。

规则：链接标记命名规范，链接标记可以由字母、数字、空白和标点符号组成，不区分大小写，格式为`[link text][id]`，规定格式为三个以内的单词用空格隔开，能够表达含义即可，建议禁止使用数字以及标点符号。

规则：隐式链接标记，即省略id使用link text作为id，格式为`[link text][]`。参考如下格式：
	
    // 参考链接-隐式链接标记
    [Google][]
    [Google]: "http://google.com/"
    Visit [Daring Fireball][] for more information.
    [Daring Fireball]: http://daringfireball.net/
<p />

    // 参考链接-显式链接标记
    I get 10 times more traffic from [Google][1] than from [Yahoo][2] or [MSN][3].

    [1]: "http://google.com/"        "Google"
    [2]: "http://search.yahoo.com/"  "Yahoo Search"
    [3]: "http://search.msn.com/"    "MSN Search"
<p />

    // 参考链接-隐式链接标记
    I get 10 times more traffic from [Google][] than from [Yahoo][] or [MSN][].

    [google]: "http://google.com/"        "Google"
    [yahoo]:  "http://search.yahoo.com/"  "Yahoo Search"
    [msn]:    "http://search.msn.com/"    "MSN Search"
<p />
    
    // 内嵌链接(inline link)
    I get 10 times more traffic from [Google]("http://google.com/" "Google") than from [Yahoo]("http://search.yahoo.com/" "Yahoo Search") or [MSN]("http://search.msn.com/" "MSN Search").

<h3 id="na_anchor">锚点(Anchor)</h3>

规则：Markdown似乎不支持锚点，但是可以通过插入HTML实现锚点。

规则：注意锚点的名称，如果和页面的其他元素重名会出现不可预料的结果，因此规定锚点名以"na_"开头(Named Anchor)。

规则：标题锚点

	[Overview](#overview)
	<h3 id="overview">Overview</h3>

规则：内容锚点

	<a href="#top">点击我链接到TOP</a>
	<a name="top">这里是TOP部分</a>

<h3 id="em">强调(Emphasis)</h3>

规则：Markdown使用星号"\*"和底线"\_"作为标记强调字词的符号，被"\*"或"\_"包围的字词会被转成用"&lt;em\>"标签包围，用两个"\*" 或"\_"包起来的话，则会被转成"&lt;strong\>"，规定仅使用"\*"作为强调符。首尾包含一个"\*"表示斜体，包含两个"\*"表示粗体。强调标记符与内容之间不包含空格。

规则：如果你的"\*"和"\_"两边都有空白的话，它们就只会被当成普通的符号，如果要在文字前后直接插入普通的星号或底线，可以用反斜线：1.\*this text is surrounded by literal asterisks\*。

<h3 id="code">代码(Code)</h3>

规则：如果要标记一小段行内代码，可以用反引号把它包起来"\`"，``Use the `printf()` function.``。如果要在代码区段内插入反引号，可以用多个反引号来开启和结束代码区段：```There is a literal backtick (`) here.```。

规则：代码区段的起始和结束端都可以放入一个空白，起始端后面一个，结束端前面一个，这样你就可以在区段的一开始就插入反引号：  
A single backtick in a code span: `` ` ``  
A backtick-delimited string in a code span: `` `foo` ``

规则：With a code span, ampersands and angle brackets are encoded as HTML
entities automatically, which makes it easy to include example HTML
tags. Markdown will turn this:  
Please don't use any `<blink>` tags.

<h3 id="img">图片(Images)</h3>

规则：Inline image syntax looks like this:

    ![Alt text](/path/to/img.jpg)

    ![Alt text](/path/to/img.jpg "Optional title")

规则：Reference-style image syntax looks like this:

    ![Alt text][id]
<p />

    [id]: url/to/image "Optional title attribute"
	
规则：如果需要缩放图片，直接插入Html语言即可：

	<img src="/assets/images/projects/uml_graph_type.png" alt="UML Graph Type" width="100%" height="100%"/>

<h2 id="misc">其他(Miscellaneous)</h2>

<h3 id="backslash">反斜杠(Backslash Escapes)</h3>

规则：Markdown可以利用反斜杠来插入一些在语法中有其它意义的符号，例如：如果你想要用"\*"加在文字旁边的方式来做出强调效果（但不用 &lt;em\> 标签），你可以在"\*"的前面加上反斜杠：`1.\*literal asterisks\*`，还有用`<br /\>`表示`<br />`

规则：Markdown支持以下这些符号前面加上反斜杠来帮助插入普通的符号：1.\\   反斜线2.\`   反引号3.\*   星号4.\_   底线5.{}  花括号6.\[\]  方括号7.()  括弧8.#   井字号9.+   加号10.-   减号11..   英文句点12.!   惊叹号

规则：严禁使用Tab键。

<h3 id="autolink">自动链接(Automatic Links)</h3>

规则：Markdown支持以比较简短的自动链接形式来处理网址和电子邮件信箱，只要是用方括号包起来，Markdown 就会自动把它转成链接。一般网址的链接文字就和链接地址一样，例如：
`<http://example.com/>`

规则：邮址的自动链接也很类似，只是 Markdown 会先做一个编码转换的过程，把文字字符转成 16 进位码的 HTML 实体，这样的格式可以糊弄一些不好的邮址收集机器人，
`<address@example.com>`

<h3 id="autoescape">特殊字符自动转换(Automatic Escaping for Special Characters)</h3>

规则：在HTML文件中，有两个字符需要特殊处理：&lt;和&，&lt;符号用于起始标签，&符号则用于标记HTML实体，如果只是想要显示这些字符的原型，必须要使用实体的形式，像是&lt;(`&lt;`)和&amp;(`&amp;`)。

规则：文本中使用&amp;原型时需要使用实体形式`&amp;`，网址中的&amp;也要替换成`&amp;`。如：「AT&amp;T」要写成`「AT&amp;T」`；`http://images.google.com/images?num=30&amp;q=larry+bird` 要写成`http://images.google.com/images?num=30&amp;q=larry+bird`

规则：版权说明&copy;要使用`&copy;`。

