---
layout: blog-post
title: "共享节(Data Segment)"
excerpt: "共享节(Data Segment)"
location: "Shenzhen NanShan"
time: 15:13 PM
tags:
- Windows
---

## 共享节(Data Segment) ##



### 使用dumpbin命令查看二进制文件 ###

To run DUMPBIN, use the following syntax:

	DUMPBIN [options] files...

Specify one or more binary files, along with any options required to control the information. DUMPBIN displays the information to standard output. You can either redirect it to a file or use the /OUT option to specify a file name for the output.

When you run DUMPBIN on a file without specifying an option, DUMPBIN displays the /SUMMARY output.

When you type the command dumpbin without any other command-line input, DUMPBIN displays a usage statement that summarizes its options. 

使用dumpbin.exe(依赖mspdb100.dll)，无参，指定DLL文件，可以查看共享节名称的前8位：

	File Type: DLL

	  Summary

			4000 .data
			4000 .idata
		   1D000 .rdata
			6000 .reloc
			3000 .rsrc
		   8F000 .text
		   43000 .textbss
			1000 FlashRed

其中'FlashRed'为共享节。











官方网站：
http://code.google.com/p/googletest/

官方使用文档:
http://code.google.com/p/googletest/wiki/GoogleTestPrimer

http://code.google.com/p/googletest/wiki/GoogleTestAdvancedGuide 
