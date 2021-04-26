import{postObjectInJSON}from"./postObjectInJSON.js";
function gui(){
    let gui=document.createElement("div");
    document.body.appendChild(gui);
    gui.style.cssText=`
margin: 0 auto;
width: 100%;
max-width: 320px;
text-align: center;
padding: 8px;
`;
    let options=[
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
                console.log("点击了打包按钮");
                let button=event.currentTarget;
                let collection=button.parentElement.getElementsByTagName("input");
                let data={};
                options.map(function(item){
                    if(collection[item.name]){
                        let value=collection[item.name].value;
                        if(value===""){
                            value=undefined;
                        }
                        data[item.name]=value;
                    }
                });
                console.log("请求的数据",data);
                postObjectInJSON("/gitDiff7z",data);
            },
            type:"button",
        }
    ];
    options.forEach(function(item){
        let type=item.type;
        if(type==="button"){
            let button=document.createElement("button");
            button.type=item.type;
            button.name=item.name;
            gui.appendChild(button);
            button.innerText=item.text;
            button.addEventListener("click",item.onClick);
            button.style.cssText=`
    width: 304px;
    font-size: 16px;
    color: #fff;
    border-width: 0;
    box-shadow: none;
    background: none;
    outline: none;
    height: 48px;
    background-image: linear-gradient(129.12deg, #446dff 0%, rgba(99, 125, 255, 0.75) 100%);
    border-radius: 10px;
    backdrop-filter: blur(24px);
    margin:8px;
    cursor:pointer;
`
        }else{
            let input=document.createElement("input");
            input.name=item.name;
            input.placeholder=item.text;
            gui.appendChild(input);
            input.innerText=item.text;
            input.style.cssText=`
    margin:8px;
    font-size: 14px;
    background: rgba(39, 39, 41, 0.04);
    border-radius: 8px;
    padding-left: 12px;
    width: 304px;
    border: 1px solid transparent;
    height: 46px;`
        }
    });
}
export{gui}
