---
layout: blog-post
title: "使用C++实现UNICODE文本读写"
excerpt: "使用C++实现UNICODE文本读写"
location: "Shenzhen LYJ"
time: 05:14 PM
category: Code
tags:
- Windows
- CPlus
---

## 使用C++实现UNICODE文本读写 ##

### 写入Unicode文本 ###

范例：    

	void write_unicode()
	{
		// 写入 Unicode 内容
		TCHAR* recordfilename=_T("自然_井民全_练习项目1.mp3");

		// 开启文件: (注意: 要用 wb 不能用 wt)
		// 请放心! 写入后还是可以用 Notepad 看到内容(This is a Unicode document file)
		FILE *fp=_tfopen(_T("RecordInfo_API.txt"),_T("wb"));
		if(fp!=NULL)
		{
		   // Step 1: 写入 Unicode 档头, 标明这是 Unicode 檔 (关键片段)
		   unsigned char u[2]={0xff,0xfe}; // Unicode 档头 = 0xfeff
		   fwrite(u,2,1,fp);

		   // Step 2: 写入真正 Unicode 数据
		   _ftprintf(fp,_T("Record_Filename=%s\n"),recordfilename);

		   // Step 3: 关档写入
		   fclose(fp);

		   // Step 4: 请用 NotePad 看看内容
		}
		else
		{
		   ::MessageBox(NULL,_T("录音信息文件建立失败"),_T("Error"),MB_OK);
		}
	}

### 读取Unicode文本 ###

范例：    

	void read_unicode()
	{
		TCHAR recordfilename[256];
		// 开启文件: (注意: 要用 rb 不能用 rt)
		FILE *fp=_tfopen(_T("RecordInfo_API.txt"),_T("rb"));
		if (fp!=NULL)
		{
			// (关键片段)
			// Step 1: 先读取 0xfffe (你也可以跳过 2 bytes)
			char unicodeheader[2];
			fread(unicodeheader,2,1,fp);

			// Step 2: 真正读取 Unicode 内容
			_ftscanf(fp,_T("Record_Filename=%s\n"),&recordfilename);
			fclose(fp);
		}
	}
