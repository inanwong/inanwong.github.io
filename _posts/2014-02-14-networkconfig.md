---
layout: blog-post
title: "卸载虚拟网卡后无法打开IP配置对话框"
excerpt: "卸载虚拟网卡后无法打开IP配置对话框"
location: "Shenzhen NanShan"
time: 08:55 PM
tags:
- Windows
- NetWork
---

## 卸载虚拟网卡后无法打开IP配置对话框 ##

### 现象 ###
卸载虚拟网卡后在“本地连接 属性”对话框中，无法打开“Internet 协议版本 4 (TCP/IPv4) 属性”对话框，弹出提示"为配置TCP/IP，必须安装并启用网络适配器卡"。

### 解决方案 ###
在“设备管理器”-“网络适配器”中卸载物理网卡驱动，重新安装网卡驱动，再次打开“Internet 协议版本 4 (TCP/IPv4) 属性”对话框，这时能够正常打开该对话框。
但是IP地址为空，重新输入地址，保存，关闭“本地连接 属性”对话框。再次打开，地址依然为空，出现新的问题:无法保存IP地址。继续解决。

在HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Network下的Config项中，保留了网卡驱动的配置信息，该配置项在被删除后，系统使用时会自动重新建立。Config项是一个REG_BINARG类型项，第0005处显示的是网卡数量，加入网卡数量是33，再安装一个新的网卡则变成34，卸载之后为33。如果系统已不正确的方式安装了大量的网卡驱动程序，会导致网卡驱动信息不正确，IP地址无法保存。删除Config项之后，系统会加载正确的网卡驱动信息，重新计算网卡驱动数量。

手动删除Config项，再次打开“Internet 协议版本 4 (TCP/IPv4) 属性”对话框，这时再次输入IP地址，保存，退出，重新打开，这时地址依然存在，安装卸载虚拟网卡驱动，IP地址均能够正确显示，问题解决。

### 参考资料: ###
The Internet Protocol (TCP/IP) Properties dialog box displays the default IP address settings after you manually configure a static IP address in Windows 2000 Server or in Windows Server 2003
http://support.microsoft.com/kb/937056/en-us
