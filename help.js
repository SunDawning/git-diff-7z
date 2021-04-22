let help=`
一个Git增量打包工具：

将Git两次提交之间变动的文件放到一个压缩包里

用法一：

    双击＂gitDiff7z.exe＂会启动一个界面，在其中可以交互式地设置，并运行。

用法二：

    gitDiff7z.exe [选项]

选项：

    --input   directory         ［可选］Git仓库的目录，是一个字符串。
    --output  file              ［可选］压缩包的路径，不填时将根据＂--input＂的值来在当前文件夹下生成相应名称的压缩包，是一个字符串。
    --from    commit            ［可选］提交的开头，可以是＂commit＂，也可以是＂tag＂，不填时为第一次提交，是一个字符串。
    --to      commit            ［可选］提交的结束，与＂--from＂相同，不填时为最新的一次提交，是一个字符串。
    --help                      ［可选］查看说明书
    --version                   ［可选］查看当前的版本
    --upgrade [version]         ［可选］升级当前程序（到指定版本），是一个字符串。
    --command7z command         ［可选］用来压缩的可执行程序7z.exe的路径，默认是"c:/Program Files/7-Zip/7z.exe"。

示例：

    将＂./literate-programming＂仓库里，从＂3d058b2＂到＂HEAD＂之间变动的全部文件都放到压缩包＂../a.zip＂里

    gitDiff7z.exe --input ./literate-programming --output ../a.zip --from 3d058b2 --to HEAD
`
export{help}
