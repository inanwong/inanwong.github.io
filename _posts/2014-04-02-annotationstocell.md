---
layout: blog-post
title: "Excel批注转换成单元格"
excerpt: "Excel批注转换成单元格"
location: "Shenzhen NanShan"
time: 08:51 AM
category: Office
tags:
- Office
- Excel
---

## Excel批注转换成单元格 ##

Sub Annotations()
    Dim C As Comment
    For i = 1 To Worksheet.Count
        For Each C In Worksheets(i).Comments
            C.Parent.Value = C.Parent.Value & "Annotations:" & C.Text
        Next
    Next
End SUb