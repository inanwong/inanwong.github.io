::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::	@GraphvizBuilder
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
@echo off
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

set "WS_GRAPHVIZ_BIN=C:\Program Files\Graphviz2.35\bin"

set strFileName=uml_graph_type.gv

dot -Tpng %strFileName% -o ../../assets/images/projects/%strFileName:~0,-3%.png

start ../../assets/images/projects/%strFileName:~0,-3%.png

rem pause

@echo on