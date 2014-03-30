---
layout: blog-post
title: "NSIS Questions"
excerpt: "NSIS Questions"
location: "Shenzhen NanShan"
time: 08:08 PM
category: Tool
tags:
- Deploy
- Tool
---

## NSIS Questions ##

### NSIS简介 ###

[NSIS Wiki (http://nsis.sourceforge.net/)](http://nsis.sourceforge.net/ "NSIS Wiki")

NSIS (Nullsoft Scriptable Install System) is a professional open source system to create Windows installers. It is designed to be as small and flexible as possible and is therefore very suitable for internet distribution. 

### 注册表操作 ###

    ReadRegStr $0 HKLM SOFTWARE\Product\ Version
    
    WriteRegExpandStr ${PRODUCT_INST_ROOT_KEY} "${PRODUCT_INST_KEY}" "Version" "$VERSION"
    WriteRegDword     ${PRODUCT_INST_ROOT_KEY} "${PRODUCT_INST_KEY}" "Enable" 1
    
    DeleteRegValue HKLM "SOFTWARE\Policies\Microsoft\Internet Explorer\Main" "Isolation"
    DeleteRegValue ${PRODUCT_INST_ROOT_KEY} "${PRODUCT_INST_KEY}" "Version"

### 字符串拼接 ###

    StrCpy $1 "one string"
    StrCpy $2 " second string"
    MessageBox MB_OK "$1$2"
<p />

    StrCpy $1 "Hello"
    StrCpy $2 "World"
    StrCpy $3 "$1 $2"
    DetailPrint $3

### Vista之后提高权限删除桌面图标 ###

[Shortcuts removal fails on Windows Vista](http://nsis.sourceforge.net/Shortcuts_removal_fails_on_Windows_Vista)
Windows Vista and Windows 7 automatically identify installer executables, including NSIS installers, and ask the user permission to run them with elevated privileges. Automatic detection, however, comes with the price of automatic backward compatibility tricks. One of which is automatic relocation of shortcuts created in the Start Menu to the All Users' Start Menu.      
To workaround this, use the new RequestExecutionLevel command or create the shortcuts in All Users' folders in the first place, using SetShellVarContext.     

    RequestExecutionLevel admin #NOTE: You still need to check user rights with UserInfo!
    SetShellVarContext all
<p />

    OutFile vista.exe
    Name Vista
     
    RequestExecutionLevel admin #NOTE: You still need to check user rights with UserInfo!
     
    Function .onInit
    #TODO: call UserInfo plugin to make sure user is admin
    FunctionEnd
     
    Section
      SetShellVarContext all
      CreateDirectory "$SMPROGRAMS\Vista Test"
      CreateShortcut  "$SMPROGRAMS\Vista Test\hello.lnk" $WINDIR\notepad.exe
      WriteUninstaller $EXEDIR\uninst.exe
    SectionEnd
     
    Section uninstall
      SetShellVarContext all
      Delete "$SMPROGRAMS\Vista Test\hello.lnk"
      RMDir "$SMPROGRAMS\Vista Test"
    SectionEnd



