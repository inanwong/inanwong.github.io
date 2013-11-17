#include "CommonBridge.h"

NAMESPACE_START(Flyweight)

class Flyweight
{
public:
	virtual void Operation(int extrinsicstate) = 0;
};

class ConcreteFlyweight : public Flyweight
{
public:
	void Operation(int extrinsicstate)
	{
		intrinsicState = extrinsicstate;
		cout<<__FUNCTION__<<extrinsicstate<<endl;
	}
private:
	int intrinsicState;
};

class UnsharedConcreteFlyweight : public Flyweight
{
public:
	void Operation(int extrinsicstate)
	{
		allState = extrinsicstate;
		cout<<__FUNCTION__<<extrinsicstate<<endl;
	}
private:
	int allState;
};

class FlyweightFactory
{
public:
	FlyweightFactory()
	{
		m_pFlyweightMap = new FlyweightMap;
		m_pFlyweightMap->insert(FlyweightPair("X", new ConcreteFlyweight));
		m_pFlyweightMap->insert(FlyweightPair("Y", new ConcreteFlyweight));
		m_pFlyweightMap->insert(FlyweightPair("Z", new ConcreteFlyweight));
	}
	~FlyweightFactory()
	{
		FlyweightMap::iterator itThis = m_pFlyweightMap->begin();
		for (; itThis != m_pFlyweightMap->end(); ++itThis)
		{
			Flyweight* pFlyweight = itThis->second;
			pFlyweight = (delete pFlyweight, NULL);
		}
		m_pFlyweightMap = (delete m_pFlyweightMap, NULL);
	}
	Flyweight* GetFlyweight(const std::string& strKey)
	{
		FlyweightMap::iterator itThis = m_pFlyweightMap->find(strKey);
		return itThis == m_pFlyweightMap->end() ? NULL : itThis->second;
	}
private:
	typedef map<const std::string, Flyweight*> FlyweightMap;
	typedef pair<const std::string, Flyweight*> FlyweightPair;
private:
	FlyweightMap* m_pFlyweightMap;
};

static int Run(int argc, char** argv)
{
	FlyweightFactory theFlyweightFactory;

	int extrinsicstate = 10;

	Flyweight* pFlyweightX = theFlyweightFactory.GetFlyweight("X");
	pFlyweightX->Operation(--extrinsicstate);

	Flyweight* pFlyweightY = theFlyweightFactory.GetFlyweight("X");
	pFlyweightY->Operation(--extrinsicstate);

	Flyweight* pFlyweightZ = theFlyweightFactory.GetFlyweight("X");
	pFlyweightZ->Operation(--extrinsicstate);

	Flyweight* pFlyweight = new UnsharedConcreteFlyweight;
	pFlyweight->Operation(--extrinsicstate);
	pFlyweight = (delete pFlyweight, NULL);

	return 0;
}

RegistUnitRun("Flyweight", Run);

NAMESPACE_END