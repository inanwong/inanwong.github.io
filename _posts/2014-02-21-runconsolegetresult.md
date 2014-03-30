---
layout: blog-post
title: "创建新的进程并等待返回结果"
excerpt: "创建新的进程并等待返回结果"
location: "Shenzhen NanShan"
time: 15:23 PM
tags:
- Windows
---

## 创建新的进程并等待返回结果 ##

### 创建新的普通进程并等待返回结果 ###

说明：创建新的进程，等待进程返回执行结果

	DWORD RunCommandProcessor(const PTCHAR pszCmd)
	{
		ASSERT(NULL != pszCmd);
		STARTUPINFO si = {sizeof(STARTUPINFO)};
		si.dwFlags = STARTF_USESHOWWINDOW;
		PROCESS_INFORMATION pi = {0};

		CString strCurDir;
		(void)GetModuleFileName(NULL, strCurDir.GetBuffer(MAX_PATH), MAX_PATH - 1);
		strCurDir.ReleaseBuffer();
		strCurDir = strCurDir.Left(strCurDir.ReverseFind(_T('\\')));

		CString strCmdLine;
		strCmdLine.Format(_T("%s\\%s"), strCurDir, pszCmd);
		BOOL bRet = CreateProcess(NULL, (LPTSTR)(LPCTSTR)strCmdLine,
			NULL, NULL, FALSE, 0, NULL, NULL, &si, &pi);
		DWORD dwExitCode = 0;
		if (bRet)
		{
			(void)CloseHandle(pi.hThread);
			(void)WaitForSingleObject(pi.hProcess, INFINITE);
			(void)GetExitCodeProcess(pi.hProcess, &dwExitCode);
			(void)CloseHandle(pi.hProcess);
		}
		return 0 == dwExitCode;
	}

### 创建新的控制台进程并等待返回结果以及获得控制台输出 ###

说明：主程序与控制台程序之间的通讯方式是内核句柄继承。

	DWORD RunCommandProcessor(const PTCHAR pszCmd, CString& strOutPut)
	{
		// TODO: Add your control notification handler code here
		DWORD dwRet = ERROR_INVALID_FUNCTION;

		CString strCurDir;
		(void)GetModuleFileName(NULL, strCurDir.GetBuffer(MAX_PATH), MAX_PATH - 1);
		strCurDir.ReleaseBuffer();
		strCurDir = strCurDir.Left(strCurDir.ReverseFind(_T('\\')));

		CString strCmdLine;
		strCmdLine.Format(_T("%s\\%s"), strCurDir, pszCmd);
		LOG(_T("%s"), strCmdLine);

		PROCESS_INFORMATION pi = {0};

		SECURITY_ATTRIBUTES sa = {sizeof(SECURITY_ATTRIBUTES)};
		sa.lpSecurityDescriptor = NULL;
		sa.bInheritHandle = TRUE;

		STARTUPINFO si = {sizeof(STARTUPINFO)};
		
		DWORD dwWaitRet = WAIT_FAILED;

		HANDLE hRead  = NULL;
		HANDLE hWrite = NULL;
		BOOL bRet = CreatePipe(&hRead, &hWrite, &sa, 0);
		if (!bRet)
		{
			goto final;
		}

		GetStartupInfo(&si);
		si.hStdError  = hWrite;
		si.hStdOutput = hWrite;
		si.wShowWindow = SW_HIDE;
		si.dwFlags = STARTF_USESHOWWINDOW | STARTF_USESTDHANDLES;
		
		bRet = CreateProcess(NULL, (LPTSTR)(LPCTSTR)strCmdLine, NULL, NULL, TRUE, 
			NULL, NULL, NULL, &si, &pi);	// TRUE:继承父进程句柄
		if (!bRet)
		{
			goto final;
		}

		(void)CloseHandle(pi.hThread);
		dwWaitRet = WaitForSingleObject(pi.hProcess, INFINITE);
		(void)GetExitCodeProcess(pi.hProcess, &dwRet);
		(void)CloseHandle(pi.hProcess);

		// 在ReadFile之前要关掉，否则ReadFile一直等待写入
		(void)CloseHandle(hWrite);

		if (dwWaitRet == WAIT_FAILED)
		{
			goto final;
		}
		
		char buffer[4096] = {0};	// 没有考虑WCHAR
		DWORD bytesRead = 0;
		do 
		{
			if (ReadFile(hRead, buffer, 4096, &bytesRead, NULL))
			{
				strOutPut += buffer;
			}
			else
			{
				break;
			}
		} while (TRUE);
	//	dwRet = ERROR_SUCCESS;
	final:
		
		(void)CloseHandle(hRead);
		return dwRet;
	}

### 应用程序关联控制台程序并显示输出 ###

参照MSDN中的Console Functions。该组函数用于为当前进程创建一个控制台界面，具体用途不明，一般用来输出日志，但是似乎没有Debug View方便。

以输出日志为例，大致的使用方式是：    
1.在‘App::InitInstance()’时调用‘AllocConsole();’分配一个控制台；   
2.此时可以配置控制台，比如调用‘SetConsoleTitle(_T("Title"));’，或者其他改变控制台特性的API：‘SetConsoleWindowInfo’、‘SetCurrentConsoleFontEx’等；    
3.需要向控制台写时：    

	HANDLE hdlWrite = GetStdHandle(STD_OUTPUT_HANDLE); //这里也可以使用STD_ERROR_HANDLE
	TCHAR c[MAX_PATH] = _T("Hello world!\r\n");
	BOOL bRet = WriteConsole(hdlWrite, c, _tcslen(c), NULL, NULL);
	CloseHandle(hdlWrite);
	
4.需要从控制台读时：  
  
	TCHAR szBuffer[MAX_PATH] = {0};
	DWORD dwCount = 0;
	HANDLE hdlRead = GetStdHandle(STD_INPUT_HANDLE);
	ReadConsole(hdlRead, szBuffer, MAX_PATH, &dwCount, NULL);
	CloseHandle(hdlRead);
	
5.退出时：    

	BOOL bRet = FreeConsole();

	