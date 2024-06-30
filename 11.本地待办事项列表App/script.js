const taskInput = document.querySelector(".task-input"),
spans = document.querySelectorAll(".controls span"),
clearAllBtn = document.querySelector(".clear-all-btn"),
taskBox = document.querySelector(".task-box");


let liIndex = 0,
taskScope = localStorage.getItem("taskScope") || document.querySelector(".controls span.active").id,
tasksObj = JSON.parse(localStorage.getItem("tasksObj")) || {all:[],pending:[],completed:[]}



window.addEventListener("load",()=>{
    spans.forEach(span=>{
        span.classList.remove("active")
        if(taskScope == span.id){
            span.classList.add("active")
        }
   
    
        span.addEventListener("click",()=>{
            console.log("clicked")
    
            if(span.classList.contains("active")) return
    
            spans.forEach(span=>span.classList.remove("active"))
            span.classList.add("active")
    
            localStorage.setItem("taskScope",span.id)
            taskScope = span.id
    
            randTask()
    
        })
    })
    
    initialRand()
})


function initialRand(){
    let length = tasksObj[taskScope].length;
    
    if(length == 0){
        const li = document.createElement("li")
        li.innerText = "没有任务哦"
        li.className = "tip"
        taskBox.appendChild(li)
    }else{
        randTask()
    }
}



taskInput.addEventListener("keyup",(e)=>{
    let value = e.currentTarget.value.trim()
    if(e.key == "Enter"&& value){
        createTask(value)
        e.currentTarget.value = ""
    }
})


// 创建代办任务
function createTask(text){

    const li = `<li li-index="${liIndex}">
            <input type="checkbox"/>
            <span>${text}</span>
            <i class="fa-solid fa-ellipsis"></i>
        </li>`
    liIndex++;
    tasksObj[taskScope].push(li)
    localStorage.setItem("tasksObj",JSON.stringify(tasksObj))

    randTask()
   
    // taskBox.insertAdjacentHTML("afterbegin",li)
}




// 渲染本地任务
function randTask(){
    //清除之前的渲染结果
    taskBox.innerHTML = ""

    if(tasksObj[taskScope].length == 0) initialRand()

    for(let task of tasksObj[taskScope]){
        taskBox.insertAdjacentHTML("afterbegin",task)
    }
    console.log(taskBox.querySelector(`li[li-index='${liIndex}'] input`))
    taskBox.querySelector(`li[li-index='${liIndex}'] input`).addEventListener("change",(e)=>{
        if(e.currentTarget.checked){
            tasksObj.all.spelice(liIndex,1)
            liIndex--;
        }
    })
}

