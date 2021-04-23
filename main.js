/*
 * 使用7z.exe来增量打包Git里变动的文件
 * - 以命令行方式使用
 * - 以JavaScript模块的方式使用
 * - ［ ］ 双击可执行程序使用
 */
import{gitDiff7z}from"./gitDiff7z.js";
import{readme}from"./readme.js";
import{
    parse
}from"https://deno.land/std/flags/mod.ts";
import{gui}from"./gui.js";
/**
 * 命令行
 * deno run --allow-run --allow-read --allow-write --unstable main.js --input "c:/users/sgs/AppData/Roaming/literate-programming" --output "c:/users/sgs/AppData/Roaming/literate-programming/6fba75e-8abdc66.zip" --from "6fba75e" --to "8abdc66"
 * deno compile --allow-run --allow-read --allow-write --unstable --allow-net --output gitDiff7z.exe main.js
 * gitDiff7z.exe --input "c:/users/sgs/AppData/Roaming/literate-programming" --output "c:/users/sgs/AppData/Roaming/literate-programming/6fba75e-8abdc66.zip" --from "6fba75e" --to "8abdc66"
 * deno run --allow-run --allow-read --allow-write --unstable --watch --allow-net main.js
 */
function main(){
    let args=parse(Deno.args);
    // console.log(args);
    if((Object.keys(args).length===1)&&(args["_"].length===0)){
        gui();
    }else if(args.help===true){
        console.log(readme);
    }else if(args.version){
        console.log("<2021-04-23 Fri 18:42:06 UTC+08:00>");
    }else{
        gitDiff7z(args);
    }
}
if(import.meta.main){
    main();
}
export{
    gitDiff7z
}
