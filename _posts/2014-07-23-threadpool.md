---
layout: blog-post
title: "Thread Pool"
excerpt: "Thread Pool"
location: "Shenzhen LYJ"
time: 10:31 AM
category: Windows
tags:
- Thread
- Thread pool
---

## Thread Pools ##

A thread pool is a collection of worker threads that efficiently execute asynchronous callbacks on behalf of the application. The thread pool is primarily used to reduce the number of application threads and provide management of the worker threads. Applications can queue work items, associate work with waitable handles, automatically queue based on a timer, and bind with I/O.

Thread Pool Architecture

The following applications can benefit from using a thread pool:
•An application that is highly parallel and can dispatch a large number of small work items asynchronously (such as distributed index search or network I/O).
•An application that creates and destroys a large number of threads that each run for a short time. Using the thread pool can reduce the complexity of thread management and the overhead involved in thread creation and destruction.
•An application that processes independent work items in the background and in parallel (such as loading multiple tabs).
•An application that must perform an exclusive wait on kernel objects or block on incoming events on an object. Using the thread pool can reduce the complexity of thread management and increase performance by reducing the number of context switches.
•An application that creates custom waiter threads to wait on events.

The original thread pool has been completely rearchitected in Windows Vista. The new thread pool is improved because it provides a single worker thread type (supports both I/O and non-I/O), does not use a timer thread, provides a single timer queue, and provides a dedicated persistent thread. It also provides clean-up groups, higher performance, multiple pools per process that are scheduled independently, and a new thread pool API.

The thread pool architecture consists of the following:
•Worker threads that execute the callback functions
•Waiter threads that wait on multiple wait handles
•A work queue
•A default thread pool for each process
•A worker factory that manages the worker threads

Best Practices

The new thread pool API provides more flexibility and control than the original thread pool API. However, there are a few subtle but important differences. In the original API, the wait reset was automatic; in the new API, the wait must be explicitly reset each time. The original API handled impersonation automatically, transferring the security context of the calling process to the thread. With the new API, the application must explicitly set the security context.

The following are best practices when using a thread pool:
•The threads of a process share the thread pool. A single worker thread can execute multiple callback functions, one at a time. These worker threads are managed by the thread pool. Therefore, do not terminate a thread from the thread pool by calling TerminateThread on the thread or by calling ExitThread from a callback function.
•An I/O request can run on any thread in the thread pool. Canceling I/O on a thread pool thread requires synchronization because the cancel function might run on a different thread than the one that is handling the I/O request, which can result in cancellation of an unknown operation. To avoid this, always provide the OVERLAPPED structure with which an I/O request was initiated when calling CancelIoEx for asynchronous I/O, or use your own synchronization to ensure that no other I/O can be started on the target thread before calling either the CancelSynchronousIo or CancelIoEx function.
•Clean up all resources created in the callback function before returning from the function. These include TLS, security contexts, thread priority, and COM registration. Callback functions must also restore the thread state before returning.
•Keep wait handles and their associated objects alive until the thread pool has signaled that it is finished with the handle.
•Mark all threads that are waiting on lengthy operations (such as I/O flushes or resource cleanup) so that the thread pool can allocate new threads instead of waiting for this one.
•Before unloading a DLL that uses the thread pool, cancel all work items, I/O, wait operations, and timers, and wait for executing callbacks to complete.
•Avoid deadlocks by eliminating dependencies between work items and between callbacks, by ensuring a callback is not waiting for itself to complete, and by preserving the thread priority.
•Do not queue too many items too quickly in a process with other components using the default thread pool. There is one default thread pool per process, including Svchost.exe. By default, each thread pool has a maximum of 500 worker threads. The thread pool attempts to create more worker threads when the number of worker threads in the ready/running state must be less than the number of processors.
•Avoid the COM single-threaded apartment model, as it is incompatible with the thread pool. STA creates thread state which can affect the next work item for the thread. STA is generally long-lived and has thread affinity, which is the opposite of the thread pool.
•Create a new thread pool to control thread priority and isolation, create custom characteristics, and possibly improve responsiveness. However, additional thread pools require more system resources (threads, kernel memory). Too many pools increases the potential for CPU contention.
•If possible, use a waitable object instead of an APC-based mechanism to signal a thread pool thread. APCs do not work as well with thread pool threads as other signaling mechanisms because the system controls the lifetime of thread pool threads, so it is possible for a thread to be terminated before the notification is delivered. 
•Use the thread pool debugger extension, !tp. This command has the following usage:
◦pool address flags
◦obj address flags
◦tqueue address flags
◦waiter address
◦worker address

