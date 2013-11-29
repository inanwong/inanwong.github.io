::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::	@GraphvizBuilder
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
@echo off
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:: Graphviz bin
SET PATH=%PATH%;C:\Program Files\Graphviz2.35\bin;

:: inanwong.github.io
SET SRC_DIR=E:\WriteSpace\WriteSpace\inanwong.github.io\_project\InanWong-Graphviz\
SET TARGET_DIR=..\..\assets\images\projects\

:: sublime
rem SET SRC_DIR=E:\WriteSpace\Graphviz\src\
rem SET TARGET_DIR=E:\WriteSpace\Graphviz\png\

cd /d %SRC_DIR%

:: 判断参数个数
if [%1] == [] (goto Mutil) else (goto Single)

:: 编译当前文件
:Single

:: 将 %1 扩展到文件名
setlocal enabledelayedexpansion
for %%# in ("%1") do (
	echo %%~nx#
	set SRC_FILE_PATH=%%~nx#
)

dot -Tpng %SRC_FILE_PATH% -o %TARGET_DIR%%SRC_FILE_PATH:~0,-3%.png
start %TARGET_DIR%%SRC_FILE_PATH:~0,-3%.png

goto End

:: 编译当前目录所有文件
:Mutil

:: Clean All
for /f "delims=" %%i in ('dir /b /a-d /s "%TARGET_DIR%*.png"') do (
	del "%%i"
)

:: Build All
echo Graphviz Building...
setlocal enabledelayedexpansion
for /f "delims=" %%i in ('dir /b /a-d "*.gv"') do (
	echo - %%i
	set SRC_FILE_PATH=%%i
	dot -Tpng %%i -o %TARGET_DIR%!SRC_FILE_PATH:~0,-3!.png
)

goto End

:: 结束
:End
echo "End!!!"
rem pause

@echo on