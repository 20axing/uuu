const container = document.querySelector(".container"),
inputPart = document.querySelector(".input-part"),
infoTxt = document.querySelector(".message"),
inputField = document.querySelector(".input-field input"),
localtionBtn = document.querySelector("button"),
weatherPart = document.querySelector(".weather-part"),
wIcon = weatherPart.querySelector("img"),
arrowBack = document.querySelector("header i");

let api;



//获取Geolocation接口对象
const geolocation = navigator.geolocation;



//用户自定义输入城市名
inputField.addEventListener("keyup",(e)=>{
    let value = e.currentTarget.value.trim();
    if(e.key === "Enter" && value){
        requestApi(value)
    }

})

//设备定位获取城市名
localtionBtn.addEventListener("click",(e)=>{
    console.log("click btn")
    //阻止跳转链接
    e.preventDefault()
    if(!geolocation){
        alert("浏览器不支持navigator.geolocation")
        return
    }
    // geolocation.getCurrentPosition(position=>{
    //     console.log(position,"success")
    //     controlMessage("Getting weather details...")
    // },error=>{
    //     console.log(error,"faild")
    //     if(error.code == 1){
    //         controlMessage(error.message)
    //     }
    // });
    geolocation.getCurrentPosition(onSuccess,onFiled)
})


function onSuccess(position){
    console.log(position,"podition")
    let {latitude:lat,longitude:lon} = position.coords
    console.log(lat,lon)
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dd96c35718c96c05548b1cd378092e1c&lang=zh_tw`
    
    
    fetchData()
    

}
function onFiled(err){
    console.log(err,"err")
    // controlMessage(err.message)
    infoTxt.innerHTML = err.message;
    infoTxt.classList.add("error")
}



//控制提示文本的显示与隐藏
function controlMessage(text){
    if(text == "Getting weather details..."){
        infoTxt.classList.remove("error")
        infoTxt.classList.add("pending")
    }else{
        infoTxt.classList.remove("pending")
        infoTxt.classList.add("error")
    }
    infoTxt.innerText = text

    infoTxt.style.display = "block"
}


let timer;
//请求某一城市的天气
function requestApi(cityName){
    // dd96c35718c96c05548b1cd378092e1c
    api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=dd96c35718c96c05548b1cd378092e1c&lang=zh_tw`

    infoTxt.innerText = "正在搜索城市..."
    infoTxt.classList.add("pending")

    clearTimeout(timer)
    timer = setTimeout(()=>{
        
        fetchData()
    },2000)
    
    

}

// 发起请求
async function fetchData(){
    try{
        // controlMessage("Getting weather details...")
        infoTxt.innerText = "Getting weather details..."
        infoTxt.classList.add("pending")

        let response = await fetch(api)
        let data = await response.json()
        weatherDetails(data)
        

        console.log(data,"data")
    console.log(response,"response")
    }catch(err){
        console.log(err,"请求天气数据发生错误")
        // infoTxt.innerText = 
        for(let key in err){
            console.log("key")
        }

    }
}

// 渲染WeatherApp数据
async function weatherDetails(data){
    const city = data.name;
    const country = data.sys.country;
    const {description,id} = data.weather[0];
    const {feels_like,humidity,temp} = data.main;



    if(id == 800){
        wIcon.src = "icons/clear.svg";
    }else if(id >= 200 && id <= 232){
        wIcon.src = "icons/storm.svg";  
    }else if(id >= 600 && id <= 622){
        wIcon.src = "icons/snow.svg";
    }else if(id >= 701 && id <= 781){
        wIcon.src = "icons/haze.svg";
    }else if(id >= 801 && id <= 804){
        wIcon.src = "icons/cloud.svg";
    }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
        wIcon.src = "icons/rain.svg";
    }

    await new Promise((resolve,reject)=>{
        wIcon.onload = resolve
        wIcon.onerror = function(){
            console.log(`无法获取${wIcon.src}`)
            reject()
        }
    })
    

    weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp)/10;
    weatherPart.querySelector(".weather").innerText = description
    weatherPart.querySelector(".location span").innerText = `${city},${country}`;
    weatherPart.querySelector(".details .temp .num-2").innerText = Math.floor(feels_like)/10;
    weatherPart.querySelector(".details>span").innerText = `${humidity}%`;

    // 重置inputPart样式
    infoTxt.classList.remove("error","pending")
    infoTxt.innerText = ""
    // infoTxt.style.display = "none";
    inputField.value = ""
    container.classList.add("active")


    

}



arrowBack.addEventListener("click",()=>{
    container.classList.remove("active");
})