For pool, waiter, and worker, if the address is zero, the command dumps all objects. For waiter and worker, omitting the address dumps the current thread. The following flags are defined: 0x1 (single-line output), 0x2 (dump members), and 0x4 (dump pool work queue).

## Thread Pool API ##

The thread pool application programming interface (API) uses an object-based design. Each of the following objects is represented by a user-mode data structure:
•A pool object is a set of worker threads that can be used to perform work. Each process can create multiple isolated pools with different characteristics as necessary. There is also a default pool for each process.
•A clean-up group is associated with a set of callback-generating objects. Functions exists to wait on and release all objects that are members of each clean-up group. This frees the application from keeping track of all the objects it has created.
•A work object is assigned to a pool and optionally to a clean-up group. It can be posted, causing a worker thread from the pool to execute its callback. A work object can have multiple posts outstanding; each generates a callback. The post operation cannot fail due to lack of resources.
•A timer object controls the scheduling of callbacks. Each time a timer expires, its callback is posted to its worker pool. Setting a timer cannot fail due to lack of resources.
•A wait object causes a waiter thread to wait on a waitable handle. After the wait is satisfied or the time-out period expires, the waiter thread posts the wait objects' callback to the wait's worker pool. Setting a wait cannot fail due to lack of resources.
•An I/O object associates a file handle with the I/O completion port for the thread pool. When an asynchronous I/O operation completes, a worker thread picks up the status of the operation and calls the I/O object's callback.

The following table describes the features of the original and current thread pool APIs.

Synch
*   CloseThreadpoolWait
*   CreateThreadpoolWait
*   SetThreadpoolWait
*   WaitForThreadpoolWaitCallbacks

Work
*   CloseThreadpoolWork
*   CreateThreadpoolWork
*   SubmitThreadpoolWork
*   TrySubmitThreadpoolCallback
*   WaitForThreadpoolWorkCallbacks

Timer
*   CloseThreadpoolTimer
*   CreateThreadpoolTimer
*   IsThreadpoolTimerSet
*   SetThreadpoolTimer
*   WaitForThreadpoolTimerCallbacks
 
I/O
*   CloseThreadpoolIo
*   CreateThreadpoolIo
*   StartThreadpoolIo
*   WaitForThreadpoolIoCallbacks
 
Clean-up group
*   CloseThreadpoolCleanupGroup
*   CloseThreadpoolCleanupGroupMembers
*   CreateThreadpoolCleanupGroup

Pool  
*   CloseThreadpool 
*   CreateThreadpool 
*   SetThreadpoolThreadMaximum 
*   SetThreadpoolThreadMinimum 
 
Callback environment  
*   DestroyThreadpoolEnvironment 
*   InitializeThreadpoolEnvironment 
*   SetThreadpoolCallbackCleanupGroup 
*   SetThreadpoolCallbackLibrary 
*   SetThreadpoolCallbackPool 
*   SetThreadpoolCallbackPriority 
*   SetThreadpoolCallbackRunsLong 
 
Callback  
*   CallbackMayRunLong

Callback clean up
*   DisassociateCurrentThreadFromCallback
*   FreeLibraryWhenCallbackReturns
*   LeaveCriticalSectionWhenCallbackReturns
*   ReleaseMutexWhenCallbackReturns
*   ReleaseSemaphoreWhenCallbackReturns
*   SetEventWhenCallbackReturns

## 以异步方式调用函数(Work) ##

1.请求线程池的线程调用指定的回调函数。
(1) 回调原型(PTP_SIMPLE_CALLBACK)
VOID NTAPI SimpleCallback(PTP_CALLBACK_INSTANCE pInstance, PVOID pvContext);
(2) 向线程池提交请求
BOOL bRet = TrySubmitThreadpoolCallback(SimpleCallback, NULL, NULL);

2.显示的控制工作项
(1) 回调原型(PTP_WORK_CALLBACK)
VOID NTAPI TaskHandler(PTP_CALLBACK_INSTANCE pInstance, PVOID pvContext, PTP_WORK pWork);
(2) 创建线程池工作对象
PTP_WORK pWorkItem = CreateThreadpoolWork(TaskHandler, NULL, NULL);
(3) 向线程池提交工作项
SubmitThreadpoolWork(pWorkItem);
(4) 取消/等待完成工作项
WaitForThreadpoolWorkCallbacks(pWorkItem, TRUE/FALSE);
TRUE：等待当前执行的工作项完成；
FALSE：等待线程池完成所有的工作项；
(5) 关闭工作项
CloseThreadpoolWork(pWorkItem);

