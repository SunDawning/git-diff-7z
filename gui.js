/*
 * GUI界面
 */
import{serve}from"https://deno.land/std/http/server.ts";
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
        let body=new TextDecoder("utf-8").decode(Deno.readFileSync("gui.html"));
        request.respond({body});
    }
}
export{gui}
