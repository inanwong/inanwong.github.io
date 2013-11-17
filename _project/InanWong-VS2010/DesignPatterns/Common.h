#ifndef COMMON_H_
#define COMMON_H_

#include <iostream>
#include <map>
#include <list>
#include <string>
#include <cassert>

using namespace std;

////////////////////////////////////////////////////////////////////////////////

/*
 *	单元运行套件
 */
class CUnitRun
{
public:
	typedef int(*RunType)(int argc, char** argv);
public:
	CUnitRun() {}
	CUnitRun(CUnitRun::RunType pRunType, int argc = 0, char** argv = NULL)
		: m_pRunType(pRunType), m_argc(argc) , m_argv(argv) {}
	int operator()()
	{
		assert(NULL != m_pRunType);
		return m_pRunType(m_argc, m_argv);
	}
private:
	RunType m_pRunType;
	int     m_argc;
	char**  m_argv;
};

class CUnitRunSuite
{
public:
	CUnitRunSuite(const std::string& strMod, const CUnitRun& theUnitRun);

public:
	static void RunSuite();

public:
	typedef map<const std::string, CUnitRun> RunMap;

private:
	typedef pair<const std::string, CUnitRun> RunPair;

private:
	static RunMap* s_pUnitRunSuite;
};

#define RegistUnitRun1(function)	\
	static CUnitRunSuite sThis(__FILE__, CUnitRun(function));

#define RegistUnitRun2(mod, function)	\
	static CUnitRunSuite sThis(mod, CUnitRun(function));

#define RegistUnitRun	RegistUnitRun2

////////////////////////////////////////////////////////////////////////////////

/*
 *	命名空间宏定义
 */
#define NAMESPACE_START(name)	namespace name {
#define NAMESPACE_END			}

#endif // COMMON_H_