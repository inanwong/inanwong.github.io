---
layout: blog-post
title: "结构型设计模式"
excerpt: "结构型设计模式"
location: "Shenzhen LYJ"
time: 02:06 PM
category: C++
tags:
- 设计模式
---

## 结构型设计模式(Structural Desing Patterns) ##

结构型模式涉及到如何组合类和对象以获得更大的结构。**结构型类模式采用继承机制来组合接口或实现**。一个简单的例子是采用多重继承方法将两个以上的类组合成一个类，结果这个类包含了所有父类的性质。这一模式尤其有助于多个独立开发的类库协同工作。另外一个例子是类形式的Adapter模式。一般来说，适配器使得一个接口(adaptee的接口)与其他接口兼容，从而给出了多个不同接口的统一抽象。为此，类适配器对一个adaptee类进行私有继承。这样，适配器就可以用adaptee的接口表示它的接口。  

结构型对象模式不是对接口和实现进行组合，而是描述了如何**对一些对象进行组合，从而实现新功能的一些方法**。因为可以在运行时刻改变对象组合关系，所以对象组合方式具有更大的灵活性，而这种机制用静态类组合是不可能实现的。   

I:结构型类模式：使用类的继承进行复用；   
I:结构型对象模式：使用对象的组合进行复用；    

### 结构型 ###

