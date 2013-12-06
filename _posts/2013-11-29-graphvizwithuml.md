---
layout: blog-post
title: "使用Graphviz画UML"
excerpt: "使用Graphviz画UML"
location: "Shenzhen LYJ"
time: 08:43 PM
category: C++
tags:
- UML
---

## 使用Graphviz画UML ##


## 使用Graphviz画类图 ##

1.类
(1)使用htmlstring而不使用escString的原因是，类名需要粗体(斜体)表示，没有找到escString的bold属性；同时escString的换行支持的不是很好，如果把类名，属性，操作都写在同一行会影响阅读。
(2)如果使用box shape以及{}来表示类，会在每一个|单元都要写一个TABLE，增加代码量。
(3)最终确定使用plaintext+table的原因是，他满足了我的一个个人原则：同样目的下，优先选择古老技能而不是新技术。这样就不用增加知道"escString下{}需要转义","node与table之间有空隙"等技能的额外成本。

2.类间关系