## 周期性调用函数(Timer) ##
(1) 回调原型(PTP_TIMER_CALLBACK)
VOID CALLBACK TimerCallback(PTP_CALLBACK_INSTANCE pInstance, PVOID pvContext, PTP_TIMER pTimer);
(2) 创建线程池Timer对象
PTP_TIMER lpTimer = CreateThreadpoolTimer(TimerCallback, NULL, NULL);
(3) 设置定时器时间间隔以及调用方式
ULARGE_INTEGER ulRelativeStartTime;
ulRelativeStartTime.QuadPart = (LONGLONG) - (10000000); // start in 1 second
FILETIME ftRelativeStartTime;
ftRelativeStartTime.dwHighDateTime = ulRelativeStartTime.HighPart;
ftRelativeStartTime.dwLowDateTime = ulRelativeStartTime.LowPart;
// Triggers every 1000 milliseconds
SetThreadpoolTimer(lpTimer, &ftRelativeStartTime, 1000, 0);
pti [in, out]
A pointer to a TP_TIMER structure that defines the timer object to set. The CreateThreadpoolTimer function returns this structure.
TP_TIMER对象指针@see CreateThreadpoolTimer
pftDueTime [in, optional]
A pointer to a FILETIME structure that specifies the absolute or relative time at which the timer should expire. If positive or zero, it indicates the absolute time since January 1, 1601 (UTC), measured in 100 nanosecond units. If negative, it indicates the amount of time to wait relative to the current time. For more information about time values, see File Times.
If this parameter is NULL, the timer object will cease to queue new callbacks (but callbacks already queued will still occur). Note that if this parameter is zero, the timer will expire immediately.
第一次调用回调函数的时机，负值(以微秒为单位)：相对时间，相对于调用SetThreadpoolTimer的时间。-1：立即开始。正值(以100纳秒为单位)：绝对时间，从January 1, 1601 (UTC)开始计算。NULL：停止调用TimerCallback函数(将定时器暂停又不必销毁定时器)。
msPeriod [in]
The timer period, in milliseconds. If this parameter is zero, the timer is signaled once. If this parameter is greater than zero, the timer is periodic. A periodic timer automatically reactivates each time the period elapses, until the timer is canceled.
0：计时器仅触发一次
其他：在再次调用我们的TimerCallback之前需要等待多少微秒。
msWindowLength [in, optional]
The maximum amount of time the system can delay before calling the timer callback. If this parameter is set, the system can batch calls to conserve power. 
用来给回调函数的执行时间增加一些随机性，这使得回调函数会在当前设定的触发时间，到当前设定的触发时间加上msWindowLength设定的时间之间触发，用以避免多个频度几乎相同的计时器可能会产生冲突。同时也可以将多个计时器分成一组，如果我们有大量的计时器在几乎相同的时间触发，那么为了避免太多的上下文切换，我们可以分成一组。
lpTimer：TP_TIMER对象指针@see CreateThreadpoolTimer
pftDueTime：第一次调用回调函数
SetThreadpoolTimer可以重复调用，修改已有的定时器。将pftDueTime为NULL传入，能够停止定时器，用IsThreadpoolTimerSet可以判断定时器是否停止。
(4) 等待一个计时器完成
WaitForThreadpoolTimerCallbacks(lpTimer, FALSE);
(5) 释放计时器内存
CloseThreadpoolTimer(lpTimer);

## 在内核对象触发时调用一个函数(Wait) ##
(1) 回调原型(PTP_WAIT_CALLBACK)
VOID CALLBACK WaitCallback(PTP_CALLBACK_INSTANCE pInstance, PVOID pParameter, PTP_WAIT pWait, TP_WAIT_RESULT pWaitResult);
(2) 创建线程池等待对象
PTP_WAIT pWait = CreateThreadpoolWait(waitcallback, NULL, NULL);
(3) 将一个内核对象绑定到这个线程池
// Create an auto-reset event.
HANDLE hEvent = CreateEvent(NULL, FALSE, FALSE, NULL);
SetThreadpoolWait(pWait, hEvent, NULL);
pftTimeout用来表示线程池最长应该花多少时间来等待该内核对象被触发。0：不用等待，传负值：相对时间，穿正值表示绝对时间，传NULL表示无限长的时间。
SetEvent(hEvent);
(4) 等待一个等待项完成
WaitForThreadpoolWaitCallbacks(pWait, FALSE);
// Unregister the wait by setting the event to NULL.
SetThreadpoolWait(pWait, NULL, NULL);
传入NULL可以将等待项从线程池中移除。
(5) 释放一个等待项的内存
// Close the wait.
CloseThreadpoolWait(pWait);
// Close the event.
CloseHandle(hEvent);

