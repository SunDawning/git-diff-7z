import{Buffer}from"https://deno.land/std/io/buffer.ts";
/**
 * 转换request.body
 * 参考了 https://servestjs.org/
 */
async function decodeRequestBody(requestBody){
    let buffer=new Buffer();
    await Deno.copy(requestBody,buffer);
    return new TextDecoder().decode(buffer.bytes());
}
export{decodeRequestBody}
