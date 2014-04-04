---
layout: blog-post
title: "Run At A Low Integrity Level"
excerpt: "Run At A Low Integrity Level"
location: "Shenzhen NanShan"
time: 05:23 PM
category: Windows
tags:
- Windows
---

## Run At A Low Integrity Level ##

[Designing Applications to Run at a Low Integrity Level](http://msdn.microsoft.com/en-us/library/bb625960.aspx)

An easy way to run an application process at a low integrity level is to set the integrity level of the executable program file to low integrity. When that image file is launched, the application process is started with a low integrity level. For example, suppose we want to run the Windows Calculator application in a low integrity process.
To run calc.exe at low integrity 
1.Make a copy of c:\Windows\system32\calc.exe to a temporary folder.

2.Use the icacls program to set the integrity level of the temporary file, lowcalc.exe, to low integrity using the icacls command:

    icacls lowcalc.exe /setintegritylevel low 
</BR>

	icacls C:/Windows/notepad.exe /setintegritylevel low
	
3.Run the low-integrity version of calc.exe.
