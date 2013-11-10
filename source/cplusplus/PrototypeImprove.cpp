#include "CommonBridge.h"

// ԭ��ģʽ�������в�Ʒ�Ķ�̬�Ľ�

NAMESPACE_START(PrototypeImprove)

class Prototype
{
public:
	virtual	void Interface() const = 0;
};

class ConcretePrototype : public Prototype
{
public:
	void Interface() const { cout<<__FUNCTION__<<endl; }
};

class ConcretePrototypeImprove : public Prototype
{
public:
	void Interface() const { cout << "Improve->" << __FUNCTION__ << endl; }
};

static int Run(int argc, char** argv)
{
	Prototype* pPrototype = new ConcretePrototype();
	pPrototype->Interface();

	pPrototype = (delete pPrototype, NULL);

	pPrototype = new ConcretePrototypeImprove();
	pPrototype->Interface();

	pPrototype = (delete pPrototype, NULL);

	return 0;
}

RegistUnitRun("PrototypeImprove", Run);

NAMESPACE_END