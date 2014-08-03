---
layout: blog-post
title: "写一个线程类"
excerpt: "写一个线程类"
location: "Shenzhen LYJ"
time: 01:38 PM
category: Tool
tags:
- Tool
---

## 写一个线程类 ##


## 创建线程 ##

### _beginthread、_beginthreadex ###

    _CRTIMP uintptr_t __cdecl _beginthread (_In_ void (__cdecl * _StartAddress) (void *),
            _In_ unsigned _StackSize, _In_opt_ void * _ArgList);

    _CRTIMP void __cdecl _endthread(void);

    _CRTIMP uintptr_t __cdecl _beginthreadex(_In_opt_ void * _Security, _In_ unsigned _StackSize,
            _In_ unsigned (__stdcall * _StartAddress) (void *), _In_opt_ void * _ArgList, 
            _In_ unsigned _InitFlag, _Out_opt_ unsigned * _ThrdAddr);

    _CRTIMP void __cdecl _endthreadex(_In_ unsigned _Retval);

参数：

_Security:

    指向 SECURITY_ATTRIBUTES 结构的指针，此结构决定返回的句柄是否可以由子进程继承。 如果 Security 为 NULL，则不能继承句柄。 对于 Windows 95 应用程序，必须设为 NULL。

_StackSize:

    新线程的堆栈大小或 0。

_StartAddress:

    开始执行新线程的例程的起始地址。 对于 _beginthread，调用约定是 __cdecl（对于本机代码）或__clrcall（对于托管代码）；对于_beginthreadex，它是 __stdcall（对于本机代码）或 __clrcall（对于托管代码）。

_ArgList:

    要传递到新线程的参数或 NULL。

_InitFlag:

    新线程的初始状态（运行时为 0，挂起时为 CREATE_SUSPENDED）；使用 ResumeThread 执行线程。

_ThrdAddr:

    指向接收线程标识符的 32 位变量。 如果此变量为 NULL，则不可用。

返回值：

    如果成功，则这些函数中的每一个都会返回一个句柄到新创建的线程；但是，如果新创建的线程退出过快，则_beginthread 可能不会返回有效句柄。（请参见“备注”节中的讨论。）发生错误时，_beginthread 返回 -1L，并在线程过多的情况下将 errno 设置为 EAGAIN；如果参数无效或堆栈大小错误，则设置为 EINVAL；如果资源（如内存）不足，则设置为 EACCES。 发生错误时，_beginthreadex 返回 0 并设置 errno 和 _doserrno。
    如果 startaddress 为 NULL，则将调用无效参数处理程序，如参数验证所述。 如果允许执行继续，则这些功能将 EINVAL 设置为 errno 并返回 -1。
    有关这些属性和其他的更多信息返回代码示例，请参见 errno、_doserrno、_sys_errlist 和 _sys_nerr。
    有关 uintptr_t的更多信息，请参见标准类型。









