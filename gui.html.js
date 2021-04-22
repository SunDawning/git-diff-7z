function gui(){
    let gui=document.createElement("div");
    document.body.appendChild(gui);
    [
        {
            text:"选择Git仓库的目录",
            name:"input",
            onClick:function(event){
                console.log("选择Git仓库的目录");
            }
        },{
            text:"压缩包的路径",
            name:"output",
            onClick:function(event){
                console.log("压缩包的路径");
            }
        },{
            text:"提交的开头",
            name:"from",
            onClick:function(event){
                console.log("提交的开头");
            }
        },{
            text:"提交的结束",
            name:"to",
            onClick:function(event){
                console.log("提交的结束");
            }
        },{
            text:"7z.exe的路径",
            name:"command7z",
            onClick:function(event){
                console.log("7z.exe的路径");
            }
        },{
            text:"打包",
            name:"gitDiff7z",
            onClick:function(event){
                console.log("打包");
                let headers=new Headers();
                headers.set("content-type","application/json; charset=utf-8")
                let data={
                    input:"c:/users/sgs/AppData/Roaming/literate-programming",
                    from:"6fba75e",
                }
                window.fetch("/gitDiff7z",{
                    method:"POST",
                    headers:headers,
                    body:JSON.stringify(data),
                })
            }
        }
    ].forEach(function(item){
        let button=document.createElement("button");
        gui.appendChild(button);
        button.innerText=item.text;
        button.addEventListener("click",item.onClick);
    });
}
export{gui}
