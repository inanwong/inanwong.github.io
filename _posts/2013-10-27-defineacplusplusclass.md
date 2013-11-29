---
layout: blog-post
title: "怎么定义一个C++类"
excerpt: "怎么定义一个C++类"
location: "Shenzhen LYJ"
time: 09:52 PM
category: C++
tags:
- C++
- 类
---

## 写一个类需要注意的地方 ##
空类自动生成的默认函数包括，**默认构造函数；拷贝构造函数；默认赋值函数；析构函数；取址运算符；取址运算符(const)**。

**重写默认构造函数**：尽量在初始化列表里初始化所有数据成员，注意按照声明顺序写初始化列表；单参数的构造函数，可以作为转换构造函数使用，加了explicit修饰的单参构造函数不作为转换构造函数使用，必须显式调用。

**重写析构函数**：作为基类，析构函数必须声明为虚函数(virtual)。

**禁用拷贝构造函数以及赋值函数**：使用宏私有化或者继承Uncopybale类（估计没人会这么做）

    // 禁止拷贝构造
    #ifndef DISALLOW_COPY_AND_ASSIGN
    #define DISALLOW_COPY_AND_ASSIGN(ClassName)	\
    	ClassName(const ClassName&);            \
    	void operator=(const ClassName&);
    #endif // DISALLOW_COPY_AND_ASSIGN
    

## 一个空类默认生成的函数 ##

定义一个空的C++类，例如

	class Empty
	{
	}

一个空的class在C++编译器处理过后就不再为空，编译器会自动地为我们声明一些member function，一般编译过去就相当于

	class Empty
	{
	public:
		Empty(); // 缺省构造函数
		Empty(const Empty&); // 拷贝构造函数
		~Empty(); // 析构函数
		Empty& operator=(const Empty&); // 赋值运算符
		Empty* operator&(); // 取址运算符
		const Empty* operator&() const; // 取址运算符 const
	};

一般的书上好像都是前面四种：默认构造函数，拷贝构造函数，默认赋值函数以及析构函数，后面两种其实属于没必要重载，但要需要注意的是，只有当你需要用到这些函数的时候，编译器才会去定义它们。

如果你只是声明一个空类，不做任何事情的话，编译器会自动为你生成一个默认构造函数、一个拷贝默认构造函数、一个默认拷贝赋值操作符和一个默认析构函数。这些函数只有在第一次被调用时，才会被编译器创建。所有这些函数都是inline和public的。

默认的析构函数是非虚函数（除非基类有自己声明的虚析构函数）。而拷贝默认构造函数和默认拷贝赋值操作符知识是单纯将来源对象的每一个非静态成员拷贝到对象目标中（bitwise copy）。

其中的默认拷贝赋值操作符只有在生成的代码合法并且有机会证明它有意义存在时才会生成。这就说明，如果你打算在一个“内含引用成员”或者“内含const成员”的类内支持赋值操作，就必须定义自己的默认拷贝赋值操作符。因为C++本身不允许引用改指不同的对象，也不允许更改const成员。

最后一种情况，当基类将自己的默认拷贝赋值操作符声明为private时，子类就不会产生自己的的默认拷贝赋值操作符。因为假如产生了这样的默认拷贝赋值操作符，它会试着去调用基类的默认拷贝赋值操作符去处理基类的部分，不幸的是，它没有权利。

你可以将拷贝构造函数或默认拷贝赋值操作符声明为private。这样明确声明一个成员函数，就阻止了编译器暗自创建的默认版本，而这些函数为private，使得可以成功阻止人们调用它。

上面的做法有一个隐患，因为类自身的member和friend还是可以调用这些private函数。有一个很刁钻的方法，“将成员函数声明为private而且故意不实现它们”，这样既阻止了默认函数的生成，而且如果你试着调用这些函数，就会得到一个链接错误。只声明，不定义，链接器报错。甚至在声明的时候，你连参数也不用写。

而试着将上述的链接器错误提前到编译器也是可以的。我们专门设计一个类Unconpyable。

    class Uncopybale {
    protected:
        Uncopyable() {}
        ~Uncopyable() {}
    private:
        Ucopyable(const Uncopyable&)
        Uncopyable& operator=(const Uncopyable&)
    };

为了阻止对象被拷贝，我们唯一需要做的就是继承Uncopyable。这些函数的默认生成版本会尝试调用其基类的对应版本，那些调用会被编译器拒绝，因为它基类的拷贝函数是private。

Boost提供的noncopyable类也有类似的功能。

**忠告：为了驳回编译器自动提供的技能，可将相应的成员函数声明为private并且不予实现。使用像Uncopyable这样的基类也是一种做法。**

## 怎样定义一个C++类 ##

<script>$(document).ready(function(){$.get("/source/cplusplus/StringClass.cpp", function(data){$("#StringClass").text(data).html();});});</script>
<pre><code><div id="StringClass"/></code></pre>
