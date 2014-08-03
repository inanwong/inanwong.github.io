---
layout: blog-post
title: "Flash Redirect Read Me"
excerpt: "Flash Redirect Read Me"
location: "Shenzhen LYJ"
time: 10:18 AM
category: Tool
tags:
- Tool
---

## Flash Redirect Read Me ##

## Flash Hook Function ##

FlashLoadMovie

HRESULT WINAPI FlashLoadMovie(/*[in]*/CONST VOID* pThisObject, 
    /*[in]*/int iLayer, /*[in]*/CONST BSTR bstrUrl)

未见调用

FlashPutVars

HRESULT WINAPI FlashPutVars(
    /*[in]*/ CONST VOID* pThisObject, /*[in]*/ CONST BSTR bstrVars)

+       bstrVars    0x1456aae4 "VideoIDS=XNzEzMDM4OTQ4&ShowId=289432&category=85&Cp=authorized&sv=true&ev=1&Light=on&THX=off&unCookie=0&frame=0&pvid=1400379934710cyC&uepflag=0&Tid=0&isAutoPlay=true&Version=/v1.0.0949&show_ce=0&winType=interior&embedid=AjE3ODI1OTczNwJ3d3cueW91a3UuY29tAg==&ikuison=1&vext=bc%3D%26pid%3D1400379934710cyC%26unCookie%3D0%26frame%3D0%26type%3D0%26svt%3D1%26stg%3D1%26emb%3DAjE3ODI1OTczNwJ3d3cueW91a3UuY29tAg%3D%3D%26dn%3D%E7%BD%91%E9%A1%B5%26hwc%3D1%26mtype%3Doth"    wchar_t * const

+       bstrVars    0x28c5f014 "FLASHBHORESTORE"    wchar_t * const

FlashPutMovie

HRESULT WINAPI FlashPutMovie(
    /*[in]*/CONST VOID* pThisObject, /*[in]*/CONST BSTR bstrMovie)

+       bstrMovie   0x28de416c "http://static.youku.com/v1.0.0431/v/swf/player_yknpsv.swf"  wchar_t * const


FlashPutScreen

HRESULT WINAPI FlashPutScreen(
    /*[in]*/CONST VOID* pThisObject, /*[in]*/CONST BSTR bstrValue)

FlashRelease

HRESULT WINAPI FlashRelease(/*[in]*/CONST VOID* pThisObject)