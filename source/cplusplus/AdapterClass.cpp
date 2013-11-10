#include "CommonBridge.h"

/*
 *	类适配器(适配器模式中的类类型模式-继承复用)
 */
NAMESPACE_START(AdapterClass)

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