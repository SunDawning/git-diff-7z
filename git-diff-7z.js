/**
 * 使用7z.exe来增量打包Git里变动的文件
 */
import{
    emptyDir,
    emptyDirSync,
    ensureFile,
    ensureFileSync,
    ensureDirSync,
    copySync,
    copy,
}from"https://deno.land/std/fs/mod.ts";
function gitDiff7z(options){
    // "c:/Program Files/7-Zip/7z.exe" a b8c5195-HEAD.zip couple.org
    if(options===undefined){return;}
    let input=options.input;
    let from=options.from;
    let to=options.to||"HEAD";
    let output=options.output;
    let command7z=options.command7z;
    let archiveName=`${from}-${to}`;
    let archiveFile=output||`${input}-${archiveName}.zip`;
    function onFiles(files){
        ensureDirSync(archiveName);
        let total=files.length;
        console.log(files);
        function onFinishCopy(c){
            if(c===(total-1)){
                console.log("onFinishCopy");
                add7z(archiveFile,archiveName,function(){
                    emptyDir(archiveName).then(function(){
                        Deno.remove(archiveName);
                        console.log(archiveFile);
                    });
                },command7z);
            }
        }
        for(let c=0;c<total;c=c+1){
            let file=files[c];
            let cwd=input;
            if(cwd.endsWith("/")===false){
                cwd=cwd+"/";
            }
            let archiveFile=`${cwd}${archiveName}/${file}`;
            ensureFile(archiveFile).then(function(){
                file=`${cwd}`+file;
                console.log(file,">",archiveFile);
                copy(file,archiveFile,{overwrite:true}).then(function(){
                    onFinishCopy(c);
                });
            });
        }
    }
    gitDiffFiles(input,from,to,undefined,onFiles);
}
/**
 * 添加文件到压缩包
 * 示例：
 * add7z("b8c5195-HEAD.zip","deno.org");
 */
function add7z(archiveName,fileNames,onAdd,command7z){
    if(archiveName===undefined){return;}
    if(command7z===undefined){
        command7z="c:/Program Files/7-Zip/7z.exe";
    }
    if(typeof(fileNames)==="string"){
        fileNames=[fileNames];
    }
    Deno.run({
        cmd:[command7z,"a",archiveName,fileNames]
    }).status().then(function(data){
        if(onAdd){
            onAdd();
        }
    });
    `"c:/Program Files/7-Zip/7z.exe" --help

7-Zip 19.00 (x64) : Copyright (c) 1999-2018 Igor Pavlov : 2019-02-21

Usage: 7z <command> [<switches>...] <archive_name> [<file_names>...] [@listfile]

<Commands>
  a : Add files to archive
  b : Benchmark
  d : Delete files from archive
  e : Extract files from archive (without using directory names)
  h : Calculate hash values for files
  i : Show information about supported formats
  l : List contents of archive
  rn : Rename files in archive
  t : Test integrity of archive
  u : Update files to archive
  x : eXtract files with full paths

<Switches>
  -- : Stop switches and @listfile parsing
  -ai[r[-|0]]{@listfile|!wildcard} : Include archives
  -ax[r[-|0]]{@listfile|!wildcard} : eXclude archives
  -ao{a|s|t|u} : set Overwrite mode
  -an : disable archive_name field
  -bb[0-3] : set output log level
  -bd : disable progress indicator
  -bs{o|e|p}{0|1|2} : set output stream for output/error/progress line
  -bt : show execution time statistics
  -i[r[-|0]]{@listfile|!wildcard} : Include filenames
  -m{Parameters} : set compression Method
    -mmt[N] : set number of CPU threads
    -mx[N] : set compression level: -mx1 (fastest) ... -mx9 (ultra)
  -o{Directory} : set Output directory
  -p{Password} : set Password
  -r[-|0] : Recurse subdirectories
  -sa{a|e|s} : set Archive name mode
  -scc{UTF-8|WIN|DOS} : set charset for for console input/output
  -scs{UTF-8|UTF-16LE|UTF-16BE|WIN|DOS|{id}} : set charset for list files
  -scrc[CRC32|CRC64|SHA1|SHA256|*] : set hash function for x, e, h commands
  -sdel : delete files after compression
  -seml[.] : send archive by email
  -sfx[{name}] : Create SFX archive
  -si[{name}] : read data from stdin
  -slp : set Large Pages mode
  -slt : show technical information for l (List) command
  -snh : store hard links as links
  -snl : store symbolic links as links
  -sni : store NT security information
  -sns[-] : store NTFS alternate streams
  -so : write data to stdout
  -spd : disable wildcard matching for file names
  -spe : eliminate duplication of root folder for extract command
  -spf : use fully qualified file paths
  -ssc[-] : set sensitive case mode
  -sse : stop archive creating, if it can't open some input file
  -ssw : compress shared files
  -stl : set archive timestamp from the most recently modified file
  -stm{HexMask} : set CPU thread affinity mask (hexadecimal number)
  -stx{Type} : exclude archive type
  -t{Type} : Set type of archive
  -u[-][p#][q#][r#][x#][y#][z#][!newArchiveName] : Update options
  -v{Size}[b|k|m|g] : Create volumes
  -w[{path}] : assign Work directory. Empty path means a temporary directory
  -x[r[-|0]]{@listfile|!wildcard} : eXclude filenames
  -y : assume Yes on all queries`
}
/**
 * 使用7z.exe来创建压缩文件
 */
