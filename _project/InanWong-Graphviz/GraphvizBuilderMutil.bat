::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::	@GraphvizBuilderMutil
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
@echo off
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:: Graphviz bin
set "WS_GRAPHVIZ_BIN=C:\Program Files\Graphviz2.35\bin"

:: Clean All
for /f "delims=" %%i in ('dir /b /a-d /s "..\..\assets\images\projects\*.png"') do (
	del "%%i"
)

:: Build All
echo Graphviz Building...
setlocal enabledelayedexpansion
for /f "delims=" %%i in ('dir /b /a-d "*.gv"') do (
	echo - %%i
	set strFileName=%%i
	dot -Tpng %%i -o ../../assets/images/projects/!strFileName:~0,-3!.png
)
echo Graphviz Build Success.

pause

@echo on