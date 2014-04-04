---
layout: blog-post
title: "客户端等待服务端事件"
excerpt: "客户端等待服务端事件"
location: "Shenzhen LYJ"
time: 08:36 PM
category: Windows
tags:
- Windows
---

## 客户端等待服务端事件 ##

应用场景：客户端，服务端启动顺序未定，客户端需要等到服务端的一个事件才能继续执行。

### 定义事件名 ###

    //! 等待事件名
    #define INW_WAIT_EVENT  _T("Inw_Wait_Event")

### 客户端代码 ###

    int APIENTRY _tWinMain(HINSTANCE hInstance,
                         HINSTANCE hPrevInstance,
                         LPTSTR    lpCmdLine,
                         int       nCmdShow)
    {
        UNREFERENCED_PARAMETER(hPrevInstance);
        UNREFERENCED_PARAMETER(lpCmdLine);

        // TODO: Client.
        HANDLE hEvent = CreateEvent(NULL, TRUE, FALSE, INW_WAIT_EVENT);
        if (INVALID_HANDLE_VALUE == hEvent)
        {
            assert(0);
            return 0;
        }

        (VOID)WaitForSingleObject(hEvent, INFINITE);
        
        MSG msg = {0};

        (VOID)::MessageBox(::GetDesktopWindow(), _T("Client go on!"), _T("Client"),
            MB_OK | MB_TOPMOST);

        // Main message loop:
        while (GetMessage(&msg, NULL, 0, 0))
        {
            TranslateMessage(&msg);
            DispatchMessage(&msg);
        }

        return (int) msg.wParam;
    }

### 服务端代码 ###

    int APIENTRY _tWinMain(HINSTANCE hInstance,
                         HINSTANCE hPrevInstance,
                         LPTSTR    lpCmdLine,
                         int       nCmdShow)
    {
        UNREFERENCED_PARAMETER(hPrevInstance);
        UNREFERENCED_PARAMETER(lpCmdLine);
        
        // TODO: Server.
        HANDLE hEvent = CreateEvent(NULL, TRUE, FALSE, INW_WAIT_EVENT);
        if (INVALID_HANDLE_VALUE == hEvent)
        {
            assert(0);
            return 0;
        }
        BOOL bRet = SetEvent(hEvent);

        MSG msg = {0};

        // Main message loop:
        while (GetMessage(&msg, NULL, 0, 0))
        {
            TranslateMessage(&msg);
            DispatchMessage(&msg);
        }

        return (int) msg.wParam;
    }

### 说明 ###

1.如果服务端先启动，服务端创建事件并设置为有信号，等客户端启动时，等待到该信号继续执行，因为该信号是自动重置的，所以客户端退出后重新等待该事件依然能够等到；    
2.如果客户端先启动，客户端一直等待该事件，不在继续执行，等服务端启动后，客户端等待到该事件，客户端继续执行。