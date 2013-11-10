#include "CommonBridge.h"

/*
 *	�Ž�ģʽ:�����󲿷�������ʵ�ֲ��ַ��룬ʹ���Ƕ����Զ����ر仯��
 */
NAMESPACE_START(Bridge)

class Implementor
{
public:
	virtual void InterfaceImp() const = 0;
};

class ConcretelmplementorA : public Implementor
{
public:
	// ���󲿷�
	void InterfaceImp() const { cout<<__FUNCTION__<<endl; }
};

class ConcretelmplementorB : public Implementor
{
public:
	void InterfaceImp() const { cout<<__FUNCTION__<<endl; }
};

class Abstraction
{
public:
	virtual void Interface(Implementor* pImp) const = 0;
};

class RefineAbstraction : public Abstraction
{
public:
	void Interface(Implementor* pImp) const
	{
		pImp->InterfaceImp();
	}
};

static int Run(int argc, char** argv)
{
	Implementor* pImp = new ConcretelmplementorA();

	Abstraction* pAbs = new RefineAbstraction();

	pAbs->Interface(pImp);

	pImp = (delete pImp, NULL);

	pAbs = (delete pAbs, NULL);

	return 0;
}

RegistUnitRun("Bridge", Run);

NAMESPACE_END