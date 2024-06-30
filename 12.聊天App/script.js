const chatBox = document.querySelector(".chat-box"),
chatList = document.querySelector(".chat-list"),
closeChatBtn = document.querySelector("header .fa-x"),
sendBtn = document.querySelector(".send-btn"),
textarea = document.querySelector(".text-field textarea"),
chatBtn = document.querySelector(".chat-btn i"),
emptyOver = document.querySelector(".empty-over");

let chatMessages = JSON.parse(localStorage.getItem("message-list")) || [{account:"robot",icon:'fa-robot',message:'Hi there&#128540;,<br/> How can I help you today?'}]

// 显示/隐藏聊天框
chatBtn.addEventListener("click",()=>{
    chatBox.classList.toggle("show")

    if(chatBtn.classList.contains("fa-x")){
        chatBtn.classList.replace("fa-x","fa-message")
    }else{
        chatBtn.classList.replace("fa-message","fa-x")
    }
    
})

closeChatBtn.addEventListener("click",()=>{
    chatBtn.click()
})

//通过值的有无来判断是否可以发送消息
textarea.addEventListener("keyup",(e)=>{
    // console.log(e.key == "Enter")
    let textValue = e.currentTarget.value.trim()
    if(textarea.value.includes("\n") || textValue){
        sendBtn.classList.add("active")

    }else{
        sendBtn.classList.remove("active")

    }
    
    // if(textValue && e.key == "Enter" && !e.Shiftkey && window.innerWidth > 620){
    //     console.log(1)
    //     sendBtn.click()
    // }


})

//显示/隐藏提示框
emptyOver.addEventListener("click",()=>{
    emptyOver.classList.toggle("active")
})

//关闭提示框
function closeOver(){
    emptyOver.click()
}

//我方发送消息
sendBtn.addEventListener("click",(e)=>{
    //阻止链接跳转
    e.preventDefault()
    let message = textarea.value.replace("\n","<br/>").trim();
    if(!textarea.value.trim()){
        emptyOver.click()
        return
    }
    chatMessages.push({account:"root",icon:"fa-skull-crossbones",message})
    localStorage.setItem("message-list",JSON.stringify(chatMessages))


    sendBtn.classList.remove("active")
    showMessage()

    message = message.replace("<br/>","\n")
    fetchData(message)


})

//渲染消息
function showMessage(){
    let liTag = "";
    chatMessages.forEach((chatMessage,id)=>{
        
        let rootClass = chatMessage.account == "root" ? "root-message" :""
        
        liTag += `<li class="chat-message ${rootClass}">
                <i class="fa-solid ${chatMessage.icon}"></i>
                <p class="message" id=${id}>${chatMessage.message}</P>
            </li>`
    })
    // chatList.insertAdjacentHTML("beforeend",liTag)
    chatList.innerHTML = liTag

    chatList.scrollTop = chatList.scrollHeight


}


showMessage()


// 机器人回复
async function fetchData(message){
    let randomId = Math.floor(Math.random()*500+1)

    const url = `https://jsonplaceholder.typicode.com/comments/${randomId}`
    
    try{
        textarea.value = "in thinking..."
        let response = await fetch(url)
        console.log(response)
        if(response.ok){
            let data = await response.json()

            chatMessages.push({account:"robot",icon:"fa-robot",message:data.body})
            localStorage.setItem("message-list",JSON.stringify(chatMessages))
            showMessage()
            // textarea.value = ""
        }
        
        
    }catch(err){
        // textarea.value = ""
        console.log(err,"error")
    }

    textarea.value = ""
    textarea.focus()

}