/**
 * Git里变动的文件
 * @param onFile 一个函数，对每个变动的文件进行操作，自变量是文件名。
 * 示例：
 * function onGitDiffFile(file){console.log(file);}
 * gitDiffFiles("b8c5195","HEAD",onGitDiffFile);
 */
import{
    exists,
    existsSync,
}from"https://deno.land/std/fs/mod.ts";
function gitDiffFiles(cwd,from,to,onFile,onFiles){
    if(cwd.endsWith("/")===false){
        cwd=cwd+"/";
    }
    function onFalseQuotepath(data){
        function onGitDiff(data){
            let files=[];
            function mapFile(file){
                console.log(file);
                if(file.length===0){return;}
                function onFileExists(is){
                    if(!(is===true)){return;}
                    files.push(file);
                    if(onFile){
                        onFile(file);
                    }
                }
                onFileExists(existsSync(cwd+file));
            }
            new TextDecoder().decode(data).split("\n").forEach(mapFile);
            if(onFiles){
                onFiles(files);
            }
        }
        console.log(cwd);
        Deno.run({
            cwd:cwd,
            cmd:["git","diff",from,to,"--name-only"],
            stdout:"piped",
            stderr:"piped",
        }).output().then(onGitDiff);
    }
    // git diff 中文 汉字编码显示_Aero's WorkSpace.-CSDN博客: https://blog.csdn.net/yuangc/article/details/107316295
    Deno.run({
        cwd:cwd,
        cmd:"git config core.quotepath false".split(" "),
    }).status().then(onFalseQuotepath);
}
/**
 * 命令行
 * deno run --allow-run --allow-read --allow-write --unstable c:/Users/sgs/AppData/Roaming/.emacs.d/site-lisp/deno/git-diff-7z.js --input "c:/users/sgs/AppData/Roaming/literate-programming" --output "c:/users/sgs/AppData/Roaming/literate-programming/6fba75e-8abdc66.zip" --from "6fba75e" --to "8abdc66"
 * deno compile --allow-run --allow-read --allow-write --unstable --output gitDiff7z.exe c:/Users/sgs/AppData/Roaming/.emacs.d/site-lisp/deno/git-diff-7z.js
 * gitDiff7z.exe --input "c:/users/sgs/AppData/Roaming/literate-programming" --output "c:/users/sgs/AppData/Roaming/literate-programming/6fba75e-8abdc66.zip" --from "6fba75e" --to "8abdc66"
 */
import{
    parse
}from"https://deno.land/std/flags/mod.ts";
function main(){
    console.log(Deno.env);
    let args=parse(Deno.args);
    if(args.help===true){
        console.log(`
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
`);
    } else if(args.version){
        console.log("<2021-04-22 Thu 08:17:53 UTC+08:00>");
    }else{
        gitDiff7z(args);
    }
}
if(import.meta.main){
    main();
}

