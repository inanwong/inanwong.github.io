#include "CommonBridge.h"

NAMESPACE_START(Composite)

class Composite;

class Component
{
public:
	virtual Composite* GetComposite() { return 0; }
public:
	virtual void Diaplay() const = 0;
};

class Composite : public Component
{
public:
	virtual ~Composite();
public:
	virtual Composite* GetComposite() { return this; }
public:
	void Add(Component* pComponent);
	void Remove(Component* pComponent);
	Component* GetChild(long lComponent) const;
public:
	void Diaplay() const;
private:
	typedef map<long, Component*> DataMap;
	typedef pair<long, Component*> DataPair;
private:
	DataMap m_mapData;
};

class Leaf : public Component
{
public:
	void Diaplay() const { cout<<__FUNCTION__<<endl; }
};

Composite::~Composite()
{
	DataMap::iterator itThis = m_mapData.begin();
	while (itThis != m_mapData.end())
	{
		delete itThis->second;
		itThis->second = NULL;
		++itThis;
	}
}

void Composite::Add(Component* pComponent)
{
	assert(NULL != pComponent);
	DataMap::iterator itThis = m_mapData.find((long)pComponent);
	if (itThis != m_mapData.end() && NULL != itThis->second)
	{
		delete (itThis->second);
		itThis->second = NULL;
	}
	m_mapData.insert(DataPair((long)pComponent, pComponent));
}

void Composite::Remove(Component* pComponent)
{
	assert(NULL != pComponent);
	m_mapData.erase((long)pComponent);
}

Component* Composite::GetChild(long lComponent) const
{
	DataMap::const_iterator itThis = m_mapData.find(lComponent);
	if (itThis != m_mapData.end())
	{
		return itThis->second;
	}
	return NULL;
}

void Composite::Diaplay() const
{
	DataMap::const_iterator itThis = m_mapData.begin();
	while (itThis != m_mapData.end())
	{
		Component* pComponent = itThis->second;
		pComponent->Diaplay();
		++itThis;
	}
}

static int Run(int argc, char** argv)
{
	Composite* pComposite = new Composite;

	pComposite->Add(new Leaf);
	pComposite->Add(new Leaf);

	Composite* pCompositeEx = new Composite;
	pCompositeEx->Add(new Leaf);
	pComposite->Add(pCompositeEx);

	Component* pComponent = pComposite;
	pComponent->Diaplay();

	return 0;
}

RegistUnitRun("Composite", Run);

NAMESPACE_END