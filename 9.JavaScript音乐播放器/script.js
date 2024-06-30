import { promiseMusic,allMusic } from "./music-list.js"

// import { allMusic } from "./music-list.js";

await promiseMusic()
console.log(allMusic,"allMusic")
const wrapper = document.querySelector(".wrapper"),
musicImg = document.querySelector(".img-area img"),
musicName = document.querySelector(".song-details .name"),
musicArtist = document.querySelector(".song-details .artist"),
progressArea = document.querySelector(".progress-area"),
progressBar = document.querySelector(".progress-bar"),
mainAudio = document.querySelector("#main-audio"),
prevBtn = document.querySelector("#prev"),
playPauseBtn = document.querySelector(".play-pause"),
nextBtn = document.querySelector("#next"),
moreMusicBtn = document.querySelector("#more-music"),
musicList = document.querySelector(".music-list"),
closemoreMusic = document.querySelector("#close");



/* allMusic itemObj:name、url、picurl、artistsname */
// await setTimeout(()=>{
//     console.log("hello")
//     console.log(allMusic)
// },3000)
// for(let key in allMusic){
//     console.log(key,"key")
// }

// function clicked(elem){
//     alert(elem)
// }

let musicIndex = Math.floor(Math.random()*allMusic.length) + 1;
//初始时，歌曲处于暂停状态
let isMusicPaused = true;


//在Dom加载完毕且其所依赖的资源（样式,脚本，图片，音频，视频...）加载完毕之后触发
window.addEventListener("load",()=>{
    loadMusic(musicIndex)
    playingSong()

})

const urlTag = musicList.querySelector("ul")

//根据allMusic长度创建li标签
for(let i = 0;i<allMusic.length;i++){
    
    // let liTag = `<li li-index="${i + 1}">
    //                 <div class="row">
    //                     <span>${allMusic[i].name}</span>
    //                     <P>${allMusic[i].artistsname}</P>
    //                 </div>
    //                 <span id="${allMusic[i].url}" class="audio-duration">0:00</span>
    //                 <audio class="${allMusic[i].url}" src="${allMusic[i].url}"></audio>
    //             </li>`;
    // urlTag.insertAdjacentHTML("afterbegin",liTag)

    const liTag = document.createElement("li")
    liTag.setAttribute("li-index",`${i+1}`)
    let liContent = `
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <P>${allMusic[i].artistsname}</P>
                    </div>
                    <span id="${allMusic[i].url}" class="audio-duration">0:00</span>
                    <audio class="${allMusic[i].url}" src="${allMusic[i].url}"></audio>
                `;
    
    liTag.insertAdjacentHTML("beforeend",liContent)
    
    urlTag.appendChild(liTag)



    // liTag.setAttribute("onclick","clicked(this)")
    // liTag.addEventListener("click",(e)=>clicked(e.currentTarget))


    // console.log(urlTag.querySelector(`#${allMusic[i].name}`))
    let audioTag = liTag.querySelector(`audio`)
    console.log(audioTag,"audioTag")
    let spanTag = liTag.querySelectorAll(`span`)[1]
    console.log(spanTag,"spanTag")

    audioTag.addEventListener("loadeddata",()=>{
        let audioDuration = audioTag.duration;
        console.log("xxx",audioDuration)
        let totalMin = Math.floor(audioDuration / 60)
        let totalSec = Math.floor(audioDuration % 60)
        if(totalSec <= 9){
            totalSec = `0${totalSec}`
        }

        let totalDuration = `${totalMin}:${totalSec}`
        console.log("xxx",totalDuration)

        spanTag.innerText = totalDuration
        spanTag.setAttribute("t-duration",totalDuration)
    })
}

prevBtn.addEventListener("click",()=>{
    musicIndex--;
    if(musicIndex < 1) musicIndex = allMusic.length
    
    loadMusic(musicIndex);
    //播放音乐
    playMusic()

    playingSong()
    
})

nextBtn.addEventListener("click",()=>{
    musicIndex++;
    if(musicIndex > allMusic.length) musicIndex = 1
    
    loadMusic(musicIndex);
    //播放音乐
    playMusic()

    playingSong()
    
})

playPauseBtn.addEventListener("click",()=>{
    isMusicPaused === true ? playMusic() : pauseMusic() 
})

