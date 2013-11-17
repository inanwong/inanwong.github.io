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
	std::string* m_pString;	// ʵ��ָ��
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
		m_pString = new std::string(m_pszSrc);	// ��Ҫʱ����ʵ��
		cout<<m_pString<<endl;
	}
private:
	std::string* m_pString;	// ʵ��ָ��
	const char* m_pszSrc;	// ʵ�崴��ԭ��
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
//  һ���������س�Ա���ʲ�����ʱ�����������汾��������const�������޷�����ʵ��
// 	const std::string& operator*() const
// 	{
// 		return *m_pString;
// 	}
// 	const std::string* operator->() const
// 	{
// 		return m_pString;
// 	}
private:
	std::string* m_pString;	// ʵ��ָ��
	const char* m_pszSrc;	// ʵ�崴��ԭ��
};

#if 0	// ���÷�ʽ
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
	char*  m_pszData;	// ����
	size_t m_stLength;	// �ַ�������
};

#if 0	// ���÷�ʽ
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
	// ��ʼ�ļ���ֵΪ1
	smart_ptr(T *p = 0) : pointee(p), count(new size_t(1)) {}
	// �������캯����������1
	smart_ptr(const smart_ptr &rhs)
		: pointee(rhs.pointee), count(rhs.count) { ++*count; }
	// ������������1������0ʱ�����������գ����ͷſռ�
	~smart_ptr() { decr_count(); }
	// ���ظ�ֵ������
	smart_ptr& operator= (const smart_ptr& rhs) 
	{
		//������ֵҲ�ԣ���Ϊ�������ֵ���������ȼ�1���ټ�1����δ�����ı�
		++*count;
		decr_count();
		pointee = rhs.pointee;
		count = rhs.count;
		return *this;
	}  
	// ���ؼ�ͷ�������ͽ����ò�������δ�ṩָ��ļ��
	T *operator->() { return pointee; }
	const T *operator->() const { return pointee; }
	T &operator*() { return *pointee; }
	const T &operator*() const { return *pointee; }
	size_t get_refcount() { return *count; } // ������ü�����ֵ
private: 
	T *pointee;       // ʵ��ָ�룬������  
	size_t *count;    // ���ü�����
	void decr_count() // ��������1
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