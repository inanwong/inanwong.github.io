#include <stdio.h>
#include <stdlib.h>
#include <new>
#include <string.h>

class String
{
public:
	//
	//	默认构造函数，在定义一个无参对象时调用的就是这个默认构造函数。比如:
	//	String str;
	//  所有参数都有默认值的构造函数，也可以作为默认构造函数，比如：
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
		//	先判断是否自我赋值形式，比如：const String& ref = str; str = ref;或
		//  str = str;
		//	要避免自我赋值，因为：
		//  1）释放资源，拷贝资源过程中容易出现悬挂访问现象，
		//  2）浪费性能；
		//  悬挂访问：通过一个没有初始化的指针或空指针访问不存在的数据
		//
		if (&rhs != this){
			char* pBuf = NULL;
			if (rhs.m_pBuf){
				pBuf = strdup(rhs.m_pBuf);
				//
				//	因为赋值运算符没有表明是否成功的返回值，分配内存失败只能通过
				//  异常通知调用者，
				//	其它手段都非常不直观，比如：通过在本类中维护一个对象是否有效
				//  的状态标识，
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
	//	析构函数要保证释放本类拥有的所有资源，为安全性考虑，通常应判断这些资源是
	//  否处于有效状态。
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
	//	派生类的默认构造函数如果没有显式初始化基类对象，编译器会自动调用基类的默
	//  认构造函数
	//
	Utf8String() : m_bEncoded(false)
	{}
	//
	//	派生类的拷贝构造函数，要显式调用基类的拷贝构造，否则编译器自动调用的是基
	//  类的默认构造，而不是拷贝构造函数。
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