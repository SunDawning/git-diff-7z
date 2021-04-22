/*
 * 使用7z.exe来增量打包Git里变动的文件
 */
import{gitDiff7z}from"./gitDiff7z.js";
import{help}from"./help.js";
/*
 * 命令行
 * deno run --allow-run --allow-read --allow-write --unstable main.js --input "c:/users/sgs/AppData/Roaming/literate-programming" --output "c:/users/sgs/AppData/Roaming/literate-programming/6fba75e-8abdc66.zip" --from "6fba75e" --to "8abdc66"
 * deno compile --allow-run --allow-read --allow-write --unstable --output gitDiff7z.exe main.js
 * gitDiff7z.exe --input "c:/users/sgs/AppData/Roaming/literate-programming" --output "c:/users/sgs/AppData/Roaming/literate-programming/6fba75e-8abdc66.zip" --from "6fba75e" --to "8abdc66"
 */
import{
    parse
}from"https://deno.land/std/flags/mod.ts";
function main(){
    console.log(Deno.env);
    let args=parse(Deno.args);
    if(args.help===true){
        console.log(help);
    } else if(args.version){
        console.log("<2021-04-22 Thu 19:13:30 UTC+08:00>");
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
