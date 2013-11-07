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
	static Singleton* s_pSingleton;
};

void Singleton::Function() const
{
	std::cout<<"__FUNCTION__"<<std::endl;
}

#if 1
Singleton* Singleton::GetInstance()
{
	if (0 == s_pSingleton)
	{
		s_pSingleton = new Singleton();
	}
	return s_pSingleton;
}
#else
Singleton* Singleton::GetInstance()
{
	static Singleton* s_pSingleton = new Singleton();
	return s_pSingleton;
}
#endif

Singleton* Singleton::s_pSingleton = 0;

int main(int argc, char* argv[])
{
	Singleton* pSingleton = Singleton::GetInstance();
	pSingleton->Function();
	return 0;
}
