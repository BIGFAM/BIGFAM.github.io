// localStorage load and save
function saveMessage(name,newarray) {
    localStorage[name] = JSON.stringify(newarray);
}
function loadMessage(name) {
    if (localStorage[name]) {
        return JSON.parse(localStorage[name]);
    }else{
        return [];
    }
}

/*
items = [item];
item = {
    isDone:boolean,
    taskName:string
};
*/
function insertTODO(item) {
    // 找到TODO list 面板
    var main = document.getElementById("main");
    //　創建節點
    var Task = document.createElement("div");
    Task.setAttribute("class", "Task");
    var taskContent = document.createElement("span");
    taskContent.innerHTML = item.taskName;
    taskContent.setAttribute("class","taskContent");
    var del = document.createElement("input");
    del.onclick = delbutton;
    del.setAttribute("type", "button");
    del.setAttribute("value", "cancel");
    del.setAttribute("class","del");
    var done = document.createElement("input");
    done.setAttribute("type","button");
    done.setAttribute("value","im done");
    done.setAttribute("class","done");
    if(item.isDone == true){
        taskContent.style.textDecoration = "line-through";
        done.value = "undo";
    }
    done.onclick = function(){
        var idoneoj = this.parentNode.getElementsByClassName("taskContent")[0];
        if(this.value == "im done"){
            this.value = "undo";
            idoneoj.style.textDecoration = "line-through";

        }else{
            this.value = "im done";
            idoneoj.style.textDecoration = "";
        }
        saveCurrList();
    }
    // append上DOM
    Task.appendChild(taskContent);
    Task.appendChild(del);
    Task.appendChild(done);
    main.appendChild(Task);
}
function creatTask(){
    var taskEnter = document.getElementById("taskEnter");
    var textValue = taskEnter.value;
    var textValueReplaced = textValue.replace(/(^\s*)|(\s*$)/g, "");
    // 非法空值
    if(textValueReplaced==null || textValueReplaced==""){return false;}

    // 插入項目
    insertTODO({isDone:false,taskName:textValue});

    var allMessage = loadMessage('allMessage');
    allMessage.push({isDone:false,taskName:textValue});
    saveMessage('allMessage',allMessage);
    taskEnter.value = "";
}

function deldone(){
    var main = document.getElementById("main");
    var currList = main.getElementsByTagName("span");
    for (var i = 0; i < currList.length; i++) {
        if(currList[i].style.textDecoration == "line-through"){
            var deloj = currList[i].parentNode;
            deloj.parentNode.removeChild(deloj);
            i = i - 1;
        }
    }
    saveCurrList();
}

window.onload = function loadandbuild(){
    var allMessage = loadMessage('allMessage');
    if(allMessage.length == 0) return;
    for(var i=0;i<allMessage.length;i++){
       insertTODO(allMessage[i]);
    }
}

function delbutton(){
    var delobj = this.parentNode;
    delobj.parentNode.removeChild(delobj);
    saveCurrList();
}

function saveCurrList(){
    var currList = document.getElementsByTagName("span");
    var message = [];
    for(var j = 0;j<currList.length;j++){
        var isDone = (currList[j].style.textDecoration == "line-through");
        message.push({isDone:isDone , taskName:currList[j].innerHTML});
    }
    saveMessage('allMessage',message);
}