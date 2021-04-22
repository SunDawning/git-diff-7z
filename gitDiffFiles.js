/*
 * 处理Git里变动的文件
 * - 对所有变动的文件的文件进行操作
 * - 对找到的单个文件进行操作
 */
import{
    exists,
    existsSync,
}from"https://deno.land/std/fs/mod.ts";
/**
 * Git里变动的文件
 * @param onFile 一个函数，对每个变动的文件进行操作，自变量是文件名。
 * 示例：
 * function onGitDiffFile(file){console.log(file);}
 * gitDiffFiles("b8c5195","HEAD",onGitDiffFile);
 */
function gitDiffFiles(cwd,from,to,onFile,onFiles){
    if(cwd.endsWith("/")===false){
        cwd=cwd+"/";
    }
    function onFalseQuotepath(data){
        function onGitDiff(data){
            let files=[];
            function mapFile(file){
                // console.log(file);
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
export{gitDiffFiles}
