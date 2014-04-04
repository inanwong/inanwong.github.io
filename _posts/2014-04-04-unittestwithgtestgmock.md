---
layout: blog-post
title: "使用gtest/gmock做单元测试"
excerpt: "使用gtest/gmock做单元测试"
location: "Shenzhen NanShan"
time: 11:06 AM
category: Test
tags:
- Test
---

## 使用gtest/gmock做单元测试 ##

### 1.下载编译gmock源码 ###

由于gmock本身包含gtest源码，因此我们只编译gmock引入gmock头文件即可。

从[Google C++ Mocking Framework](http://code.google.com/p/googlemock/)上下载googlemock-read-only源码，使用VC2010编译gmock.sln生成成Debug版本的gmock.lib、gmock_main.lib。

### 2.在项目中使用gmock ###

原项目名称为ProjName，测试项目为ProjNameUnitTest，目录结构如下：

    ├─ProjComm
    │  ├─include
    │  │  └─gmock
    │  │      │  gmock.h
    │  │      │  
    │  │      └─internal
    │  │              gmock-generated-internal-utils.h
    │  │              
    │  └─lib
    │          gmock.lib
    │          gmock_main.lib
    │          
    └─ProjName
        │  ProjName.vcxproj
        │  ProjNameUnitTest.vcxproj
        │  
        ├─src
        ├─test
        │      UnitTest.cpp
        │      UnitTest.h
        │      
        └─testcase

文件UnitTest.h以及UnitTest.cpp用来向工程引入gmock头文件以及静态链接库gmock.lib

UnitTest.h

    #ifndef _UNIT_TEST_COMMON_H_
    #define _UNIT_TEST_COMMON_H_
    #ifdef UNIT_TEST
    #include "../../ProjComm/include/gmock/gmock.h"
    #define STATIC
    #define PRIVATE     public
    #define PROTECTED   public
    #else
    #define STATIC      static
    #define PRIVATE     private
    #define PROTECTED   protected
    #endif
    #endif  /* _UNIT_TEST_COMMON_H_ */

UnitTest.cpp

    #include "UnitTest.h"
    #ifdef UNIT_TEST
    #pragma comment(lib, "../../ProjComm/lib/gmock.lib")
    #pragma comment(lib, "../../ProjComm/lib/gmock_main.lib")
    #else
    #error "Use only in the unit test project."
    #endif

在ProjName与ProjNameUnitTest中引入UnitTest.h，同时在ProjNameUnitTest中定义UNIT_TEST，在ProjNameUnitTest中引入UnitTest.cpp用来包含gmock.lib以及gmock_main.lib。  

### 3.配置ProjNameUnitTest ###

需要在ProjNameUnitTest中作如下配置才能使gmock_main.lib替换现有的main入口函数；

(1) 在C/C++ | Code Generation中设置Runtime Library为Multi-threaded Debug (/MTd)

(2) 在Linker | Input中的Additional Dependencies前增加uafxcwd.lib;Libcmtd.lib;

(3) 在Linker | Input中的Ignore Specific Default Libraries中增加Libcmtd.lib;uafxcwd.lib;(注意顺序)


### 单测注意事项 ###

1.   尽量不要改动被测试项目代码，尽量整体引用被测试程序;    
2.   如果被测试项目是COM组件，需要引用ProjectName_i.c文件，因为该文件包含了自动生成的接口GUID;    
3.   测试工程本身没有stdafx.h,.cpp文件，需要引入被测试工程的预编译头文件;    


