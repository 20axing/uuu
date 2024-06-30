const typingInput = document.querySelector(".typing-input")
inputs = document.querySelector(".inputs"),
hintTag = document.querySelector(".details .hint span"),
guessLeft = document.querySelector(".details .guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
resetBtn = document.querySelector(".reset-btn");

/* let word;
//加载题目及其相关描述
function loaderQuestion(){
    const question = wordList[Math.floor(Math.random()*wordList.length)]
    for(let key in question){
        if(key === "word"){
            word = question[key]
            for(let i = 0; i < word.length;i++){
                const input = document.createElement("input")
                input.setAttribute("disabled",true)
                inputs.appendChild(input)
            } 
        }else{
            //key === "hint"
            hintTag.innerText = question[key]
        }
    }
    document.documentElement.addEventListener("keydown",()=>typingInput.focus())

    
}

loaderQuestion()

typingInput.addEventListener("input",(e)=>{
    
    const char = e.currentTarget.value
    console.log(char)
    let letter = word
    if(letter.includes(char)){
        let idx = word.indexOf(char);
        inputs.querySelectorAll("input")[idx].setAttribute("value",char)

        // console.log(word,"before")
        word = word.split("")
        word.splice(idx,1)
        word = word.join("").sp

        // console.log(word,"word")
         
    }

    e.currentTarget.value = ""
}) */


wordList = [{
    word: "google",
    hint: "famous search engine"
}]

let word,maxGuess,incorrectLetters = [],correctLetters = [];

let charIndex = 0;

//加载随机单词
function randomWord(){
    charIndex = 0
    incorrectLetters.length = 0
    let randomIndex = Math.floor(Math.random()*wordList.length);
    word = wordList[randomIndex].word;
    console.log(word)
    maxGuess = word.length > 4 ? 8 : 6;

    guessLeft.innerText = maxGuess;

    hintTag.innerText = wordList[randomIndex].hint;

    wrongLetter.innerText = incorrectLetters;

    inputs.innerHTML = ""
    for(let i = 0;i<word.length;i++){
        const input = document.createElement("input")
        
        inputs.appendChild(input)
    }


}

randomWord()


// function initGame(e){
//     const char = e.currentTarget.value.toLowerCase()
//     console.log(char,"char")
//     if(char.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${char}`) && !correctLetters.includes(char)){
//         if(word.includes(char)){
//             for(let i = 0;i<word.length;i++){
//                 if(word[i] === char){
//                     correctLetters.push(char)
//                     inputs.querySelectorAll("input")[i].value = char
//                 }
//             }
//         }else{
//             maxGuess--;
//             incorrectLetters.push(` ${char}`)
//         }
//         guessLeft.innerText = maxGuess;
//         wrongLetter.innerText = incorrectLetters;

//     }

//     typingInput.value = ""
    
//     setTimeout(()=>{
//         if(maxGuess<1){
//             alert("失败")
//             //显示答案
//             for(let i = 0;i<word.length;i++){
//                 inputs.querySelectorAll("input")[i].value = word[i] 
//             }
//             // 禁用输入框
//             typingInput.hidden = true
//         }else if(correctLetters.length === word.length){
//             alert("挑战成功,开始新一轮游戏")
//             return randomWord()
//         }
//     },100)
// }

function initGame(e){
    const char = e.currentTarget.value.toLowerCase()
    if(!char.match(/^[A-Za-z]+$/)){
        alert("只能输入26个大小写字母")
    }else if(!incorrectLetters.includes(` ${char}`)){
        if(word.includes(char)){
            if(word[charIndex] === char){
                inputs.querySelectorAll("input")[charIndex].value = char
                charIndex++;
            }else{
                maxGuess--;
            }
            
        }else{
            maxGuess--;
            incorrectLetters.push(` ${char}`)
            
        }

        guessLeft.innerText = maxGuess;
        wrongLetter.innerText = incorrectLetters; 
    }

    typingInput.value = ""

    setTimeout(()=>{
        if(charIndex === word.length){
            alert("挑战成功，开始新一轮游戏吧")
            return randomWord()
        }else if(maxGuess < 1){
            alert("失败")
            for(let i = 0;i<word.length;i++){
                inputs.querySelectorAll("input")[i].value = word[i]
            }
            typingInput.hidden = true
        }
    },100)
}

document.documentElement.addEventListener("click",()=>typingInput.focus())
document.documentElement.addEventListener("keydown",()=>typingInput.focus())
typingInput.addEventListener("input",initGame)
resetBtn.addEventListener("click",randomWord)