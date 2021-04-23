/**
 * 解析cmd字符串并使用Deno.run来运行该命令行
 */
function run(cmdString){
    Deno.run({
        cmd:cmdString.split(" "),
    }).status();
}
export{run}
