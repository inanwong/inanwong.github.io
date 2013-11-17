#include "CommonBridge.h"

enum PRODUCT_TYPE {TYPE_A, TYPE_B};

class AbstractProduct
{
public:
	virtual void Interface() = 0;
};

class ConcreteProductA: public AbstractProduct
{
public:
	void Interface() { cout<<__FUNCTION__<<endl; }
};

class ConcreteProductB: public AbstractProduct
{
public:
	void Interface() { cout<<__FUNCTION__<<endl; }
};

class AbstractFactory
{
public:
	virtual AbstractProduct* CreateProduct() = 0;
};

class ConcreteFactoryA: public AbstractFactory
{
public:
	AbstractProduct* CreateProduct() { return new ConcreteProductA; }
};

class ConcreteFactoryB: public AbstractFactory
{
public:
	AbstractProduct* CreateProduct() { return new ConcreteProductB; }
};

static int Run(int argc, char** argv)
{
	ConcreteFactoryA theFactoryA;
	AbstractProduct* pProductA = theFactoryA.CreateProduct();
	ConcreteFactoryA theFactoryB;
	AbstractProduct* pProductB = theFactoryB.CreateProduct();
	pProductA->Interface();
	pProductB->Interface();
	return 0;
}

RegistUnitRun("FactoryMethod", Run);