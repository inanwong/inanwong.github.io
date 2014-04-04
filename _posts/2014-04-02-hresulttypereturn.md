---
layout: blog-post
title: "HRESULT类型返回值"
excerpt: "HRESULT类型返回值"
location: "Shenzhen NanShan"
time: 09:51 AM
category: Windows
tags:
- Windows
---

## HRESULT类型返回值 ##

### HRESULT的定义 ###

HRESULT定义在winnt.h中，把HRESULT当成LONG算了（32位，8个字节）。

    #ifndef _HRESULT_DEFINED
    #define _HRESULT_DEFINED
    #ifdef __midl
    typedef LONG HRESULT;
    #else
    typedef __success(return >= 0) long HRESULT;
    #endif // __midl
    #endif // !_HRESULT_DEFINED

HRESULT的含义是Here’s the Result。H代表Here，真是个奇葩。

### HRESULT的结构 ###

在winerror.h中对HRESULT的说明：

    //
    //  Note: There is a slightly modified layout for HRESULT values below,
    //        after the heading "COM Error Codes".
    //
    //  Values are 32 bit values laid out as follows:
    //
    //   3 3 2 2 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1
    //   1 0 9 8 7 6 5 4 3 2 1 0 9 8 7 6 5 4 3 2 1 0 9 8 7 6 5 4 3 2 1 0
    //  +---+-+-+-----------------------+-------------------------------+
    //  |Sev|C|R|     Facility          |               Code            |
    //  +---+-+-+-----------------------+-------------------------------+
    //
    //  where
    //
    //      Sev - is the severity code
    //
    //          00 - Success
    //          01 - Informational
    //          10 - Warning
    //          11 - Error
    //
    //      C - is the Customer code flag
    //
    //      R - is a reserved bit
    //
    //      Facility - is the facility code
    //
    //      Code - is the facility's status code
    //

COM Error Codes:    

    //
    // The return value of COM functions and methods is an HRESULT.
    // This is not a handle to anything, but is merely a 32-bit value
    // with several fields encoded in the value. The parts of an
    // HRESULT are shown below.
    //
    // Many of the macros and functions below were orginally defined to
    // operate on SCODEs. SCODEs are no longer used. The macros are
    // still present for compatibility and easy porting of Win16 code.
    // Newly written code should use the HRESULT macros and functions.
    //

    //
    //  HRESULTs are 32 bit values layed out as follows:
    //
    //   3 3 2 2 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1
    //   1 0 9 8 7 6 5 4 3 2 1 0 9 8 7 6 5 4 3 2 1 0 9 8 7 6 5 4 3 2 1 0
    //  +-+-+-+-+-+---------------------+-------------------------------+
    //  |S|R|C|N|r|    Facility         |               Code            |
    //  +-+-+-+-+-+---------------------+-------------------------------+
    //
    //  where
    //
    //      S - Severity - indicates success/fail
    //
    //          0 - Success
    //          1 - Fail (COERROR)
    //
    //      R - reserved portion of the facility code, corresponds to NT's
    //              second severity bit.
    //
    //      C - reserved portion of the facility code, corresponds to NT's
    //              C field.
    //
    //      N - reserved portion of the facility code. Used to indicate a
    //              mapped NT status value.
    //
    //      r - reserved portion of the facility code. Reserved for internal
    //              use. Used to indicate HRESULT values that are not status
    //              values, but are instead message ids for display strings.
    //
    //      Facility - is the facility code
    //
    //      Code - is the facility's status code
    //

### HRESULT类型返回值 ###

"HRESULT类型返回值的处理：
对于返回值类型为HRESULT的函数，用SUCCEEDED宏来判断是否成功，不能直接判断返回值是否等于S_OK。
原因：部分函数可能返回大于0的数值。只判断是否等于S_OK，会误把某些执行正常的函数调用当成失败。"

判断函数调用成功与否不能简单地将返回值与S_OK或E_NOINTERFACE等进行比较，而是要使用FAILED/SUCCEEDED宏

    //
    // Generic test for success on any status value (non-negative numbers
    // indicate success).
    //

    #define SUCCEEDED(hr) (((HRESULT)(hr)) >= 0)

    //
    // and the inverse
    //

    #define FAILED(hr) (((HRESULT)(hr)) < 0)

还有这个错误定义

    //
    // Severity values
    //

    #define SEVERITY_SUCCESS    0
    #define SEVERITY_ERROR      1   

### HRESULT类型的返回值判断 ###

HRESULT类型不能仅仅用FAILED/SUCCEEDED判断，要参照对应API文档

    //
    // Success codes
    //
    #define S_OK                                   ((HRESULT)0L)
    #define S_FALSE                                ((HRESULT)1L)

### 自定义HRESULT返回值 ###

[HRESULT的秘密](http://blog.csdn.net/ixsea/article/details/7272909)

### 使用命令行查看Window错误码含义 ###

命令语法：‘net helpmsg [error value]’。

    net helpmsg 2

