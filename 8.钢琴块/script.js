const sliderInput = document.querySelector(".volume-slider input"),
checkboxInput = document.querySelector(".keys-checkbox input"),
pianoKeys = document.querySelectorAll(".key");

const audio = new Audio("./tunes/a.wav")
const allKeys = [];
// pianoKeys.forEach(piano=>{
//     document.documentElement.addEventListener("keyup",(e)=>{
//         if(e.key == piano.dataset.key){
//             piano.click()
//         }
//     })
//     piano.addEventListener("click",(e)=>{
//         let audio = new Audio(`./tunes/${e.currentTarget.dataset.key}.wav`)
//         audio.play()
//     })
    
// })

pianoKeys.forEach(piano=>{
    
    //添加按键编码
    allKeys.push(piano.dataset.key)

    //为每个piano添加点击事件
    piano.addEventListener("click",()=>{
        playTune(piano.dataset.key)

        
    })

})

//播放音频
function playTune(key){
    audio.src = `./tunes/${key}.wav`
    audio.play()

    let clickedKey = document.querySelector(`[data-key=${key}]`)
    //使用css样式设置点击效果
    clickedKey.classList.add("active");

    //300ms后移除点击效果
    setTimeout(()=>{
        clickedKey.classList.remove("active")
    },300)
}

function pressedKey(e){
    if(allKeys.includes(e.key)){
        playTune(e.key)
    }
}


//显示隐藏span
checkboxInput.addEventListener("click",()=>{
    pianoKeys.forEach(piano=>piano.classList.toggle("hide"))
})

//调节音量
sliderInput.addEventListener("change",(e)=>{
    audio.volume = e.currentTarget.value;
})


document.documentElement.addEventListener("keydown",pressedKey)


