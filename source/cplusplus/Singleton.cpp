﻿#include "CommonBridge.h"

class Singleton
{
public:
	void Interface() const;
public:
	static Singleton* GetInstance();
protected:
	Singleton() {}
	virtual ~Singleton() {}
private:
	static Singleton s_theSingleton;
};

void Singleton::Interface() const
{
	std::cout<<__FUNCTION__<<std::endl;
}

Singleton* Singleton::GetInstance()
{
	return &s_theSingleton;
}

Singleton Singleton::s_theSingleton;

static int Run(int argc, char** argv)
{
	Singleton* pSingleton = Singleton::GetInstance();
	pSingleton->Interface();
	return 0;
}

RegistUnitRun("Singleton", Run);