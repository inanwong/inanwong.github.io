---
layout: blog-post
title: "服务在被频繁杀死的情况下重新启动服务"
excerpt: "服务在被频繁杀死的情况下重新启动服务"
location: "Shenzhen NanShan"
time: 10:56 PM
tags:
- Windows
---

## 服务在被频繁杀死的情况下重新启动服务 ##

当年在写一个服务监控程序的时候，遇到一个问题，被监控程序在被快速频繁杀死的情况下，有一定的概率无法被拉起。当时这个问题在项目中存在已经很久了，横跨多个版本，原来是通过增加超时时间以及重新尝试次数来解决，未能从根本上解决该问题。当时事情也很多，只能靠每天下班以后的时间来查问题，过了一星期终于解决了。

解决这个问题的过程中和同事发生了很多次激烈的碰撞，写下这个算作是以此为戒吧。

收获如下：

1.对于有权限设定的函数，需要设置所需要的最小权限，而不是使用所有权限。

2.对于一个监控程序，作且仅作一件事情：感知到被监控程序的运行状态，仅在被监控程序异常死亡时拉起。
不应该与业务逻辑纠缠在一起，负责启动被监控程序。

3.多倾听别人的意见，如果没有读书，没有去研究就要虚心听别人的想法，不要什么也不知道就讨论。

4.改动一个使用很久的模块，比修改新增加模块更耗时，需要考虑得更全面，承担风险，还要合理沟通，说明改动原因，不能想当然的认为这样的改动更好。

	/**
	 * @brief 启动指定服务，如果服务已经启动则返回TRUE
	 * @details
	 * 1.由于该函数需要在被监控服务频繁异常退出的场景下调用，鉴于服务的响应机制，需要
	 *   考虑函数内调用的API是否具有即时性。
	 * 2.由于Windows服务机制，API:QueryServiceStatus(Ex)获取结果可能不及时导致对服务
	 *   状态误判因此只能使用ControlService获取状态。
	 * 3.服务启动过程中会建立PIPE与WSCM的通讯，在极端情况下服务异常退出再启动过程中可能
	 *   会经历:
	 *   (1)ERROR_BROKEN_PIPE:109, The pipe has been ended.
	 *   (2)ERROR_BAD_PIPE:230, The pipe state is invalid.
	 *   (3)ERROR_SERVICE_NOT_ACTIVE:1062, The service has not been started.
	 *   因此需要尝试多次启动服务
	 * @param [in]lpszSvcName  服务名称
	 * @return FALSE表示启动失败，TRUE表示启动成功或服务已经启动
	 */
	BOOL StartService(LPCTSTR lpszSvcName)
	{
		assert(lpszSvcName);
		
		BOOL bRet = FALSE;
		SC_HANDLE schSCManager = NULL;
		SC_HANDLE schService   = NULL;
		SERVICE_STATUS ssStatus = {0};
		
		// 获得SCManager句柄 
		schSCManager = OpenSCManager(NULL, NULL, SC_MANAGER_CONNECT);
		if (NULL == schSCManager)
		{
			goto cleanup;
		}

		// 获得服务句柄
		schService = OpenService(schSCManager, lpszSvcName,
			SERVICE_QUERY_STATUS | SERVICE_START | SERVICE_INTERROGATE);
		if (NULL == schService)
		{
			goto cleanup;
		}
		
		// 启动服务(在StartService前先调用一下ControlService可以更新WSCM中的服务状态)
		bRet = ControlService(schService, SERVICE_CONTROL_INTERROGATE, &ssStatus);
		do 
		{
			bRet = ::StartService(schService, 0, NULL);
			bRet = ControlService(schService, SERVICE_CONTROL_INTERROGATE, &ssStatus);
			// 绝大多数情况下可以一次启动服务，极端情况下最多三次可以完成启动服务
			const UINT unPreWait = 100U;
			Sleep(unPreWait);
		} while (!bRet);
		
		bRet = (SERVICE_RUNNING == ssStatus.dwCurrentState ||
				SERVICE_START_PENDING == ssStatus.dwCurrentState);
	cleanup:
		if (schService)
		{
			(VOID)CloseServiceHandle(schService);
		}
		if (schSCManager)
		{
			(VOID)CloseServiceHandle(schSCManager);
		}
		return bRet;
	}
