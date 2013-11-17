#include "CommonBridge.h"

NAMESPACE_START(Facade)

class SubSystemA
{
public:
	void Interface() { cout<<__FUNCTION__<<endl; }
};

class SubSystemB
{
public:
	void Interface() { cout<<__FUNCTION__<<endl; }
};

class Facade
{
public:
	void Interface()
	{
		SubSystemA sysA;
		sysA.Interface();
		SubSystemB sysB;
		sysB.Interface();
	}
};

static int Run(int argc, char** argv)
{
	Facade theFacade;
	theFacade.Interface();
	return 0;
}

RegistUnitRun("Facade", Run);

NAMESPACE_END