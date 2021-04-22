/*
 * GUI界面
 */
import{serve}from"https://deno.land/std/http/server.ts";
import{gitDiff7z}from"./gitDiff7z.js";
/**
 * 在浏览器里使用程序
 */
async function gui(){
    let hostname="0.0.0.0";
    let port=2128;
    let server=serve({
        hostname:hostname,
        port:port
    });
    console.log(`HTTP服务器正在运行，地址为：

- http://${hostname}:${port}/
- http://localhost:${port}

在浏览器里访问上述地址，即可在界面里进行Git增量打包。

Powered by Deno.
`);
    for await (let request of server){
        let body;
        let headers;
        console.log(request.url);
        // 访问.js文件时：/gui.html.js => ./gui.html.js
        if(request.url.endsWith(".js")){
            body=new TextDecoder("utf-8").decode(Deno.readFileSync(`.${request.url}`));
            headers=new Headers();
            headers.set("content-type","application/javascript; charset=utf-8");
            request.respond({body:body,headers:headers});
        }else{
            switch(request.url){
                case "/gitDiff7z":
                    console.log("打包");
                    gitDiff7z({
                        input:"c:/users/sgs/AppData/Roaming/literate-programming",
                        from:"6fba75e",
                    });
                    request.respond({status:200});
                    break;
                default:
                    body=new TextDecoder("utf-8").decode(Deno.readFileSync("gui.html"));
                    request.respond({body});
            }            
        }
    }
}
export{gui}
