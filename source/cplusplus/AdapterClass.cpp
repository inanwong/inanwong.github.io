#include "CommonBridge.h"

/*
 *	��������(������ģʽ�е�������ģʽ-�̳и���)
 */
NAMESPACE_START(AdapterClass)

// ����ͻ�����Ҫ�����ض�������صĽӿ�
class Target
{
public:
	virtual void Interface() const = 0;
};

// ����һ���Ѿ����ڵĽӿڣ�����ӿ���Ҫ����
class Adaptee
{
public:
	void InterfaceEx() const { cout<<__FUNCTION__<<endl; }
};

// ��Adaptee�Ľӿ���Target�ӿڽ�������
class Adapter : public Target, private Adaptee
{
public:
	void Interface() const
	{
		Adaptee::InterfaceEx();
	}
};

static int Run(int argc, char** argv)
{
	Target* pTarget = new Adapter();
	pTarget->Interface();

	return 0;
}

RegistUnitRun("AdapterClass", Run);

NAMESPACE_END