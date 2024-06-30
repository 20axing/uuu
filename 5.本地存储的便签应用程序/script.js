const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = document.querySelector("header p"),
closeIcon = document.querySelector("header .fa-x"),
titleTag = document.querySelector("input"),
descTag = document.querySelector("textarea"),
addBtn = document.querySelector("form button");

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const notes = JSON.parse(localStorage.getItem("notes")) || [];

//是否要修改，修改项目的id
let isUpdate = false,updateId;

addBox.addEventListener("click",({target})=>{
    if(target.closest(".add-box .icon")){
        popupBox.classList.add("show")
        popupTitle.innerText = "Add a new Note";
        addBtn.innerText = "Add Note";

        if(window.innerWidth > 660){
            titleTag.focus()
        }
    }
})
closeIcon.addEventListener("click",()=>{
    //关闭弹出层后恢复默认设置：不修改
    isUpdate = false;

    // 清除上一次输入的值
    titleTag.value = descTag.value = ""
    popupBox.classList.remove("show")
})

popupBox.addEventListener("click",({target,currentTarget})=>{
    if(target === currentTarget){
        closeIcon.click()
    }
    return
})

addBtn.addEventListener("click",(e)=>{
    // 阻止默认事件
    e.preventDefault()

    let title = titleTag.value.trim(),
    description = descTag.value.trim();

    if(title || description){
        const CurrentDate = new Date();
        let month = months[CurrentDate.getMonth()],
        day = CurrentDate.getDate(),
        year = CurrentDate.getFullYear();

        let noteInfo = {title,description,date:`${month} ${day},${year}`};
        if(!isUpdate){//创建便签
            notes.push(noteInfo)
        }else{//修改便签
            notes[updateId] = noteInfo;
            isUpdate = false;
        }
        // 将内容存储到本地
        localStorage.setItem("notes",JSON.stringify(notes))

        showNotes()

        //创建或修改完毕后关闭弹出层
        closeIcon.click()
    }else{
        alert("便签内容不能为空")
    }

    
})

function showNotes(){
    console.log(notes,"notes")
    if(!notes) return;
    // 先清空再渲染
    document.querySelectorAll(".note").forEach(elem=>elem.remove());
    notes.forEach((note,id)=>{
        
        let filterDesc = note.description.replaceAll("\n","<br/>");
        let liTag = `<li class="note">
           <div class="details">
               <p>${note.title}</p>
               <span>${filterDesc}</span>
           </div>
            <div class="bottom-content">
                <span>${note.date}</span>
                <div class="settings">
                   <i onclick="showMenu(this,event)" class="fa-solid fa-ellipsis"></i>
                   <ul class="menu">
                       <li onclick="updateNote(${id},'${note.title}','${filterDesc}')"><i class="fa-solid fa-pen"></i>Edit</li>
                       <li onclick="deleteNote(${id},event)"><i class="fa-solid fa-trash"></i>Delete</li>
                   </ul>
                </div>
            </div>
        </li>`

        document.querySelector(".wrapper").insertAdjacentHTML("beforeend",liTag)
    })
}

showNotes()

function showMenu(elem,e){
    const target = elem.closest(".settings")
    target.classList.add("show")

    document.documentElement.addEventListener("click",(event)=>{
        if(target.contains(event.target)) return
        target.classList.remove("show")
    })
}

function updateNote(id,title,filterDesc){
    console.log(filterDesc,"desc")
    let description = filterDesc.replaceAll("<br/>","\r\n")
    
    // 弹出表单修改数据
    document.querySelector(".add-box .icon").click()
    titleTag.value = title
    descTag.value = filterDesc
    popupTitle.innerText = "Update a Note";
    addBtn.innerText = "Update Note"


    isUpdate = true
    updateId = id

    
}

function deleteNote(id,e){
    let confirmDel = confirm("Are you sure you want to delete this note?")
    if(!confirmDel){
        const target = e.target.closest(".settings")
        target.classList.remove("show")
        return
    }

    // 删除便签
    notes.splice(id,1)
    localStorage.setItem("notes",JSON.stringify(notes))
    showNotes()
}

