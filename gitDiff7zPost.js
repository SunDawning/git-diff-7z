/**
 * 向"/gitDiff7z"发送打包的数据
 */
function gitDiff7zPost(url,data){
    console.log("打包");
    let headers=new Headers();
    headers.set("content-type","application/json; charset=utf-8")
    window.fetch(url,{
        method:"POST",
        headers:headers,
        body:JSON.stringify(data),
    });
}
export{gitDiff7zPost}
