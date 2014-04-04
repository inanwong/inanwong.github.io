---
layout: blog-post
title: "VS远程调试"
excerpt: "VS远程调试"
location: "Shenzhen NanShan"
time: 02:42 PM
category: Tool
tags:
- Tool
---

## VS远程调试 ##

场景：

现有两台主机一台用于开发DevComputer(192.168.1.0)，另一台用于测试RunComputer(192.168.1.1)，现在使用DevComputer调试一个运行在RunComputer上并且被一个Run.exe加载的Run.dll。


1.在DevComputer上找到Remote Debugger，目录在：

    C:\Program Files\Microsoft Visual Studio 10.0\Common7\IDE\Remote Debugger

并找到合适于RunComputer的版本，VS提供ia64，x64,x86。将其复制到RunComputer上。

2.在DevComputer上配置远程调试

打开配置对话框 Run Property Pages | Configuration Properties | Debugging

    Debugger to launch -> Remote Windows Debugger

配置如下：

![Alt text](/assets/images/posts/vsremotedebugger_config.png "Config")

3.在RunComputer上运行msvsmon.exe

配置如下：

![Alt text](/assets/images/posts/vsremotedebugger_project.png "Project")

4.在DevComputer上F5调试即可


