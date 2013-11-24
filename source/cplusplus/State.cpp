#include "CommonBridge.h"

/*
 *	状态(State)-对象行为型模式
 *  允许一个对象在其内部状态改变时改变它的行为。对象看起来似乎修改了它的类。
 */
NAMESPACE_START(State)

/*
 *  • Context(环境，如TCPConnection)
 *  — 定义客户感兴趣的接口。
 *  — 维护一个ConcreteState子类的实例，这个实例定义当前状态。
 */

 /*
  *  • State(状态，如TCPState)
  *  — 定义一个接口以封装与Context的一个特定状态相关的行为。
  */

 /*
  *  • ConcreteStatesubclasses(具体状态子类，如TCPEstablished,TCPListen,TCPClosed)
  *  — 每一子类实现一个与Context的一个状态相关的行为。
  */

static int Run(int argc, char** argv)
{
	return 0;
}

RegistUnitRun("State", Run);

NAMESPACE_END