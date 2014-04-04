---
layout: blog-post
title: "WinDbg Cmd"
excerpt: "WinDbg Cmd"
location: "Shenzhen NanShan"
time: 10:34 PM
category: Debug
tags:
- Windows
- Debug
---

## 工作空间 ##

Windbg的工作空间以REG_BINARY的形式存储在：
HKEY_CURRENT_USER\Software\Microsoft\Windbg\Workspaces

将themes(eg.C:\Program Files\Windows Kits\8.0\Debuggers\x86\themes)下的工作空间主题REG文件(standard.reg)导入到注册表可以改变默认的工作空间，themes下的主题使用placehold*.c文件作为布局占位，无需关闭。

工作空间可以以*.WEW的格式保存，使用Windbg打开*.WEW(standard.wew)文件可以暂时使用其包含的工作空间

在View|Options中的Workspace Prompts中选中Never save选项以后需要File|Save Worksplace才能够保存选项，否则每次关闭debug session时依然会弹出对话框询问是否保存。选中Never save后，打开的工作空间需要注意手动保存修改的环境变量。

最佳实践：使用standard.reg为默认工作空间，配置好sympath为SRV*，设置Never save，手动保存作为默认选项。

## Debugger Commands ##

WinDbg的大多数功能是使用命令方式工作的。命令分为三种：标准命令、元命令和扩展命令。

### 标准命令(130+) ###

标准命令：提供适用于所有调试目标的基本调试功能。

标准命令在调试器内部实现，执行时不需要加载任何扩展模块。标准命令第一个字符不区分大小写，后面的字符可能区分大小写。共有130多条命令，分为60多个系列18个子类：

一：控制调试目标执行，包括恢复运行的g系列命令。跟踪执行的t系列命令。单步执行的p系列命令和跟踪监视的wt命令。

二：观察和修改寄存器的r系列命令。

三：读写IO端口命令。

四：观察、修改和搜索内存数据的d系列、e系列和s命令。

五：观察栈的k系列命令。

六：显示进程的|（非l）命令。

七：显示和控制线程的~命令。

八：设置和维护断点的bp(软件断点)，ba(硬件断点)和管理断点的bl(列出所有断点),bc,bd,be(清除，禁用和重新启用断点)命令。

九：评估表达式的?命令和评估C++表达式的??命令。

十：用于汇编的a命令和反汇编的u命令。

十一：显示段选择子的dg命令。

十二：执行命令文件的$命令。

十三：设置调试事件处理方式的sx系列命令，启用与禁止静默模式的sq命令，设置内核选项的so命令，设置符号后缀的ss命令。

十四：显示调试器和调试目标版本的version命令。显示调试目标所在系统信息的vertarget命令。

十五：检查符号的x命令。

十六：控制和显示源程序的ls系列命令。

十七：加载调试符号的ld系列命令。搜索相邻符号的ln命令。 显示模块列表的lm命令。

十八：结束调试会话的q命令。

在命令编辑框中输入?，可以显示主要标准命令和每个命令的简单介绍。

ENTER (Repeat Last Command)
The ENTER key repeats the last command that you typed.

	0:000> vercommand
	command line: '"C:\Program Files\Windows Kits\8.0\Debuggers\x86\windbg.exe" '
	0:000> 
	command line: '"C:\Program Files\Windows Kits\8.0\Debuggers\x86\windbg.exe" '
	0:000> 
	command line: '"C:\Program Files\Windows Kits\8.0\Debuggers\x86\windbg.exe" '

## ver 系列命令 ##
	
vercommand (Show Debugger Command Line)
The vercommand command displays the command that opened the debugger.

	0:000> vercommand
	command line: '"C:\Program Files\Windows Kits\8.0\Debuggers\x86\windbg.exe" '

