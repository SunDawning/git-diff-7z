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
import{add7z}from"./add7z.js";
import{gitDiffFiles}from"./gitDiffFiles.js";
function gitDiff7z(options){
    // "c:/Program Files/7-Zip/7z.exe" a b8c5195-HEAD.zip couple.org
    if(options===undefined){return;}
    let input=options.input;
    let from=options.from;
    let to=options.to||"HEAD";
    let output=options.output;
    let command7z=options.command7z;
    let archiveName=`${from}-${to}`;
    let cwd=input;
    if(cwd.endsWith("/")===false){
        cwd=cwd+"/";
    }
    let archiveFile=output||`${cwd.substring(0,cwd.length-1)}-${archiveName}-${new Date().getTime()}.zip`;
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
