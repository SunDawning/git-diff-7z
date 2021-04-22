/*
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
import{add7z}from"./add7z.js";
import{gitDiffFiles}from"./gitDiffFiles.js";
/*
 * 使用7z.exe来增量打包Git里变动的文件
 * @param options.input          ［可选］Git仓库的目录，是一个字符串。
 * @param otpions.output         ［可选］压缩包的路径，不填时将根据＂options.input＂的值来在当前文件夹下生成相应名称的压缩包，是一个字符串。
 * @param options.from           ［可选］提交的开头，可以是＂commit＂，也可以是＂tag＂，不填时为第一次提交，是一个字符串。
 * @param options.to             ［可选］提交的结束，与＂from＂相同，不填时为最新的一次提交，是一个字符串。
 * @param options.command7z      ［可选］用来压缩的可执行程序7z.exe的路径，默认是"c:/Program Files/7-Zip/7z.exe"。
 */
function gitDiff7z(options){
    // "c:/Program Files/7-Zip/7z.exe" a b8c5195-HEAD.zip couple.org
    if(options===undefined){return;}
    let input=options.input;
    let from=options.from;
    let to=options.to||"HEAD";
    let output=options.output;
    let command7z=options.command7z;
    let archiveName=`${from}-${to}`; // 6fba75e-HEAD
    let cwd=input;
    if(cwd.endsWith("/")===false){
        cwd=cwd+"/";
    }
    let archiveFile=output||`${cwd.substring(0,cwd.length-1)}-${archiveName}-${new Date().getTime()}.zip`; // literate-programming-6fba75e-HEAD-1619090885064.zip
    function onFiles(files){
        ensureDirSync(archiveName);
        let total=files.length;
        // console.log(files);
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
            let archiveFile=`${cwd}${archiveName}/${file}`;
            ensureFile(archiveFile).then(function(){
                file=`${cwd}`+file;
                console.log("Copy",file,">",archiveFile);
                copy(file,archiveFile,{overwrite:true}).then(function(){
                    onFinishCopy(c);
                });
            });
        }
    }
    gitDiffFiles(cwd,from,to,undefined,onFiles);
}
export{gitDiff7z}