version (Show Debugger Version)
The version command displays version information about the debugger and all loaded extension DLLs. This command also displays the current version of the operating system of the target computer.

	0:000> version
	Windows 7 Version 7601 (Service Pack 1) MP (2 procs) Free x86 compatible
	Product: WinNt, suite: SingleUserTS
	kernel32.dll version: 6.1.7601.18229 (win7sp1_gdr.130801-1533)
	Machine Name:
	Debug session time: Wed Mar  5 17:29:23.576 2014 (UTC + 8:00)
	System Uptime: 1 days 0:22:57.716
	Process Uptime: 0 days 0:48:29.619
	  Kernel time: 0 days 0:00:00.000
	  User time: 0 days 0:00:00.000
	Live user mode: <Local>

	Microsoft (R) Windows Debugger Version 6.2.9200.16384 X86
	Copyright (c) Microsoft Corporation. All rights reserved.

	command line: '"C:\Program Files\Windows Kits\8.0\Debuggers\x86\windbg.exe" '  Debugger Process 0x161C 
	dbgeng:  image 6.2.9200.16384, built Thu Jul 26 10:08:32 2012
			[path: C:\Program Files\Windows Kits\8.0\Debuggers\x86\dbgeng.dll]
	dbghelp: image 6.2.9200.16384, built Thu Jul 26 10:11:41 2012
			[path: C:\Program Files\Windows Kits\8.0\Debuggers\x86\dbghelp.dll]
			DIA version: 50504
	Extension DLL search Path:
		C:\Program Files\Windows Kits\8.0\Debuggers\x86\WINXP;C:\Program Files\Windows Kits\8.0\Debuggers\x86\winext;C:\Program Files\Windows Kits\8.0\Debuggers\x86\winext\arcade;C:\Program Files\Windows Kits\8.0\Debuggers\x86\pri;C:\Program Files\Windows Kits\8.0\Debuggers\x86;C:\Program Files\Windows Kits\8.0\Debuggers\x86\winext\arcade;D:\ProgramFiles\Python33\;C:\Program Files\Intel\iCLS Client\;C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Program Files\Intel\Intel(R) Management Engine Components\DAL;C:\Program Files\Intel\Intel(R) Management Engine Components\IPT;C:\Program Files\TortoiseSVN\bin;C:\Program Files\Intel\OpenCL SDK\2.0\bin\x86;C:\Program Files\Microsoft SQL Server\100\Tools\Binn\;C:\Program Files\Microsoft SQL Server\100\DTS\Binn\;C:\Program Files\TestCocoon;C:\Program Files\doxygen\bin;C:\Program Files\Microsoft Visual Studio\Common\Tools\WinNT;C:\Program Files\Microsoft Visual Studio\Common\MSDev98\Bin;C:\Program Files\Microsoft Visual Studio\Common\Tools;C:\Program Files\Microsoft Visual Studio\VC98\bin
	Extension DLL chain:
		dbghelp: image 6.2.9200.16384, API 6.2.6, built Thu Jul 26 10:11:41 2012
			[path: C:\Program Files\Windows Kits\8.0\Debuggers\x86\dbghelp.dll]
		ext: image 6.2.9200.16384, API 1.0.0, built Thu Jul 26 10:16:43 2012
			[path: C:\Program Files\Windows Kits\8.0\Debuggers\x86\winext\ext.dll]
		exts: image 6.2.9200.16384, API 1.0.0, built Thu Jul 26 10:21:27 2012
			[path: C:\Program Files\Windows Kits\8.0\Debuggers\x86\WINXP\exts.dll]
		uext: image 6.2.9200.16384, API 1.0.0, built Thu Jul 26 10:21:18 2012
			[path: C:\Program Files\Windows Kits\8.0\Debuggers\x86\winext\uext.dll]
		ntsdexts: image 6.2.9200.16384, API 1.0.0, built Thu Jul 26 10:22:12 2012
			[path: C:\Program Files\Windows Kits\8.0\Debuggers\x86\WINXP\ntsdexts.dll]
		
vertarget (Show Target Computer Version)
The vertarget command displays the current version of the Microsoft Windows operating system of the target computer.

	0:000> vertarget
	Windows 7 Version 7601 (Service Pack 1) MP (2 procs) Free x86 compatible
	Product: WinNt, suite: SingleUserTS
	kernel32.dll version: 6.1.7601.18229 (win7sp1_gdr.130801-1533)
	Machine Name:
	Debug session time: Wed Mar  5 17:28:15.794 2014 (UTC + 8:00)
	System Uptime: 1 days 0:21:49.934
	Process Uptime: 0 days 0:47:21.837
	  Kernel time: 0 days 0:00:00.000
	  User time: 0 days 0:00:00.000

q, qq (Quit)
The q and qq commands end the debugging session. (In CDB and KD, this command also exits the debugger itself. In WinDbg, this command returns the debugger to dormant mode.)

Remarks
In user-mode debugging, the q command ends the debugging session and closes the target application.

In kernel-mode debugging, the q command saves the log file and ends the debugging session. The target computer remains locked.

If this command does not work in KD, press CTRL+R+ENTER on the debugger keyboard, and then retry the q command. If this action does not work, you must use CTRL+B+ENTER to exit the debugger.

The qq command behaves exactly like the q command, unless you are performing remote debugging. During remote debugging, the q command has no effect, but the qq command ends the debugging server. For more information about this effect, see Remote Debugging Through the Debugger.

http://blog.csdn.net/ithzhang/article/details/8630429

### 元命令(Meta-Command)/点命令(Dot Command)(140+) ###

元命令用于提供标准命令没有提供的常用调试命令，元命令也是内建在调试器引擎或WinDbg程序文件中。所有元命令都是以.开始，所以元命令也被称为点命令。  

### 扩展命令(Extension Command)(Bang Command)(++) ###

扩展命令用于实现针对特定目标的调试功能。与标准命令和元命令内建在Windbg程序文件中不同，扩展命令是是现在动态加载的扩展模块dll中。利用WinDbg的sdk，用户可以自己编写扩展模块和扩展命令。

执行扩展命令时应该以感叹号!开始。!在英语中为bang。因此扩展命令也被称为bang command。

执行扩展命令的完整格式：

！nameofExtentModule.nameofExtentCommand 参数。

其中nameofExternModule可以省略。省略后，WinDbg会在已加载的扩展模块中搜索指定的命令。如果此模块没有加载，则将模块加载。

因为扩展命令是在扩展模块中实现的，所以执行时需要加载相应的模块。WinDbg可以根据调试目标的类型和当前的工作空间自动加载命令空间指定的扩展模块。用户也可以调用.load命令手动加载扩展模块。.load后跟模块路径。

除了.load之外，还可以使用.loadby命令加上扩展模块名称和一个已加载的程序模块的名称。这时，WinDbg会在已加载模块所在目录搜索扩展模块。

大多数扩展模块都支持使用help命令来显示这个模块的基本信息和所包含命令。如：!ext.help。

## 

http://bbs.dbgtech.net/forum.php

http://www.dbgtech.net/windbghelp/index.html

http://www.cnblogs.com/answeryi/archive/2009/07/14/1523662.html

http://www.dbgtech.net/windbghelp/hh/debugger/r07_use_operation_d368d81b-2cd4-4227-9b84-b5d956eed347.xml.htm

