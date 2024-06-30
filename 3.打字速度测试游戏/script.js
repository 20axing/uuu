/* const p = document.querySelector("P")

const textContent = p.textContent.trim().split("")
console.log(textContent)


p.innerHTML = "";

textContent.forEach((char,index)=>{
    const uniqueIdentifier = Date.now() + idx;

    createtextHTML(char,uniqueIdentifier)
})


function createtextHTML(text,uniqueIdentifier){
    const span = document.createElement("span")
    span.innerText = text
    span.id = `span-${uniqueIdentifier}`
    p.append(span)
    
}

let i = 0
document.documentElement.addEventListener("keyup",(e)=>{
    if(i<textContent.length && e.key !== "Shift"){
        typing(e.key,i)
        i++;
    }
    return
    
})

function typing(char,idx){
    if(char == textContent[idx]){
        console.log(true,idx)
        
    }else{
        console.log(false,idx)
    }
    console.log(char,"char")

} */

const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"); 




let timer,
maxTime = 60,
timeLeft = maxTime,
//charIndex：输入的字数
charIndex = mistakes = isTyping = 0;

function loadParagraphs(){
    
    typingText.innerHTML = ""//清空typingText中的内容
    const ranIndex = Math.floor(Math.random() * paragraphs.length)

    console.log(paragraphs[ranIndex])

    paragraphs[ranIndex].split("").forEach((char)=>{
        const span = document.createElement("span")
        span.innerHTML = char
        typingText.append(span)
    })
    typingText.querySelectorAll("span")[0].classList.add("active")

    document.documentElement.addEventListener("keydown",()=>{
        console.log('down')
        inpField.focus()
    })
    typingText.addEventListener("click",()=>{
        inpField.focus()
    })

}

// function initTyping(value){
//     console.log(value.split("")[charIndex])
//     if(value.split("")[charIndex] == null){
//         console.log("hh")
//     }
    
//     const prevIndex = charIndex;

    
    
//     charIndex++;
//     if(value[value.length-1] == typingText.querySelectorAll("span")[prevIndex].innerText){
//         typingText.querySelectorAll("span")[prevIndex].classList.add("correct")
//     }else{
//         typingText.querySelectorAll("span")[prevIndex].classList.add("incorrect")
//     }
//     typingText.querySelectorAll("span")[prevIndex].classList.remove("active")
//     typingText.querySelectorAll("span")[charIndex].classList.add("active")

//     if(timer) return
//     timer = setInterval(()=>{
//         maxTime--;
//         timeLeft = maxTime;
//         timeTag.innerText = timeLeft
//     },1000)

//     if(!timeLeft){
//         clearInterval(timer)
//     }


    
// }

function initTyping(){
    const spans = typingText.querySelectorAll("span");
    const typeChar = inpField.value.split("")[charIndex]
    if(charIndex < spans.length - 1 && timeLeft > 0){
        console.log("hello",inpField.value)
        if(!isTyping){
             timer = setInterval(()=>{
                 initTime()
             },1000)
             isTyping = true
        }
        if(typeChar == undefined){//用户按删除键的情况
            if(charIndex>0){
                charIndex--;
                if(spans[charIndex].classList.contains("incorrect")){
                    mistakes--;
                }
                spans[charIndex].classList.remove("correct","incorrect")

            }
            
        }else{//正常输入的情况
            //输入正确
            console.log(typeChar,"hello")
            if(typeChar === spans[charIndex].innerText){
                spans[charIndex].classList.add("correct")
            }else{
                mistakes++
                spans[charIndex].classList.add("incorrect")
            }
            charIndex++;
            

        }
        spans.forEach(span=>span.classList.remove("active"))
        spans[charIndex].classList.add("active")

        let wpm = Math.round(((charIndex-mistakes)/5)/(maxTime - timeLeft)*60)
        wpmTag.innerText = wpm
        mistakeTag.innerText = mistakes
        cpmTag.innerText = charIndex - mistakes;


        
    }else{
        clearInterval(timer)
        inpField.value = ""

    }

}

function initTime(){
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex-mistakes)/5)/(maxTime - timeLeft)*60)
        wpmTag.innerText = wpm
    }else{
        clearInterval(timer)
    }
}

function restGame(){
    if(timer){
        clearInterval(timer)
        timer = null;
    }
    loadParagraphs()
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = wpmTag.innerText = cpmTag.innerText = 0;
    inpField.value = ""

}

loadParagraphs()

inpField.addEventListener("input",(event)=>{
    console.log(event.target.value,"value")
    initTyping()
})

tryAgainBtn.addEventListener("click",restGame)