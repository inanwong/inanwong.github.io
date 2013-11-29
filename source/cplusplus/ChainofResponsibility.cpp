#include "CommonBridge.h"

/*
 *	职责链模式：使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦
 *  合关系。将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为
 *  止。
 *  注：责任链精髓在于，链上可以节点没有绝对的上下级概念，可以上下级之间，同级之
 *  间相互传递。或许变成了环。
 */
NAMESPACE_START(ChainofResponsibility)

class Request
{
public:
	typedef enum KIND {KIND_NONE, KIND_A, KIND_B} Kind;

public:
	explicit Request(Kind nKind, const string& strRequest)
		: m_nKind(nKind), m_strRequest(strRequest) {}
	int GetKind() const { return m_nKind; }
	const string& GetRequest() const { return m_strRequest; }

private:
	Kind	m_nKind;
	string	m_strRequest;
};

/*
 *	定义一个处理请求的接口。
 *  (可选)实现后继链。
 */
class Handler
{
public:
	Handler(Handler* pHandler)
		: m_pHandler(pHandler) {}
	virtual void HandleRequest(const Request* pRequest) const = 0;
protected:
	void HandleHelp(const Request* pRequest) const
	{
		if (NULL != m_pHandler)
		{
			m_pHandler->HandleRequest(pRequest);
		}
	}
protected:
	Handler* m_pHandler;	// 指向后继者的指针
};

/*
 *	处理它所负责的请求。
 *  可访问他的后继者。
 *  如果可处理改请求，就处理，否则将该请求转发给它的后继者
 */
class ConcreteHandlerA : public Handler
{
public:
	ConcreteHandlerA(Handler* pHandler = NULL)
		: Handler(pHandler) {}
	void HandleRequest(const Request* pRequest) const
	{
		switch (pRequest->GetKind())
		{
		case Request::KIND_A :
			cout << __FUNCTION__ << pRequest->GetRequest() << endl;
			break;
		default:
			Handler::HandleHelp(pRequest);
			break;
		}
	}
};

class ConcreteHandlerB : public Handler
{
public:
	// 指定后继者
	ConcreteHandlerB(Handler* pHandler = NULL)
		: Handler(pHandler) {}
	void HandleRequest(const Request* pRequest) const
	{
		switch (pRequest->GetKind())
		{
		case Request::KIND_B :
			cout << __FUNCTION__ << pRequest->GetRequest() << endl;
			break;
		default:
			Handler::HandleHelp(pRequest);
			break;
		}
	}
};

/*
 *	Client
 *  向链上的具体处理者对象提交请求。
 */
static int Run(int argc, char** argv)
{
	Request rA(Request::KIND_A, "Request From A");
	Request rB(Request::KIND_B, "Request From B");

	Handler* pA = new ConcreteHandlerA();
	Handler* pB = new ConcreteHandlerB(pA);
	pB->HandleRequest(&rB);
	pB->HandleRequest(&rA);

	pA = (delete pA, NULL);
	pB = (delete pB, NULL);

	// 应有接口为ConcreteHandler指定后继者
	return 0;
}

RegistUnitRun("ChainofResponsibility", Run);

NAMESPACE_END