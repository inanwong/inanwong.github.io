#include "CommonBridge.h"

/*
 *	命令模式(Command)-对象行为型模式
 *  将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化；对请求排队
 *  或记录请求日志，以及支持可撤消的操作。
 *  命令模式通过将请求本身变成一个对象来使工具箱对象可向未指定的应用对象提出请求。
 */
NAMESPACE_START(Command)

/*
 *	声明执行操作的接口。
 */
class Receiver;
class Command
{
public:
	explicit Command(Receiver* pReceiver) : m_pReceiver(pReceiver){}
	virtual ~Command();
	virtual void Execute() = 0;
protected:
	Receiver* m_pReceiver;
};

/*
 *	知道如何实施与执行一个请求相关的操作。任何类都可能作为一个接收者。
 */
class Receiver
{
public:
	void Action() { cout<<__FUNCTION__<<endl; }
};

/*
 *  ConcreteCommand
 *	将一个接收者对象绑定于一个动作。
 *  调用接者收相应的操作，以实现Execute。
 */
class ConcreteCommand : public Command
{
public:
	explicit ConcreteCommand(Receiver* pReceiver) : Command(pReceiver) {}
	void Execute() { m_pReceiver->Action(); }
};

/*
 *	要求该命令执行这个请求。
 *  可增加存放具体命令的容器
 */
class Invoker
{
private:
	Command* m_pCommand;
public:
	void SetCommand(Command* pCommand) { m_pCommand = pCommand; }
	void EcecuteCommand() { m_pCommand->Execute(); }
};

/*
 *	Client(Application)
 *  创建一个具体命令对象并设定它的接收者。
 */
static int Run(int argc, char** argv)
{
	Receiver* pReceiver = new Receiver;
	Command* pCommand = new ConcreteCommand(pReceiver);
	Invoker* pInvoker = new Invoker();

	pInvoker->SetCommand(pCommand);
	pInvoker->EcecuteCommand();

	pReceiver = (delete pReceiver, NULL);
	pCommand  = (delete pCommand, NULL);
	pInvoker  = (delete pInvoker, NULL);

	return 0;
}

RegistUnitRun("Command", Run);

NAMESPACE_END