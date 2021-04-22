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
        let body=`<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Type" name="viewport" content="width=device-width">
<title>Git增量打包工具</title>
</head>
<body>
Git增量打包工具
</body>
</html>`;
        request.respond({body});
    }
}
export{gui}
