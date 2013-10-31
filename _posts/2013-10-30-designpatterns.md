---
layout: blog-post
title: "设计模式"
excerpt: "设计模式"
location: "Shenzhen LYJ"
time: 10:04 PM
category: C++
tags:
- 设计模式
---

## 设计模式(Desing Patterns) ##

类模式：处理类和子类之间的关系，这些关系通过继承，建立是静态的，在编译时刻便确定下来了。
对象模式：处理对象间的关系，这些关系在运行时是动态的。
















空类自动生成的默认函数包括,**默认构造函数;拷贝构造函数;默认赋值函数;析构函数;取址运算符;取址运算符(const)**.

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

一般的书上好像都是前面四种：默认构造函数，拷贝构造函数，默认赋值函数以及析构函数，后面两种其实属于，但要需要注意的是，只有当你需要用到这些函数的时候，编译器才会去定义它们。

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

	#include <stdio.h>
	#include <stdlib.h>
	#include <new>
	#include <string.h>

	class String
	{
	public:
		//
		//	默认构造函数，在定义一个无参对象时调用的就是这个默认构造函数。比如:String str;
		//	所有参数都有默认值的构造函数，也可以作为默认构造函数，比如：
		//	String(const char* psz = NULL);
		//
		String() : m_pBuf(NULL)
		{}
		//
		//	尽量在初始化列表里初始化所有数据成员
		//
		String(const String& rhs) : m_pBuf(rhs.m_pBuf ? strdup(rhs.m_pBuf) : NULL)
		{}
		//
		//	单参数的构造函数，可以作为转换构造函数使用，在需要String类型的地方，如果
		//	出现的是const char* 类型的参数，编译器会调用这个转换构造函数自动构造出一个
		//	String对象。比如：
		//	void fun(const String& str); 
		//	fun("hello world");
		//	以上代码相当于：
		//	String str("hello world");
		//	fun(str);
		//
		String(const char* pszStr) : m_pBuf(pszStr ? strdup(pszStr) : NULL)
		{}
		//
		//	加了explicit修饰的单参构造函数不作为转换构造函数使用，必须显式调用，如：
		//	String str(20);
		//	下面这样就不行：
		//	void fun(const String& str);
		//	fun(20);
		//
		explicit String(size_t maxBufSize)
		{
			m_pBuf = (char*)calloc(1, maxBufSize+1);
		}
		//
		//	转换函数子，可以被编译器自动调用。比如：
		//	void fun(const char* psz);
		//	String str("hello world");
		//	fun(str);
		//	strcpy(buf, str);
		//
		operator const char*() const
		{
			return m_pBuf;
		}
		//
		//	赋值运算符要保证原有资源已经得到释放了。
		//
		String& operator=(const String& rhs) 
		{
			//
			//	先判断是否自我赋值形式，比如：const String& ref = str; str = ref;或 str = str;
			//	要避免自我赋值，因为：1）释放资源，拷贝资源过程中容易出现悬挂访问现象，2）浪费性能；
			//
			if (&rhs != this){		
				char* pBuf = NULL;
				if (rhs.m_pBuf){
					pBuf = strdup(rhs.m_pBuf);
					//
					//	因为赋值运算符没有表明是否成功的返回值，分配内存失败只能通过异常通知调用者，
					//	其它手段都非常不直观，比如：通过在本类中维护一个对象是否有效的状态标识，
					//	这种方法看起来别扭，比如: lv = rv; if(lv.is_valid()){ ... }
					//
					if (!pBuf)		
						throw std::bad_alloc();
				}
				if (m_pBuf)
					free(m_pBuf);
				m_pBuf = pBuf;
			}
			return *this;
		}
		//
		//	析构函数要保证释放本类拥有的所有资源，为安全性考虑，通常应判断这些资源是否处于有效状态。
		//	作为基类，析构函数必须声明为虚函数
		//
		virtual ~String()
		{
			if (m_pBuf)
				free(m_pBuf);
		}
	private:
		char* m_pBuf;
	};

	class Utf8String : public String
	{
	public:
		//
		//	派生类的默认构造函数如果没有显式初始化基类对象，编译器会自动调用基类的默认构造函数
		//
		Utf8String() : m_bEncoded(false)
		{}
		//
		//	派生类的拷贝构造函数，要显式调用基类的拷贝构造，否则编译器自动调用的是基类的默认构造，而不是拷贝构造函数。
		//
		Utf8String(const Utf8String& rhs) : String(rhs), m_bEncoded(rhs.m_bEncoded)
		{
		}
		Utf8String& operator=(const Utf8String& rhs) 
		{
			if (&rhs != this){
				//
				//	派生类的赋值运算符函数要显式调用基类的赋值运算符给基类子对象赋值
				//
				String::operator=(rhs);
				m_bEncoded = rhs.m_bEncoded;
			}
			return *this;
		}
		void Encode()
		{
			//...
		}
		void Decode()
		{
			//...
		}
		//...
	private:
		bool m_bEncoded;
	};


	class non_copyable
	{
	public:
		non_copyable()
		{}
	private:
		//
		//	如果不希望有人（包括编译器）不小心调用到本类的拷贝构造和赋值运算符，
		//	可以将这两个函数声明为私有函数，且不提供实现体
		//
		non_copyable& operator=(const non_copyable&);
		non_copyable(const non_copyable&);
	};

	class test_non_copyable : private non_copyable
	{
	public:
		test_non_copyable()
		{}
	};

	class Base
	{
	public:
		Base() : m_val(0)
		{}
		Base(const Base& rhs) : m_val(rhs.m_val)
		{}
	private:
	public:
		int m_val;
	};

	class Derived : public Base
	{
	public:
		Derived() : m_val2(0)
		{}
		Derived(const Derived& rhs) : m_val2(rhs.m_val2)
		{}	
	public:
		int m_val2;
	};

	int main()
	{
		Derived v1;
		
		v1.m_val = 2;
		v1.m_val2 = 3;
		
		Derived v2(v1);
		
		printf("val: %d, val2: %d\n", v2.m_val, v2.m_val2);
		
		char buf[20];
		
		String str("hello");
		
		strcpy(buf, str);
		
		printf("%s\n", buf);
		
		test_non_copyable obj;
		
		test_non_copyable lhs(obj);
		
		return 0;
	}
