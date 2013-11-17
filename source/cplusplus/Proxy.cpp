#include "CommonBridge.h"

NAMESPACE_START(Proxy)

NAMESPACE_START(Proxy_VP1)
class CString
{
public:
	CString(const char* pszSrc)
	{
		m_pString = new std::string(pszSrc);
	}
	virtual ~CString()
	{
		m_pString = (delete m_pString, NULL);
	}
private:
	std::string* m_pString;	// 实体指针
};
NAMESPACE_END

NAMESPACE_START(Proxy_VP2)
class CString
{
public:
	CString(const char* pszSrc)
		: m_pString(NULL), m_pszSrc(pszSrc)
	{
	}
	virtual ~CString()
	{
		m_pString = (delete m_pString, NULL);
	}
	void Diaplay()
	{
		m_pString = new std::string(m_pszSrc);	// 需要时创建实体
		cout<<m_pString<<endl;
	}
private:
	std::string* m_pString;	// 实体指针
	const char* m_pszSrc;	// 实体创建原料
};
NAMESPACE_END

NAMESPACE_START(Proxy_VP3)
class CString
{
public:
	CString(const char* pszSrc)
		: m_pString(NULL), m_pszSrc(pszSrc)
	{
	}
	virtual ~CString()
	{
		m_pString = (delete m_pString, NULL);
	}
	std::string& operator*()
	{
		if (NULL == m_pString)
		{
			m_pString = new std::string(m_pszSrc);
		}
		return *m_pString;
	}
	std::string* operator->()
	{
		if (NULL == m_pString)
		{
			m_pString = new std::string(m_pszSrc);
		}
		return m_pString;
	}
//  一般来讲重载成员访问操作符时会重载两个版本，在这里const版重载无法创建实体
// 	const std::string& operator*() const
// 	{
// 		return *m_pString;
// 	}
// 	const std::string* operator->() const
// 	{
// 		return m_pString;
// 	}
private:
	std::string* m_pString;	// 实体指针
	const char* m_pszSrc;	// 实体创建原料
};

#if 0	// 调用方式
	Proxy_VP3::CString strProxy(__FUNCTION__);
	cout<<strProxy->c_str()<<endl;
	cout<<*strProxy<<endl;
#endif

NAMESPACE_END

NAMESPACE_START(Proxy_SR1)
class CString
{
public:
	CString(const char* pszSrc)
	{
		assert(NULL != pszSrc);
		m_stLength = strlen(pszSrc);
		m_pszData = new char[m_stLength + sizeof(char) + sizeof(char)];
		strcpy(m_pszData, pszSrc);
		m_pszData[m_stLength + sizeof(char)] = 1;
	}

	CString(const CString& theOther)
	{
		if (this != &theOther)
		{
			this->m_pszData = (char*)theOther.c_str();
			this->m_stLength = theOther.size();
			this->m_pszData[m_stLength + sizeof(char)]++;
		}
	}

	char& operator[](size_t stIndex)
	{
		if (stIndex > m_stLength || m_pszData == NULL)
		{
			static char s_chNull = (char)0;
			return s_chNull;
		}
		m_pszData[m_stLength + sizeof(char)]--;

		char* m_pszTmp = new char[m_stLength + sizeof(char) + sizeof(char)];
		if (NULL != m_pszTmp)
		{
			memset(m_pszTmp, 0, m_stLength + sizeof(char) + sizeof(char));
			strncpy(m_pszTmp, m_pszData, m_stLength + sizeof(char));
		}
		m_pszData = m_pszTmp;
		m_pszData[m_stLength + sizeof(char)] = 1;
		return m_pszData[stIndex];
	}

	const char* c_str() const { return m_pszData; }
	size_t size() const { return m_stLength; }

	virtual ~CString()
	{
		m_pszData[m_stLength + sizeof(char)]--;
		if (0 == m_pszData[m_stLength + sizeof(char)])
		{
			m_pszData = (delete[] m_pszData, NULL);
		}
	}

private:
	char*  m_pszData;	// 数据
	size_t m_stLength;	// 字符串长度
};

#if 0	// 调用方式
	Proxy_SR1::CString csSR1(__FUNCTION__);
	Proxy_SR1::CString csSR2 = csSR1;
	csSR2[1] = '0';
#endif

NAMESPACE_END

NAMESPACE_START(Proxy_AP)
template<class T>
class auto_ptr {
public:
	explicit auto_ptr(T *p = 0): pointee(p) {}
	auto_ptr(auto_ptr<T>& rhs): pointee(rhs.release()) {}
	~auto_ptr() { delete pointee; }
	auto_ptr<T>& operator=(auto_ptr<T>& rhs)
	{
		if (this != &rhs) reset(rhs.release());
		return *this;
	}
	T& operator*() const { return *pointee; }
	T* operator->() const { return pointee; }
	T* get() const { return pointee; }
	T* release()
	{
		T *oldPointee = pointee;
		pointee = 0;
		return oldPointee;
	}
	void reset(T *p = 0)
	{
		if (pointee != p) {
			delete pointee;
			pointee = p;
		}
	}
private:
	T *pointee;
};
NAMESPACE_END

NAMESPACE_START(Proxy_SP)
template <typename T>
class smart_ptr
{
public:
	// 初始的计数值为1
	smart_ptr(T *p = 0) : pointee(p), count(new size_t(1)) {}
	// 拷贝构造函数，计数加1
	smart_ptr(const smart_ptr &rhs)
		: pointee(rhs.pointee), count(rhs.count) { ++*count; }
	// 析构，计数减1，减到0时进行垃圾回收，即释放空间
	~smart_ptr() { decr_count(); }
	// 重载赋值操作符
	smart_ptr& operator= (const smart_ptr& rhs)
	{
		//给自身赋值也对，因为如果自身赋值，计数器先减1，再加1，并未发生改变
		++*count;
		decr_count();
		pointee = rhs.pointee;
		count = rhs.count;
		return *this;
	}
	// 重载箭头操作符和解引用操作符，未提供指针的检查
	T *operator->() { return pointee; }
	const T *operator->() const { return pointee; }
	T &operator*() { return *pointee; }
	const T &operator*() const { return *pointee; }
	size_t get_refcount() { return *count; } // 获得引用计数器值
private:
	T *pointee;       // 实际指针，被代理
	size_t *count;    // 引用计数器
	void decr_count() // 计数器减1
	{
		if(--*count == 0)
		{
			delete pointee;
			delete count;
		}
	}
};
NAMESPACE_END

static int Run(int argc, char** argv)
{
	Proxy_VP3::CString strProxy(__FUNCTION__);
	cout<<strProxy->c_str()<<endl;
	cout<<*strProxy<<endl;

	Proxy_SR1::CString csSR1(__FUNCTION__);
	Proxy_SR1::CString csSR2 = csSR1;
	csSR2[1] = '0';

	return 0;
}

RegistUnitRun("Proxy", Run);

NAMESPACE_END