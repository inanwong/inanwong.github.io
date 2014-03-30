---
layout: blog-post
title: "计算机名称"
excerpt: "计算机名称"
location: "Shenzhen NanShan"
time: 17:21 PM
tags:
- Windows
- OS
---

## 计算机名称 ##

### Dns HostName ###

(1)最长63个字符;    
(2)不允许的字符包括`~!@#$^&*()=+[]{}\|:;'",<>/?;    
(3)不允许的字符也包括%，但是在Windows的提示中没有;    
(4)不允许全部都是数字，同时不允许前15位全部都是数字，这是为了保证NetBIOS Name不会全部都是数字;    
(5)汉字以及_等为非标准字符。标准字符包括字母(A-Z,a-z)、数字(0-9)和连字符(-)。如使用非标准字符名称，除非所属网络使用Microsoft DNS服务器，否则其他用户就会在网络上找不到您的计算机因此不支持非标准名称。;    
(6)可以以连字符开头，并且可以全部是连字符;    

### NetBIOS Name(Computer Name) ###

(1)从Dns HostName左边开始截取，最大截取15位，并将小写字母转换成大写字母;    






