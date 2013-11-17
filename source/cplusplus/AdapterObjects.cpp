#include "CommonBridge.h"

/*
 *	对象适配器(适配器模式中的对象类型模式-组合复用)
 */
NAMESPACE_START(AdapterObjects)

// 定义客户端需要的与特定领域相关的接口
class Target
{
public:
	virtual void Interface() const = 0;
};

// 定义一个已经存在的接口，这个接口需要适配
class Adaptee
{
public:
	void InterfaceEx() const { cout<<__FUNCTION__<<endl; }
};

// 对Adaptee的接口与Target接口进行适配
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