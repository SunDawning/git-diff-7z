function gui(){
    let gui=document.createElement("div");
    document.body.appendChild(gui);
    [
        {
            text:"选择Git仓库的目录",
            name:"input",
            onClick:function(event){
            }
        },{
            text:"压缩包的路径",
            name:"output",
            onClick:function(event){
            }
        },{
            text:"提交的开头",
            name:"from",
            onClick:function(event){
            }
        },{
            text:"提交的结束",
            name:"to",
            onClick:function(event){
            }
        },{
            text:"7z.exe的路径",
            name:"command7z",
            onClick:function(event){
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
