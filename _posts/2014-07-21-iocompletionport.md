---
layout: blog-post
title: "Io Completion Port"
excerpt: "Io Completion Port"
location: "Shenzhen NAN SHAN ZHI YUAN"
time: 03:02 PM
category: Windows
tags:
- Thread
- I/O
---

## Io Completion Port ##
IO完成端口

背后理论：并发运行的线程的数量必须有一个上限。
缺点：需要为每个客户请求创建一个新的线程。
设计初衷：与线程池配合使用，仅在一个进程中使用。唯一一个创建内核对象时不需要指定安全描述符。

线程池中的所有线程应该执行同一个函数。

hCompletionPort
描述IO完成端口的数据结构

设备列表

IO完成队列(先入先出)

等待线程队列(后入先出)

已释放线程列表

已暂停线程列表
