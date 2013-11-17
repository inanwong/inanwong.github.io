#include "CommonBridge.h"

NAMESPACE_START(Builder)

class Product
{
void Show() { cout<<__FUNCTION__<<endl; }
};

class Builder
{
public:
	virtual void BuildHead() = 0;
	virtual void BuildBody() = 0;
	virtual void BuildArm()  = 0;
	virtual void BuildLeg()  = 0;
};

// ��������
class ThinBuilder : public Builder
{
public:
	void BuildHead() { cout<<__FUNCTION__<<endl; }
	void BuildBody() { cout<<__FUNCTION__<<endl; }
	void BuildArm()  { cout<<__FUNCTION__<<endl; }
	void BuildLeg()  { cout<<__FUNCTION__<<endl; }
public:
	Product* GetResult() const { return m_pProduct; };
private:
	Product* m_pProduct;
};

// ��������
class FatBuilder : public Builder
{
public:
	void BuildHead() { cout<<__FUNCTION__<<endl; }
	void BuildBody() { cout<<__FUNCTION__<<endl; }
	void BuildArm()  { cout<<__FUNCTION__<<endl; }
	void BuildLeg()  { cout<<__FUNCTION__<<endl; }
public:
	Product* GetResult() const { return m_pProduct; };
private:
	Product* m_pProduct;
};

// �����ָ�ӹ�
class Director
{
private:
	Builder* m_pBuilder;
public:
	Director(Builder* builder) : m_pBuilder(builder) {}
	void Create()
	{
		m_pBuilder->BuildHead();
		m_pBuilder->BuildBody();
		m_pBuilder->BuildArm();
		m_pBuilder->BuildLeg();
	}
};

static int Run(int argc, char** argv)
{
	FatBuilder fatBuilder;

	Director director(&fatBuilder);
	director.Create();

	Product* pBuilder = fatBuilder.GetResult();
	return 0;
}

RegistUnitRun("Builder", Run);

NAMESPACE_END