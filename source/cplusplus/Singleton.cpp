#include <iostream>
using namespace std;

class Singleton
{
public:
	void Function() const;
public:
	static Singleton* GetInstance();
protected:
	Singleton() {};
	virtual ~Singleton() {};
private:
	static Singleton s_theSingleton;
};

void Singleton::Function() const
{
	std::cout<<"__FUNCTION__"<<std::endl;
}

Singleton* Singleton::GetInstance()
{
	return &s_theSingleton;
}

Singleton Singleton::s_theSingleton;

int main(int argc, char* argv[])
{
	Singleton* pSingleton = Singleton::GetInstance();
	pSingleton->Function();
	return 0;
}
