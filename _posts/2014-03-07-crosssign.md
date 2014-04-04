---
layout: blog-post
title: "驱动交叉签名"
excerpt: "驱动交叉签名"
location: "Shenzhen NanShan"
time: 4:36 AM
category: Driver
tags:
- Windows
- Driver
---

## 交叉签名过程 ##

1.将inanwong2014.pfx导入到个人，证书密码为inanwong.io;

2.将"WoSign代码签名中级根证书"以及"交叉签名根证书"导入到中级证书颁发机构;

3.使用命令行签名：

	SignTool.exe sign /v /ac MS_XS.cer /s my /t http://timestamp.comodoca.com/authenticode InanWong.sys

其中MS_XS.cer为微软签发的内核签名交叉根证书，时间戳地址为赛门铁克收购后的新地址

4.WinXPSP3下需要安装补丁rootsupd.exe才可进行签名校验

	SignTool.exe verify /v /kp InanWong.sys

## 注意事项 ##

1.请注意：请确保您的个人证书目录下只有WoSign颁发的Windows内核代码签名证书，删除其他代码签名证书，否则会导致签名不成功。

2.签名校验时出现错误

	SignTool Error: Signing Cert does not chain to a Microsoft Root Cert

3.签名需要管理员权限
	
## 相关资料 ##

	Windows 64位内核驱动和内核代码签名(Kernel Signing)指南
	http://www.wosign.com/Support/Windows_Kernel_Signing_guide.htm