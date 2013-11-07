---
layout: blog-post
title: "创建型设计模式"
excerpt: "创建型设计模式"
location: "Shenzhen LYJ"
time: 10:04 PM
category: C++
tags:
- 设计模式
---

## 创建型设计模式(Creational Desing Patterns) ##

类是如何创建对象的？

类创建实例的过程，对象的实例化过程，一般不考虑析构

一个类创建唯一实例，
一个类创建多种实例返回其中的一个

类创建型模式：使用继承改变被实例化的类。   
对象创建型模式：将实例化委托给另一个对象。

## 单例模式(Singleton) ##

自己创建唯一的一个实例

单例模式：类创建自己的唯一实例
使用惰性(lazy)初始化，`GetInstance()`返回值直到第一次被访问时才创建和保存

<script>$(document).ready(function(){$.get("/source/cplusplus/SingletonLazy.cpp", function(data){$("#SingletonLazy").text(data).html();});});</script>
<pre><code><div id="SingletonLazy"/></code></pre>

单例模式：类创建自己的唯一实例
使用非惰性初始化，编译时生成对象。如果编译时无法确定参数或者不满足生成对象的条件时不使用该方法

<script>$(document).ready(function(){$.get("/source/cplusplus/Singleton.cpp", function(data){$("#Singleton").text(data).html();});});</script>
<pre><code><div id="Singleton"/></code></pre>

单例模式

<script>$(document).ready(function(){$.get("/source/cplusplus/SingletonFactory.cpp", function(data){$("#SingletonFactory").text(data).html();});});</script>
<pre><code><div id="SingletonFactory"/></code></pre>