## 在异步I/O请求完成时调用一个函数(IO) ##
(1) 回调原型(PTP_WIN32_IO_CALLBACK)
VOID CALLBACK OverlappedCompletionRoutine(PTP_CALLBACK_INSTANCE pInstance, PVOID pvContext, PVOID pvOverlapped, ULONG ulIoResult, ULONG_PTR pulNumberOfBytesTransferred, PTP_IO pIo);
(2) 创建一个I/O线程池对象，将我们想要与线程池内部的I/O完成端口相关联的文件/设备句柄(通过用FILE_FLAG_OVERLAPPED标志调用CreateFile函数所打开的)，在第一个参数中传入：
PTP_IO pIo = CreateThreadpoolIo(hDevice, pfnIoCallback, pvContext, pcbe);
(3) 将嵌入在I/O项中的文件/设备与线程池内部I/O完成端口关联起来：
VOID StartThreadpoolIo(PTP_IO pio)
在每次调用ReadFile和WriteFile之前，我们必须调用StartThreadpoolIo，否则pfnIoCallback不会被调用
(4) 在发出I/O请求之后停止调用回调函数
VOID CancelThreadpoolIo(PTP_IO pio)
(5) 关闭文件/设备的句柄解除与线程池的关联
CloseHandle(hDevice);
VOID CloseThreadpoolIo(PTP_IO pio)
(6) 让另一个线程等待一个待处理的I/O请求完成：
VOID WaitForThreadpoolIoCallbacks(PTP_IO pio, BOOL bCancelPeddingCallbacks)

## 回调函数的终止操作 ##
线程池提供了一种便利的方法，用来描述在我们的回调函数返回之后，应该执行的一些操作。
(1) 回调返回时调用SetEvent
VOID WINAPI SetEventWhenCallbackReturns(PTP_CALLBACK_INSTANCE pci, HANDLE evt);
(2) 回调返回时调用ReleaseSemaphore
VOID WINAPI ReleaseSemaphoreWhenCallbackReturns(PTP_CALLBACK_INSTANCE pci, HANDLE sem, DWORD crel);
(3) 回调返回时调用ReleaseMutex
VOID WINAPI ReleaseMutexWhenCallbackReturns(PTP_CALLBACK_INSTANCE pci, HANDLE mut);
(4) 回调返回时调用LeaveCriticalSection
VOID WINAPI LeaveCriticalSectionWhenCallbackReturns(PTP_CALLBACK_INSTANCE pci, PCRITICAL_SECTION pcs);
(5) 回调返回时调用FreeLibrary
VOID WINAPI FreeLibraryWhenCallbackReturns(PTP_CALLBACK_INSTANCE pci, HMODULE mod);
(6) 通知线程池，回调函数的运行时间会比较长。(我还要很久才能忙完，看看现在是不是还有其他任务)
VOID WINAPI CallbackMayRunLong(PTP_CALLBACK_INSTANCE pci);
如果回调函数认为自己需要较长的时间来处理当前的项，可以调用CallbackMayRunLong。
(7) 回调函数用来告诉线程池，逻辑上自己已经完成了工作。这使得任何调用WaitForThreadpool*Callbacks而被阻塞的线程能够早返回一些，而不必等到线程池的线程从回调函数中返回。
VOID WINAPI DisassociateCurrentThreadFromCallback(PTP_CALLBACK_INSTANCE pci);

