#include "CommonBridge.h"

NAMESPACE_START(Prototype)

class Prototype
{
public:
	Prototype() : m_pData(NULL) {}
	virtual	~Prototype() {}
public:
	virtual Prototype* Clone() const = 0;
protected:
	char* m_pData;
};

class ConcretePrototype : public Prototype
{
public:
	explicit ConcretePrototype(char* pData = NULL)
		: Prototype()
	{
		if (NULL == pData)
		{
			m_pData = new char[1];
			m_pData[0] = '\0';
		}
		else
		{
			m_pData = new char[strlen(pData) + 1];
			strcpy(m_pData, pData);
		}
	}
	virtual ~ConcretePrototype()
	{
		m_pData = (delete[] m_pData, NULL);
	}
	// 拷贝构造函数-深拷贝
	ConcretePrototype(const ConcretePrototype &other)
	{
		m_pData = new char[(NULL == other.m_pData ? 0 : strlen(other.m_pData)) + 1];
		strcpy(m_pData, other.m_pData);
	}
public:
	ConcretePrototype* Clone() const
	{
		return new ConcretePrototype(*this);
	}
	void Interface() const
	{
		cout << (NULL == m_pData ? "" : m_pData) << endl;
	}
};

static int Run(int argc, char** argv)
{
	ConcretePrototype* pCP1 = new ConcretePrototype(__FUNCTION__);
	pCP1->Interface();

	ConcretePrototype* pCP2 = pCP1->Clone();
	pCP1 = (delete pCP1, NULL);
	pCP2->Interface();

	pCP2 = (delete pCP2, NULL);

	return 0;
}

RegistUnitRun("Prototype", Run);

NAMESPACE_END