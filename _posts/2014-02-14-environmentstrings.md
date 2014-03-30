---
layout: blog-post
title: "控制台输出环境变量"
excerpt: "控制台输出环境变量"
location: "Shenzhen NanShan"
time: 10:48 PM
tags:
- Windows
---

## 控制台输出环境变量 ##

/**
 * @brief 控制台输出环境变量.
 * Parse the block with the following format:
 * [0] /f=ipconfig.out
 * [1] =C:=C:\Program Files\Microsoft Visual Studio 10.0\Common7\IDE
 * [2] =D:=D:\Temp\WinVer\OSVersion
 * [3] ALLUSERSPROFILE=C:\ProgramData
 * ... ...
 * @return void
 */
void DumpEnvironmentStrings()
{
	PTSTR pEnvBlock = GetEnvironmentStrings();
	TCHAR szName[MAX_PATH]  = {0};
	TCHAR szValue[MAX_PATH] = {0};
	PTSTR pszCurrent = pEnvBlock;
	HRESULT hr = S_OK;
	PCTSTR pszPos = NULL;
	int nIndex = 0;

	while (pszCurrent != NULL) 
	{
		// Skip the meaningless strings like:
		// "=::=::\"
		if (*pszCurrent != _T('=')) 
		{
			// Look for '=' separator.
			pszPos = _tcschr(pszCurrent, _T('='));
			// Point now to the first character of the value.
			pszPos++;

			// Copy the variable name. Without the' ='.
			size_t cbNameLength =
				(size_t)pszPos - (size_t)pszCurrent - sizeof(TCHAR);
			hr = StringCbCopyN(szName, MAX_PATH, pszCurrent, cbNameLength);
			if (FAILED(hr)) 
			{
				break;
			}

			// Copy the variable value with the last NULL character
			// and allow truncation because this is for UI only.
			hr = StringCchCopyN(szValue, MAX_PATH, pszPos, _tcslen(pszPos) + 1);
			if (SUCCEEDED(hr)) 
			{
				_tprintf(_T("[%u] %s=%s\r\n"), nIndex, szName, szValue);
			}  
			else if (hr == STRSAFE_E_INSUFFICIENT_BUFFER) 
			{
				 // something wrong happened, check for truncation.
				_tprintf(_T("[%u] %s=%s...\r\n"), nIndex, szName, szValue);
			} 
			else
			{ 
				// This should never occur.
				_tprintf(_T("[%u] %s=???\r\n"), nIndex, szName);
				break;
			}
		}
		else 
		{
			_tprintf(_T("[%u] %s\r\n"), nIndex, pszCurrent);
		}

		// Next variable please.
		nIndex++;
		// Move to the end of the string.
		while (*pszCurrent != _T('\0'))
		{
			pszCurrent++;
		}
		pszCurrent++;

		// Check if it was not the last string.
		if (*pszCurrent == _T('\0'))
		{
			break;
		}
	};

	// Don't forget to free the memory.
	(void)FreeEnvironmentStrings(pEnvBlock);

	return;
}