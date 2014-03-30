---
layout: blog-post
title: "当前应用程序目录"
excerpt: "当前应用程序目录"
location: "Shenzhen NanShan"
time: 10:34 PM
tags:
- Windows
---

## 当前应用程序目录 ##

GetCurrentDirectory返回当前进程的当前目录，并不一定返回应用程序所在的目录。如果在应用程序中调用了打开文件对话框，并且选择了一个文件，那么，这个文件所在的目录就成了当前进程的当前目录了。

也可以使用C运行库函数_chdir而不是Windows的SetCurrentDirectory函数来更改当前目录。_chdir函数在内部调用SetCurrentDirectory，但_chdir还会调用SetEnvironmentVariable来添加或修改环境变量，从而使不同驱动器的当前目录得以保留。

### 获取当前进程对应的可执行文件文件所在目录 ###

    /**
     * @brief 获取当前进程对应的可执行文件文件所在目录
     * @param [out] a pointer to a buffer.
     * @param [in] the size of the buffer, in TCHARs. eg. MAX_PATH_CHARS.
     * @return the results
    */
    BOOL INWGetModuleDirectory(LPTSTR lpDirectory, DWORD dwChars)
    {
        DWORD dwRet = GetModuleFileName(NULL, lpDirectory, dwChars);
        if (dwRet == 0 || dwRet == dwChars)
        {
            return FALSE;
        }
        (_tcsrchr(lpDirectory, _T('\\')))[0] = _T('\0');
        return TRUE;
    }

    /**
     * @brief 获取当前进程的当前目录
     * @param [out] a pointer to a buffer.
     * @param [in] the size of the buffer, in TCHARs. eg. MAX_PATH_CHARS.
     * @return the results
    */
    BOOL INWGetCurrentDirectory(LPTSTR lpDirectory, DWORD dwChars)
    {
        DWORD dwRet = GetCurrentDirectory(dwChars, lpDirectory);
        if (dwRet == 0 || dwRet >= dwChars)
        {
            return FALSE;
        }
        return TRUE;
    }

#### 注意与约定 ####
+   所获得的路径尾部没有'\0';    
+   dwChars表示the size of the buffer, in TCHARs.    

### 关于缓冲区与字符串，大小与长度的约定 ###

+   Size  : The size of the buffer, in CHARs.
+   Chars : The size of the buffer, in TCHARs.
+   Length : The length of the string, not including the terminating null character, in TCHARs.

    /** Maximum length of the path. */    
    \#ifndef MAX_PATH    
    \#define MAX_PATH        260    
    \#endif    
    \#define MAX_PATH_LEN    MAX_PATH    

    /** Maximum chars of full path. */    
    \#define MAX_PATH_CHARS  (MAX_PATH_LEN + 1)    

### 参考资料: ###

#### GetCurrentDirectory function ####
Retrieves the current directory for the current process.

Syntax
    DWORD WINAPI GetCurrentDirectory(
      _In_   DWORD nBufferLength,
      _Out_  LPTSTR lpBuffer
    );

Parameters
nBufferLength [in] 
The length of the buffer for the current directory string, in TCHARs. The buffer length must include room for a terminating null character. 

lpBuffer [out] 
A pointer to the buffer that receives the current directory string. This null-terminated string specifies the absolute path to the current directory.

To determine the required buffer size, set this parameter to NULL and the nBufferLength parameter to 0. 

Return value
If the function succeeds, the return value specifies the number of characters that are written to the buffer, not including the terminating null character.

If the function fails, the return value is zero. To get extended error information, call GetLastError. 

If the buffer that is pointed to by lpBuffer is not large enough, the return value specifies the required size of the buffer, in characters, including the null-terminating character. 

#### GetModuleFileName function ####
Retrieves the fully qualified path for the file that contains the specified module. The module must have been loaded by the current process.

To locate the file for a module that was loaded by another process, use the GetModuleFileNameEx function. 

Syntax
    DWORD WINAPI GetModuleFileName(
      _In_opt_  HMODULE hModule,
      _Out_     LPTSTR lpFilename,
      _In_      DWORD nSize
    );

Parameters
hModule [in, optional] 
A handle to the loaded module whose path is being requested. If this parameter is NULL, GetModuleFileName retrieves the path of the executable file of the current process. 

The GetModuleFileName function does not retrieve the path for modules that were loaded using the LOAD_LIBRARY_AS_DATAFILE flag. For more information, see LoadLibraryEx. 
lpFilename [out] 
A pointer to a buffer that receives the fully qualified path of the module. If the length of the path is less than the size that the nSize parameter specifies, the function succeeds and the path is returned as a null-terminated string. 

If the length of the path exceeds the size that the nSize parameter specifies, the function succeeds and the string is truncated to nSize characters including the terminating null character. 

Windows XP:  The string is truncated to nSize characters and is not null-terminated. 

The string returned will use the same format that was specified when the module was loaded. Therefore, the path can be a long or short file name, and can use the prefix "\\?\". For more information, see Naming a File. 
nSize [in] 
The size of the lpFilename buffer, in TCHARs. 

Return value
If the function succeeds, the return value is the length of the string that is copied to the buffer, in characters, not including the terminating null character. If the buffer is too small to hold the module name, the string is truncated to nSize characters including the terminating null character, the function returns nSize, and the function sets the last error to ERROR_INSUFFICIENT_BUFFER. 

Windows XP:  If the buffer is too small to hold the module name, the function returns nSize. The last error code remains ERROR_SUCCESS. If nSize is zero, the return value is zero and the last error code is ERROR_SUCCESS. 

If the function fails, the return value is 0 (zero). To get extended error information, call GetLastError. 

Remarks
If a DLL is loaded in two processes, its file name in one process may differ in case from its file name in the other process.

The global variable _pgmptr is automatically initialized to the full path of the executable file, and can be used to retrieve the full path name of an executable file. 

##### GetModuleFileNameEx function ####

Retrieves the fully qualified path for the file containing the specified module.
      DWORD WINAPI GetModuleFileNameEx(
        _In_      HANDLE hProcess,
        _In_opt_  HMODULE hModule,
        _Out_     LPTSTR lpFilename,
        _In_      DWORD nSize
      );

Parameters
hProcess [in] 
A handle to the process that contains the module. 

The handle must have the PROCESS_QUERY_INFORMATION and PROCESS_VM_READ access rights. For more information, see Process Security and Access Rights. 

The GetModuleFileNameEx function does not retrieve the path for modules that were loaded using the LOAD_LIBRARY_AS_DATAFILE flag. For more information, see LoadLibraryEx. 
hModule [in, optional] 
A handle to the module. If this parameter is NULL, GetModuleFileNameEx returns the path of the executable file of the process specified in hProcess. 
lpFilename [out] 
A pointer to a buffer that receives the fully qualified path to the module. If the size of the file name is larger than the value of the nSize parameter, the function succeeds but the file name is truncated and null-terminated. 
nSize [in] 
The size of the lpFilename buffer, in characters. 

Return value

If the function succeeds, the return value specifies the length of the string copied to the buffer.

If the function fails, the return value is zero. To get extended error information, call GetLastError. 
