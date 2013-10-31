

#include "iostream"
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
	printf("%s", __FUNCTION__);
}

Singleton* Singleton::GetInstance()
{
	if (0 == s_pSingleton)
	{
		s_pSingleton = new Singleton();
	}
	return s_pSingleton;
}

Singleton* Singleton::s_pSingleton = 0;

int main(int argc, char* argv[])
{
	Singleton* pSingleton = Singleton::GetInstance();
	pSingleton->Function();
	return 0;
}
