---
layout: blog-post
title: "Visual Assist X"
excerpt: "Visual Assist X"
location: "Shenzhen LYJ"
time: 10:04 PM
category: Tools
tags:
- Tools
---

## Visual Assist X ##

官网：http://www.wholetomato.com/    

Snippet：http://www.wholetomato.com/products/features/vasnippets.asp





自己创建唯一的一个实例

单例模式：类创建自己的唯一实例
使用惰性(lazy)初始化，`GetInstance()`返回值直到第一次被访问时才创建和保存

<script>$(document).ready(function(){$.get("/source/cplusplus/SingletonLazy.cpp", function(data){$("#SingletonLazy").text(data).html();});});</script>
<pre><code><div id="SingletonLazy"/></code></pre>

使用非惰性初始化，编译时生成对象。如果编译时无法确定参数或者不满足生成对象的条件时不使用该方法

<script>$(document).ready(function(){$.get("/source/cplusplus/Singleton.cpp", function(data){$("#Singleton").text(data).html();});});</script>
<pre><code><div id="Singleton"/></code></pre>

单例模式

<script>$(document).ready(function(){$.get("/source/cplusplus/SingletonFactory.cpp", function(data){$("#SingletonFactory").text(data).html();});});</script>
<pre><code><div id="SingletonFactory"/></code></pre>
