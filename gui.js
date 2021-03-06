/*
 * GUI界面
 */
import{serve}from"https://deno.land/std/http/server.ts";
import{gitDiff7z}from"./gitDiff7z.js";
import{browseURL}from"./browseURL.js";
import{decodeRequestBody}from"./decodeRequestBody.js";
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

在浏览器里访问上述地址，即可在界面里进行打包。

Powered by Deno.
`);
    browseURL(`http://localhost:${port}`);
    for await (let request of server){
        let body;
        let headers;
        console.log("访问",request.url);
        // 访问.js文件时：/gui.html.js => ./gui.html.js
        if(request.url.endsWith(".js")){
            body=new TextDecoder("utf-8").decode(Deno.readFileSync(`.${request.url}`));
            headers=new Headers();
            headers.set("content-type","application/javascript; charset=utf-8");
            request.respond({body:body,headers:headers});
        }else{
            switch(request.url){
                case "/gitDiff7z":
                    console.log("接收到打包请求，开始解析请求的数据。");
                    let options=JSON.parse(await decodeRequestBody(request.body));
                    console.log("解析完请求的数据，开始按要求打包：",options);
                    gitDiff7z(options);
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