moreMusicBtn.addEventListener("click",()=>{
    musicList.classList.toggle("show")
})
closemoreMusic.addEventListener("click",()=>{
    musicList.classList.toggle("show")
})

// mainAudio.addEventListener("loadeddata",()=>{
//     document.querySelector(".max-duration").innerText = mainAudio.duration;
// })

// 未播放时timeupdate无法获取已选中的歌曲总时长
// 加载未播放时的样式
mainAudio.addEventListener("loadeddata",()=>{
    const MusicDuratiion = document.querySelector(".max-duration");
    let mainAudioDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAudioDuration/60);
    let totalSec = Math.floor(mainAudioDuration%60)
    if(totalSec <= 9){
        totalSec = `0${totalSec}`
    } 

    MusicDuratiion.innerText = `${totalMin}:${totalSec}`
})

//根据歌曲播放时长改变进度条宽度
mainAudio.addEventListener("timeupdate",(e)=>{
    const MusicCurrentTime = document.querySelector(".current-time");
    

    let currentTime = e.currentTarget.currentTime,//获取歌曲当前时间
    duration = e.currentTarget.duration;//获取歌曲总时长

    // console.log(duration,"duration")

    progressBar.style.width = `${(currentTime / duration).toFixed(2)*100}%`;

    let currentMin = Math.floor(currentTime/60);
    let currentSec = Math.floor(currentTime%60)
    if(currentSec <= 9){
        currentSec = `0${currentSec}`
    }

    MusicCurrentTime.innerText = `${currentMin}:${currentSec}`

    if(mainAudio.currentTime == mainAudio.duration){
        pauseMusic()
    }
})

//点击改变进度条宽度
//根据进度条宽度改变播放歌曲currentTime
progressArea.addEventListener("click",(e)=>{
    let clickedOffsetX = e.offsetX;
    let progressWidth = progressArea.clientWidth;
    if(e.offsetX < 0) e.offsetX = 0

    let songDuration = mainAudio.duration;
    mainAudio.currentTime = (clickedOffsetX / progressWidth).toFixed(2) * songDuration
    playMusic()
})


// 加载歌曲信息
function loadMusic(){
    let music = allMusic[musicIndex - 1]
    musicImg.src = music.picurl;
    musicName.innerText = music.name;
    musicArtist.innerText = music.artistsname
    mainAudio.src = music.url 
}



//播放音乐
function playMusic(){
    isMusicPaused = false
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").classList.replace("fa-play","fa-pause")
    
    mainAudio.play()
}

// 暂停音乐
function pauseMusic(){
    isMusicPaused = true
    wrapper.classList.add("paused")
    playPauseBtn.querySelector("i").classList.replace("fa-pause","fa-play")
    mainAudio.pause()
}

// function createMusicHTML(music){
//     const li = `<li>
//                     <div class="row">
//                         <span>${music.name}</span>
//                         <P>${music.artistsname}</P>
//                     </div>
//                     <span class="audio-duration">0:00</span>
//                 </li>`;
//     musicList.querySelector("ul").insertAdjacentHTML("beforeend",li)
// }

//为正在播放的音乐添加特定样式
//点击li标签播放音乐
function playingSong(){
    let lis = musicList.querySelectorAll("li");
    lis.forEach(li=>{
        let spanTag = li.querySelector(".audio-duration")

        if(li.classList.contains("playing")){
            let adDuration = spanTag.getAttribute("t-duration")
            spanTag.innerText = adDuration;
        }
        //为选中歌曲添加特定类
        li.classList.remove("playing")
        if(li.getAttribute("li-index") == musicIndex){
            li.classList.add("playing")
            spanTag.innerText = "Playing"
        }

        // li.setAttribute("onclick","clicked(this)")
        li.addEventListener("click",(e)=>clicked(e.currentTarget))
    })

    
}

//点击播放歌曲
function clicked(elem){
    console.log(elem.getAttribute('li-index'))

    let selectedIndex = +elem.getAttribute("li-index")
    console.log(selectedIndex,`musicIndex=${musicIndex}`)

    if(selectedIndex == musicIndex) return

   
    musicIndex = selectedIndex
    

    console.log(`musicIndex=${musicIndex}`)
    //加载当前歌曲信息
    loadMusic()
    // 播放当前歌曲
    playMusic()

    playingSong()
}