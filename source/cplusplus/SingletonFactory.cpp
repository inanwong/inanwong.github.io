#include "CommonBridge.h"
#include <list>

NAMESPACE_START(SingletonFactory)

class Singleton;

typedef pair<string, Singleton*> SingletonPair;

typedef list<SingletonPair> SingletonPairList;

typedef SingletonPairList::const_iterator SingletonPairListConstIter;

#define KIND_NAME	"SingletonB"

class Singleton
{
public:

	Singleton() {}
	virtual ~Singleton() {}

public:

	virtual void Function() const = 0;

public:

	static void Register(const string& strName, Singleton* pSingleton)
	{
		s_lsSingleton.push_back(make_pair(strName, pSingleton));
	}

	static Singleton* GetInstance()
	{
		return Lookup(KIND_NAME);
	}

	static Singleton* Lookup(const string& strName)
	{
		SingletonPairListConstIter it = s_lsSingleton.begin();
		for (; it != s_lsSingleton.end(); ++it)
		{
			if (((*it).first).compare(strName) == 0)
			{
				return (*it).second;
			}
		}
		return NULL;
	}

private:
	static SingletonPairList s_lsSingleton;
};

class SingletonA : public Singleton
{
public:
	SingletonA()
	{
		Singleton::Register("SingletonA", this);
	}
	virtual ~SingletonA()
	{
	}
public:
	void Function() const
	{
		std::cout<<"SingletonA"<<std::endl;
	}
};

class SingletonB : public Singleton
{
public:
	SingletonB()
	{
		Singleton::Register("SingletonB", this);
	}
	virtual ~SingletonB()
	{
	}
public:
	void Function() const
	{
		std::cout<<"SingletonB"<<std::endl;
	}
};

SingletonPairList Singleton::s_lsSingleton;

static SingletonA g_theSingletonA;
static SingletonB g_theSingletonB;

static int Run(int argc, char** argv)
{
	Singleton* pSingleton = Singleton::GetInstance();
	pSingleton->Function();
	return 0;
}

RegistUnitRun("SingletonFactory", Run);

NAMESPACE_END