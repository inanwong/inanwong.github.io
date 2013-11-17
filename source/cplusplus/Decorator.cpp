#include "CommonBridge.h"

NAMESPACE_START(Decorator)

class Component
{
public:
	virtual void Interface() const = 0;
};

class ConcreteComponent : public Component
{
public:
	void Interface() const { cout<<__FUNCTION__<<endl; }
};

class Decorator : public Component
{
public:
	explicit Decorator(Component* pComponent)
		: m_pComponent(pComponent) {};
	virtual ~Decorator() {};
public:
	virtual void Interface() const = 0;
public:
	Component* m_pComponent;
};

class ConcreteDecoratorA : public Decorator
{
public:
	explicit ConcreteDecoratorA(Component* pComponent)
		: Decorator(pComponent), strAddedState(__FUNCTION__) {};
	virtual ~ConcreteDecoratorA() {};
public:
	void Interface() const { cout<<strAddedState<<endl; m_pComponent->Interface(); }
public:
	std::string strAddedState;
};

class ConcreteDecoratorB : public Decorator
{
public:
	explicit ConcreteDecoratorB(Component* pComponent)
		: Decorator(pComponent) {};
	virtual ~ConcreteDecoratorB() {};
public:
	void Interface() const { AddedBehavior(); m_pComponent->Interface(); }
public:
	void AddedBehavior() const { cout<<__FUNCTION__<<endl; };
};

static int Run(int argc, char** argv)
{
	Component* pConcreteComponent = new ConcreteComponent;
	pConcreteComponent->Interface();
	
	Component* pConcreteDecoratorA = new ConcreteDecoratorA(pConcreteComponent);
	pConcreteDecoratorA->Interface();

	Component* pConcreteDecoratorB = new ConcreteDecoratorB(pConcreteComponent);
	pConcreteDecoratorB->Interface();

	return 0;
}

RegistUnitRun("Decorator", Run);

NAMESPACE_END