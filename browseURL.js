/**
 * 打开浏览器并访问url
 */
function browseURL(url){
    let cmd=["cmd","/C",`start ${url}`];
    console.log("尝试自动打开浏览器并访问网址",url);
    console.log(cmd.join(" "));
    Deno.run({
        cmd:cmd,
    });
}
export{browseURL}