## 对线程池进行定制 ##
根据需要对线程池进行特殊的配置，比如修改线程池中可运行线程的最小数量和最大数量。
(1) 为线程执行回调函数创建一个线程池
PTP_POOL pool = CreateThreadpool(NULL);
(2) 设置线程池中线程的最大数量和最小数量
SetThreadpoolThreadMaximum(pThreadPool, cthrdMin); // 默认1
SetThreadpoolThreadMinimum(pThreadPool, cthrdMax); // 默认500
(3) 使用回调环境，包含可用于工作项的额外的设置或配置。
<1> 初始化一个回调环境该函数仅仅设置了Version
VOID InitializeThreadpoolEnvironment(PTP_CALLBACK_ENVIRON pcbe)
<2> 不需要回调环境时调用该接口销毁
VOID DestroyThreadpoolEnvironment(PTP_CALLBACK_ENVIRON pcbe)
<3> 将一个工作项添加到线程池的队列中，回调环境必须标明该工作项应该由哪个线程池来处理
VOID SetThreadpoolCallbackPool(PTP_CALLBACK_ENVIRON pcbe, PTP_POOL ptpp)
<4> 告诉回调环境，工作项通常需要较长的时间来处理。这使得线程池会更快的创建线程，其目的是为了尝试在对工作项进行处理的时候，以一种更公平的方式来替代最有效的方式。
VOID SetThreadpoolCallbackRunsLong(PTP_CALLBACK_ENVIRON pcbe)
<5> 用来确保只要线程池中还有待处理的工作项，就将一个特定的DLL一直保存在进程的地址空间中。
VOID SetThreadpoolCallbackLibrary(TP_CALLBACK_ENVIRON pcbe, PVOID mod)
<6> Specifies the priority of a callback function relative to other work items in the same thread pool.TP_CALLBACK_PRIORITY_HIGH，TP_CALLBACK_PRIORITY_LOW，TP_CALLBACK_PRIORITY_NORMAL
VOID SetThreadpoolCallbackPriority(PTP_CALLBACK_ENVIRON pcbe, TP_CALLBACK_PRIORITY Priority)
<7> 将一个清理组和一个已经绑定到线程池的TP_CALLBACK_ENVIRON结构关联起来
VOID SetThreadpoolCallbackCleanupGroup(PTP_CALLBACK_ENVIRON pcbe, PTP_CLEANUP_GROUP ptpcg, PTP_CLEANUP_GROUP_CANCEL_CALLBACK pfng)
(4) Associate the callback environment with our thread pool.
SetThreadpoolCallbackPool(&CallBackEnviron, pool);
(5) 不需要时使用CloseThreadpool将其销毁，调用之后无法将任何新的项添加到线程池的队列中。线程池中当前正在处理队列中的项，会处理完。未开始执行的项将会被取消。
VOID CloseThreadpool(PTP_POOL pThreadPool)

## 定制的线程池使用清理组销毁 ##
默认的线程池的生命周期和进程相同，在进程终止的时候，Windows会将其销毁并负责所有的清理工作。定制线程池清理组是用于替未被执行的线程池回调函数执行资源释放工作，因此只有被取消的工作项才会调用CleanupGroupCancelCallback，例如，一个回调接口需要处理一段缓冲区，并且在缓冲区内部释放内存，如果该接口被取消了，那释放内存的工作就应该交给CleanupGroupCancelCallback处理。
所以在回调处理的上下文中包含了需要被释放了的资源，并且存在取消未执行的工作项的场景是需要通过定制线程池来设置清理接口。
(1) 创建一个清理组
PTP_CLEANUP_GROUP cleanupgroup = CreateThreadpoolCleanupGroup();
(2) 将这个清理组与一个已经绑定到线程池的PTP_CALLBACK_ENVIRON结构关联起来：
SetThreadpoolCallbackCleanupGroup(&CallBackEnviron, cleanupgroup, pfng);
(3) 清理回调原型(PTP_CLEANUP_GROUP_CANCEL_CALLBACK)
VOID NTAPI CleanupGroupCancelCallback(PVOID pvObjectContext, PVOID pvCleanupContext);
(4) 创建线程池对象并将其加入清理组
PTP_* p* = CreateThreadpool*(*, *, ..., pcbe);
(5) 关闭线程池对象时调用CloseThreadpool*隐式地将对应的项从清理组中移除。
CloseThreadpool*(PTP_* p*);
(6) 销毁线程池，该接口与WaitForThreadpool*Callbacks函数类似。调用该接口的时候，函数会一直等待，直到线程池的工作组中所有剩余的项(即已经创建但尚未关闭的项)都已经处理完毕为止。
VOID WINAPI CloseThreadpoolCleanupGroupMembers(PTP_CLEANUP_GROUP ptpcg, BOOL fCancelPendingCallbacks, PVOID pvCleanupContext);
fCancelPendingCallbacks：TURE
所有已经提交但是还未处理的工作项直接取消，函数会在所有当前正在运行的工作项完成之后返回。如果之前调用的SetThreadpoolCallbackCleanupGroup的pfng参数的值是一个CleanupGroupCancelCallback函数的地址。那么对每一个被取消的工作项，我们的回调函数会被调用。
fCancelPendingCallbacks：FALSE
线程池会处理完队列中的所有工作向，这时清理回调是不会被调用的，因此可以传NULL给pvCleanupContext参数。
(7) 释放清理组占用的资源
VOID WINAPI CloseThreadpoolCleanupGroup(PTP_CLEANUP_GROUP ptpcg);
(8) 销毁环境变量
VOID DestroyThreadpoolEnvironment(PTP_CALLBACK_ENVIRON pcbe)
(9) 关闭线程池
VOID CloseThreadpool(PTP_POOL pThreadPool)









