const passwordInput = document.querySelector(".input-box input"),
copyIcon = document.querySelector(".input-box .fa-copy"),
passIndicator = document.querySelector(".pass-indicator"),
lengthSlider = document.querySelector(".pass-length input[type='range']"),
options = document.querySelectorAll(".option input"),
generateBtn = document.querySelector(".generate-btn");


const characters = { // object of letters, numbers & symbols
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~"
}





// //点击按钮生成随机密码
// generateBtn.addEventListener("click",()=>{
//     options.forEach(option=>{
//         //筛选出选中的复选框
//         if(option.checked){
            
//             if(option.id === "exc-duplicate" || option.id === "spaces"){

//             }else{
//                 charSource.push(characters[option.id].split(""))
//             }
//         }
//     })
// })


//生成随机密码
function generatePassword(){
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;

    

    options.forEach(option=>{
        if(option.checked){ 
            if(option.id !== "exc-duplicate" && option.id !== "spaces"){
                staticPassword += characters[option.id]
            }else if(option.id === "exc-duplicate"){
                //排除重复的
                excludeDuplicate = true
            }else{
                staticPassword += `   ${staticPassword}   `;
            }
        }
    })

    for(let i = 0;i<passLength;i++){
        let randomChar = staticPassword[Math.floor(Math.random()*staticPassword.length)]
        if(excludeDuplicate){
            // 空格可以重复，其它字符不可以
            //否则本次遍历无效
            if(!randomPassword.includes(randomChar) || randomChar == " "){
                randomPassword += randomChar
            }else{
                i--;
            }
        }else{
            randomPassword += randomChar
        }
    }

    passwordInput.value = randomPassword;
}

// let str = ""

// console.log(str[0],"str")


function updateIndicator(){
    passIndicator.id = lengthSlider.value > 16 ? "strong" : lengthSlider.value > 8 ? "medium" : "weak";
}

function updateSlider(){
    document.querySelector(".pass-length span").innerText = lengthSlider.value
    generatePassword()
    updateIndicator()
}
updateSlider()

function copyPsaaword(){
    navigator.clipboard.writeText(passwordInput.value)
    copyIcon.classList.replace("fa-copy","fa-check")
    copyIcon.style.color = "#4285f4";
    setTimeout(()=>{
        copyIcon.classList.replace("fa-check","fa-copy")
        copyIcon.style.color = "#707070"
    },1500)
}

lengthSlider.addEventListener("input",updateSlider)
copyIcon.addEventListener("click",copyPsaaword)
generateBtn.addEventListener("click",generatePassword)


