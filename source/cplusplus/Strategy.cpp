#include "CommonBridge.h"

/*
 *	策略模式(Strategy)
 *  定义一系列的算法，把它们一个个封装起来，并且使它们可相互替换。本模式使得算法可
 *  独立于使用它的客户而变化。
 */
NAMESPACE_START(Strategy)

/*
 *  Strategy(策略)
 *  - 定义所有支持的算法的公共接口。Context使用这个接口来调用某ConcreteStrategy定
 *    义的算法。
 */
class Strategy
{
public:
	virtual void ForReplaceInterface() const = 0;
};

/*
 *  ConcreteStrategy(具体策略)
 *  - 以Strategy接口实现某具体算法。
 */
class ConcreteStrategyA : public Strategy
{
public:
	void ForReplaceInterface() const { cout<<__FUNCTION__<<endl; }
};

class ConcreteStrategyB : public Strategy
{
public:
	void ForReplaceInterface() const { cout<<__FUNCTION__<<endl; }
};

class ConcreteStrategyC : public Strategy
{
public:
	void ForReplaceInterface() const { cout<<__FUNCTION__<<endl; }
};

/*
 *	Context(上下文)
 *  - 用一个ConcreteStrategy对象来配置。
 *  - 维护一个对Strategy对象的引用。
 *  - 可定义一个接口来让Stategy访问它的数据。
 */

// 方式一：直接通过参数指定，传入一个特定算法的指针。
#if 0
class Context
{
public:
	explicit Context(Strategy* pStrategy) : m_pStrategy(pStrategy) {}
	virtual ~Context() { m_pStrategy = (delete m_pStrategy, NULL); }
	void ForReplaceInterface() const { m_pStrategy->ForReplaceInterface(); }
private:
	Strategy* m_pStrategy;
};
Context theContext(new ConcreteStrategyA);
theContext.ForReplaceInterface();
#endif

// 方式二：使用简单工厂模式
#if 0
class Context
{
public:
	typedef enum KIND {KIND_A, KIND_B, KIND_C} Kind;

public:
	explicit Context(KIND nKind)
	{
		switch (nKind)
		{
		case KIND_A:
			m_pStrategy = new ConcreteStrategyA;
			break;
		case KIND_B:
			m_pStrategy = new ConcreteStrategyB;
			break;
		case KIND_C:
			m_pStrategy = new ConcreteStrategyC;
			break;
		default:
			m_pStrategy = NULL;
			break;
		}
	}
	virtual ~Context() { m_pStrategy = (delete m_pStrategy, NULL); }
	void ForReplaceInterface() const { m_pStrategy->ForReplaceInterface(); }
private:
	Strategy* m_pStrategy;
};
Context theContext(Context::KIND_A);
theContext.ForReplaceInterface();
#endif

//  方式三：利用模板实现
template <class Strategy>
class Context
{
private:
	Strategy m_theStrategy;
public:
	Context() { }
	~Context() { }
	void ForReplaceInterface() { m_theStrategy.ForReplaceInterface(); }
};

static int Run(int argc, char** argv)
{
// 	Context theContext(new ConcreteStrategyA);
// 	theContext.ForReplaceInterface();

// 	Context theContext(Context::KIND_A);
// 	theContext.ForReplaceInterface();

	Context<ConcreteStrategyA> theContext;
	theContext.ForReplaceInterface();

	return 0;
}

RegistUnitRun("Strategy", Run);

NAMESPACE_END