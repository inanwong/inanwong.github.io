---
layout: blog-post
title: "在XML数据中包含HTML数据"
excerpt: "在XML数据中包含HTML数据"
location: "Shenzhen LYJ"
time: 05:48 PM
category: XML
tags:
- XML
- HTML
---

## 在XML数据中包含HTML数据 ##

    <TestData>
        <FlashFormatConvert>
            <!--正常值测试-->
            <TestCase object='<OBJECT style="VISIBILITY: hidden" ><PARAM NAME="_cy" VALUE="11112"><embed src="test" width="560" height="420"></embed></OBJECT>' embed='<embed src="test" width="560" height="420">'/>
        </FlashFormatConvert>
    </TestData>