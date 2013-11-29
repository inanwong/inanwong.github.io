#include "CommonBridge.h"

NAMESPACE_START(Interpreter)

static int Run(int argc, char** argv)
{
	return 0;
}

RegistUnitRun("Interpreter", Run);

NAMESPACE_END