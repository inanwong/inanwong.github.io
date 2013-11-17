#include "Common.h"

CUnitRunSuite::RunMap* CUnitRunSuite::s_pUnitRunSuite = NULL;

CUnitRunSuite::CUnitRunSuite(const std::string& strMod, const CUnitRun& theUnitRun)
{
	static RunMap s_GlobalRunMap;
	s_pUnitRunSuite = &s_GlobalRunMap;
	s_GlobalRunMap.insert(RunPair(strMod, theUnitRun));
}

void CUnitRunSuite::RunSuite()
{
	if (NULL == s_pUnitRunSuite)
	{
		return;
	}
	RunMap::const_iterator cIter = s_pUnitRunSuite->begin();
	for (; cIter != s_pUnitRunSuite->end(); ++cIter)
	{
		cout<<"===Run::"<<cIter->first<<endl;
		CUnitRun pfRun = cIter->second;
		(void)pfRun();
	}
	return;
}