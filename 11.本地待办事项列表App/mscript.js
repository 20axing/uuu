const taskInput = document.querySelector(".task-input"),
spans = document.querySelectorAll(".controls span"),
clearAll = document.querySelector(".clear-all-btn"),
taskBox = document.querySelector(".task-box");


let editId,
isEditTask = false,
todos = JSON.parse(localStorage.getItem("todo-list"));

spans.forEach(span=>{
    span.addEventListener("click",()=>{
        document.querySelector("span.active").classList.remove("active")
        span.classList.add("active");
        showTodo(span.id)
    })
})  


function showTodo(filter){
    let liTag = ""
    if(todos){
        todos.forEach((todo,id)=>{
            let completed = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all"){
                liTag += `<li class="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                            <p class="${completed}">${todo.name}</p>
                        </label>
                        <div class="settings">
                            <i class="fa-solid fa-ellipsis" onclick="showMenu(this)"></i>
                        </div>
                    </li>`
            } 
        })
    }
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
    let checkTask = taskBox.querySelectorAll(".task")

    //控制清除按钮是否可用
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    //控制溢出
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow")
}

showTodo("all")

function updateStatus(elem){
    let taskName = elem.parentElement.lastElementChild;
    if(elem.checked){
        taskName.classList.add("checked")
        todos[elem.id].status = "completed"
    }else{
        taskName.classList.remove("checked")
        todos[elem.id].status = "pending"
    }

    localStorage.setItem("todo-list",JSON.stringify(todos))

}


clearAll.addEventListener("click",()=>{
    // todos.splice(0,todos.length)
    todos.length = 0;

    localStorage.setItem("todo-list",JSON.stringify(todos))
    showTodo()

})

taskInput.addEventListener("keyup",(e)=>{
    todos = todos ? todos : [];
    let value = e.currentTarget.value.trim()
    if(e.key == "Enter" && value){
        const todo = {status:"peding",name:value}
        todos.push(todo)
        localStorage.setItem("todo-list",JSON.stringify(todos))

        taskInput.value = ""
        showTodo(document.querySelector("span.active").id)
    }
})