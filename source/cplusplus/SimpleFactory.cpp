#include "CommonBridge.h"

enum PRODUCT_TYPE {TYPE_A, TYPE_B};

class AbstractProduct
{
public:
	virtual void Show() = 0;
};

class ConcreteProductA: public AbstractProduct
{
public:
	void Show() { cout<<__FUNCTION__<<endl; }
};

class ConcreteProductB: public AbstractProduct
{
public:
	void Show() { cout<<__FUNCTION__<<endl; }
};

class Factory
{
public:
	AbstractProduct* CreateSingleCore(PRODUCT_TYPE ctype)
	{
		switch (ctype)
		{
		case TYPE_A:
			return new ConcreteProductA;
		case TYPE_B:
			return new ConcreteProductB;
		default:
			return NULL;
		}
	}
};

static int Run(int argc, char** argv)
{
	Factory theFactory;
	AbstractProduct* pProduct = theFactory.CreateSingleCore(TYPE_A);
	pProduct->Show();
	delete pProduct;
	pProduct = NULL;
	return 0;
}

RegistUnitRun("SimpleFactory", Run);