---
layout: blog-post
title: "MFC CView Paint"
excerpt: "MFC CView Paint"
location: "Shenzhen LYJ"
time: 10:51 AM
category: Tool
tags:
- Tool
---

## MFC CView Paint ##

## CtrlColor 这个选择颜色的调色板 ##

将要绘制时调用。

这货是个调色板，父窗口绘制控件之前会相应改消息，获取指定控件的背景颜色。

WM_CTLCOLOR
afx_msg HBRUSH OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor);

pDC
Contains a pointer to the display context for the child window. May be temporary.
pWnd
Contains a pointer to the control asking for the color. May be temporary.
nCtlColor
Contains one of the following values, specifying the type of control:
CTLCOLOR_BTN        Button control
CTLCOLOR_DLG        Dialog box
CTLCOLOR_EDIT       Edit control
CTLCOLOR_LISTBOX    List-box control
CTLCOLOR_MSGBOX     Message box
CTLCOLOR_SCROLLBAR  Scroll-bar control
CTLCOLOR_STATIC     Static control

在子控件将要绘制时由框架调用。
The framework calls this member function when a child control is about to be drawn.

OnCtlColor必须返回一个指向可用画刷的句柄，用于绘画控件背景。
OnCtlColor must return a handle to the brush that is to be used for painting the control background.

大多数控件处理他们的父窗口(通常是一个对话框)发送的WM_CTLCOLOR消息用于准备DC在绘制控件时使用正确的颜色。
Most controls send this message to their parent (usually a dialog box) to prepare the pDC for drawing the control using the correct colors.

## OnEraseBkgnd 考虑要不要清除背景 ##

afx_msg BOOL OnEraseBkgnd(CDC* pDC);

控件重绘背景前调用，处理需要重绘的区域。
It is called to prepare an invalidated region for painting.

返回非零则不需要清除背景，返回0需要清除背景。
Nonzero if it erases the background; otherwise 0.

MFC框架会在窗口对象背景需要重绘的情况(例如:窗口大小改变)下调用该接口。
The framework calls this member function when the CWnd object background needs erasing (for example, when resized).

## OnPaint 开始画了 ##

WM_PAINT
afx_msg void OnPaint();

The framework calls this member function when Windows or an application makes a request to repaint a portion of an application's window.

The WM_PAINT message is sent when the UpdateWindow or RedrawWindow member function is called.

## OnDrawItem(DrawItem) 画得更好 ##

WM_DRAWiTEM
afx_msg void OnDrawItem(int nIDCtl, LPDRAWITEMSTRUCT lpDrawItemStruct);

// Overridables (for owner draw only)
virtual void DrawItem(LPDRAWITEMSTRUCT lpDrawItemStruct);

The framework calls this member function for the owner of an owner-draw button control, combo-box control, list-box control, or menu when a visual aspect of the control or menu has changed.

OnDrawItem是由宿主类调用的，DrawItem是在OnDrawItem中被是控件自己(子类)调用的。

## 总结 ##

WM_CTLCOLOR -> WM_ERASEBKGND -> WM_PAINT -(owner draw only)-> WM_DRAWiTEM

选色 -> 准备背景 -> 绘制 -(自绘)-> 自绘