#include "CommonBridge.h"

/*
 *	����������(������ģʽ�еĶ�������ģʽ-��ϸ���)
 */
NAMESPACE_START(AdapterObjects)

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
class Adapter : public Target
{
public:
	void Interface() const
	{
		m_theAdaptee.InterfaceEx();
	}
private:
	Adaptee m_theAdaptee;
};

static int Run(int argc, char** argv)
{
	Target* pTarget = new Adapter();
	pTarget->Interface();

	return 0;
}

RegistUnitRun("AdapterObjects", Run);

NAMESPACE_END