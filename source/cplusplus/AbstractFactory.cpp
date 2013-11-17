#include "CommonBridge.h"

// 抽象工厂

// 产品A
class AbstractProductA
{
public:
	virtual void Interface() = 0;
};

class ConcreteProductA1: public AbstractProductA
{
public:
	void Interface() { cout<<__FUNCTION__<<endl; }
};

class ConcreteProductA2: public AbstractProductA
{
public:
	void Interface() { cout<<__FUNCTION__<<endl; }
};

// 产品B
class AbstractProductB
{
public:
	virtual void Interface() = 0;
};

class ConcreteProductB1: public AbstractProductB
{
public:
	void Interface() { cout<<__FUNCTION__<<endl; }
};

class ConcreteProductB2: public AbstractProductB
{
public:
	void Interface() { cout<<__FUNCTION__<<endl; }
};

// 工厂
class AbstractFactory
{
public:
	virtual AbstractProductA* CreateProductA() = 0;
	virtual AbstractProductB* CreateProductB() = 0;
};

// 工厂A
class ConcreteFactoryA: public AbstractFactory
{
public:
	AbstractProductA* CreateProductA() { return new ConcreteProductA1; }
	AbstractProductB* CreateProductB() { return new ConcreteProductB1; }
};

// 工厂B
class ConcreteFactoryB: public AbstractFactory
{
public:
	AbstractProductA* CreateProductA() { return new ConcreteProductA2; }
	AbstractProductB* CreateProductB() { return new ConcreteProductB2; }
};

static int Run(int argc, char** argv)
{
	ConcreteFactoryA theFactoryA;
	AbstractProductA* pProductA = theFactoryA.CreateProductA();
	ConcreteFactoryB theFactoryB;
	AbstractProductB* pProductB = theFactoryB.CreateProductB();
	pProductA->Interface();
	pProductB->Interface();
	return 0;
}

RegistUnitRun("AbstractFactory", Run);