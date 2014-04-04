---
layout: blog-post
title: "Matlab Install"
excerpt: "Matlab Install"
location: "Shenzhen LYJ"
time: 11:07 PM
category: Matlab
tags:
- Matlab
---

## Matlab Wiki ##

<a href="http://zh.wikipedia.org/wiki/MATLAB" target="_blank">Matlab Wiki(http://zh.wikipedia.org/wiki/MATLAB)</a><br/> 

<a href="http://www.mathworks.cn/products/matlab/" target="_blank">Matlab Cn("http://www.mathworks.cn/products/matlab/")</a><br/> 

[Matlab Wiki](http://zh.wikipedia.org/wiki/MATLAB "http://zh.wikipedia.org/wiki/MATLAB")

[Matlab Cn](http://www.mathworks.cn/products/matlab/ "http://www.mathworks.cn/products/matlab/")

MATLAB（矩阵实验室）是MATrix LABoratory的缩写，是一款由美国The MathWorks公司出品的商业数学软件。MATLAB是一种用于算法开发、数据可视化、数据分析以及数值计算的高级技术计算语言和交互式环境。除了矩阵运算、绘制函数/数据图像等常用功能外，MATLAB还可以用来创建用户界面及与调用其它语言（包括C，C++和FORTRAN）编写的程序。
尽管MATLAB主要用于数值运算，但利用为数众多的附加工具箱（Toolbox）它也适合不同领域的应用，例如控制系统设计与分析、图像处理、信号处理与通讯、金融建模和分析等。另外还有一个配套软件包Simulink，提供了一个可视化开发环境，常用于系统模拟、动态/嵌入式系统开发等方面。

## Matlab Install ##

[经过安装测试，可以在Win7 32位平台安装的Matlab2013b，ISO中也包含64位版本](http://emuch.net/html/201312/6802595.html)

cyg-mathworks_matlab_r2013b.iso

下载了若干版本的Matlab2013b，都没有在Win7 32位平台上安装成功，按附件提供的BT种子下载的Matlab2013b终于成功。
当然，喜欢64位的朋友也可以安装64位的，不过我没有测试试过，因为64b的安装案例比较多。
注意：
1. 安装说明和破解文件在Cygiso文件夹，单机安装的密钥是12345678901112131415（打开Readme.txt即可见）
2. 将Cygiso\x86文件夹中的libmwservices.dll文件复制到Matlab2013b的安装目录，例如，C:\Program Files\MATLAB\R2013b\bin\win32，覆盖即可。

您的安装可能需要执行其他配置步骤。
1。要配置 Real-Time Windows Target，必须在 MATLAB 命令行窗口中键入 rtwintgt -setup。