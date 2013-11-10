#include "CommonBridge.h"

NAMESPACE_START(SingletonLazy)

class Singleton
{
public:
	void Interface() const;
public:
	static Singleton* GetInstance();
protected:
	Singleton() {}
	virtual ~Singleton() {}
private:
	static Singleton* s_pSingleton;
};

void Singleton::Interface() const
{
	std::cout<<__FUNCTION__<<std::endl;
}

#if 1
Singleton* Singleton::GetInstance()
{
	if (0 == s_pSingleton)
	{
		s_pSingleton = new Singleton();
	}
	return s_pSingleton;
}
#else
Singleton* Singleton::GetInstance()
{
	static Singleton* s_pSingleton = new Singleton();
	return s_pSingleton;
}
#endif

Singleton* Singleton::s_pSingleton = NULL;

static int Run(int argc, char** argv)
{
	Singleton* pSingleton = Singleton::GetInstance();
	pSingleton->Interface();
	return 0;
}

RegistUnitRun("SingletonLazy", Run);

NAMESPACE_END