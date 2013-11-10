#include "CommonBridge.h"

NAMESPACE_START(Composite)

class Composite;

class Component
{
public:
	virtual Composite* GetComposite() { return 0; }
};

class Composite : public Component
{
public:
	void Add(Component*);

	virtual Composite* GetComposite() { return this; }
};

class Leaf : public Component
{

};

static int Run(int argc, char** argv)
{

	return 0;
}

RegistUnitRun("Composite", Run);

NAMESPACE_END