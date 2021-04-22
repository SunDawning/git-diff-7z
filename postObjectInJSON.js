/**
 * 将object发送到url
 */
function postObjectInJSON(url,object){
    let headers=new Headers();
    headers.set("content-type","application/json; charset=utf-8")
    window.fetch(url,{
        method:"POST",
        headers:headers,
        body:JSON.stringify(object),
    });
}
export{postObjectInJSON}
