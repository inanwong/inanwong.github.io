#include "CommonBridge.h"

/*
 *	命令模式(Command)-对象行为型模式
 *  将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化；对请求排队
 *  或记录请求日志，以及支持可撤消的操作。
 */
NAMESPACE_START(Command)

/*
 *	声明执行操作的接口。
 */
class Command
{
public:
	virtual ~Command();
	virtual void Execute() = 0;
protected:
	Command();
};

/*
 *  ConcreteCommand
 *	将一个接收者对象绑定于一个动作。
 *  调用接者收相应的操作，以实现Execute。
 */
class OpenCommand : public Command
{
public:
//	OpenCommand(Application*);
};

class PasteCommand : public Command
{
};

class MacroCommand : public Command
{
};

/*
 *	Client(Application)
 *  创建一个具体命令对象并设定它的接收者。
 */

/*
 *	要求该命令执行这个请求。
 */
class Invoker
{
};

/*
 *	知道如何实施与执行一个请求相关的操作。任何类都可能作为一个接收者。
 */
class Receiver
{
};

static int Run(int argc, char** argv)
{
	return 0;
}

RegistUnitRun("Command", Run);

NAMESPACE_END