const taskInput = document.querySelector(".task-input"),
spans = document.querySelectorAll(".controls span"),
clearAll = document.querySelector(".clear-all-btn"),
taskBox = document.querySelector(".task-box");


let editId,
isEditTask = false,
todos = JSON.parse(localStorage.getItem("todo-list")) || [];

spans.forEach(span=>{
    span.addEventListener("click",()=>{
        document.querySelector("span.active").classList.remove("active")
        span.classList.add("active")

        showTodo(span.id)
    })
    
})


taskInput.addEventListener("keyup",(e)=>{
    let value = e.currentTarget.value.trim()
    if(e.key == "Enter" && value){

       if(!isEditTask){
        let obj = {status:"pending",name:value}
        todos.push(obj)
       }else{
        todos[editId].name = value
        isEditTask = false;
        editId = null
       }
        localStorage.setItem("todo-list",JSON.stringify(todos))
        showTodo(document.querySelector("span.active").id)

        taskInput.value = ""

    }
})


function showTodo(filter){
    let liTag = "";
    todos.forEach((todo,id)=>{
        //实现了分类渲染
        if(filter == "all" || filter == todo.status){
            let completed = todo.status == "completed" ? "checked" : "";
            liTag += `<li class="task">
                    <label for="${id}">
                        <input type="checkbox" id="${id}" onclick="updateStatus(this)" ${completed}/>
                        <p class="${todo.status == "completed" ? "completed" : ""}">${todo.name}</p>
                    </label>
                    <div class="settings">
                        <i class="fa-solid fa-ellipsis" onclick="showMenu(this)"></i>
                        <ul class="task-menu">
                            <li class="icon">
                                <i class="fa-solid fa-pen"  onclick="editTask(${id},'${todo.name}')"></i>
                                <span>Edit</span>
                            </li>
                            <li class="icon">
                                <i class="fa-solid fa-trash" onclick='deleteTask(${id})'></i>
                                <span>Delete</span>
                            </li>
                            
                        </ul>

                    </div>
                </li>`;
        }
    })
     
    taskBox.innerHTML = liTag || "<span>你没有创建任务</span>"

    !taskBox.querySelectorAll(".task").length ? clearAll.classList.remove("active") : clearAll.classList.add("active")
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow")

}


showTodo("all")


clearAll.addEventListener("click",()=>{
    // todos.length = 0
    let selectedStatus = document.querySelector("span.active").id
    for(let i = 0;i<todos.length;i++){
        if(todos[i].status == selectedStatus){
            todos.splice(i,1)
            i--;
        }
    }
    // todos.splice(0,todos.length)
    localStorage.setItem("todo-list",JSON.stringify(todos))

    isEditTask = false;
    showTodo(document.querySelector("span.active").id)
})

function updateStatus(elem){
    let p = elem.parentElement.lastElementChild; 
    if(elem.checked){
        todos[elem.id].status = "completed"
        p.classList.add("completed")
    }else{
        todos[elem.id].status = "pending"
        p.classList.remove("completed")
    }
    
    localStorage.setItem("todo-list",JSON.stringify(todos))
    // showTodo(document.querySelector("span.active").id)
}


const cover = document.querySelector(".cover")

function showMenu(elem){
    let taskMenu = elem.nextElementSibling?.closest(".task-menu")
    // console.log(taskMenu,"taskMenu")
    taskMenu.classList.add("show")
    cover.classList.add("show")


    cover.addEventListener("click",()=>{
        taskMenu.classList.remove("show")
        cover.classList.remove("show")
    })
}


function editTask(id,textValue){
    taskInput.value = textValue
    editId = id
    isEditTask = true
    taskInput.focus()

    cover.click()

}


function deleteTask(id){
    console.log(id)
    todos.splice(id,1)
    localStorage.setItem("todo-list",JSON.stringify(todos))
    showTodo(document.querySelector("span.active").id)

    cover.click()


}




