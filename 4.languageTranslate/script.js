const selectTag = document.querySelectorAll(".row select"),
fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
icons = document.querySelectorAll(".row i"),
translateBtn = document.querySelector("button"),
exchangeIcon = document.querySelector(".exchange");

//动态添加select选项
selectTag.forEach(select=>{
    for(let key in countries){
        let option = new Option(countries[key],key)
        select.appendChild(option)
    }
})



icons.forEach(icon=>{
    icon.addEventListener("click",({target})=>{

        if(!fromText.value && !toText.value) return
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                navigator.clipboard.writeText(fromText.value)
            }else{
                navigator.clipboard.writeText(toText.value)
            }
        }
        if(target.classList.contains("fa-volume-high")){
            let synthUtterance;
            if(target.id == "from"){
                synthUtterance= new SpeechSynthesisUtterance(fromText.value);
                synthUtterance.lang = selectTag[0].value
            }else{
                synthUtterance = new SpeechSynthesisUtterance(toText.value);
                synthUtterance.lang = selectTag[1].value
            }
            window.speechSynthesis.speak(synthUtterance);
           
        }
    })
})

//交换文本
exchangeIcon.addEventListener("click",()=>{
    let text,textLang;
    text = fromText.value;
    fromText.value = toText.value;
    toText.value = text;

    textLang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = textLang;
})


//重新输入时，清除上一次翻译的结果
fromText.addEventListener("click",()=>{
    if(!fromText.value){
        toText.value = ""
    }
})


translateBtn.addEventListener("click",()=>{
    const translateText = fromText.value.trim();
    const translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;

    // 当未输入文本时，不发送翻译请求
    if(!translateText) return

    toText.setAttribute("placeholder","Translating...")

    let apiUrl = `https://api.mymemory.translated.net/get?q=${translateText}&langpair=${translateFrom}|${translateTo}`;

    fetch(apiUrl).then((response)=>{
        if(response.ok){
            // return response.text()
            console.log(response,'data')
            return response.json()
        }
        return fromText.value
    }).then(data=>{
        console.log(data)
        toText.value = data.responseData.translatedText;
        
        toText.setAttribute("placeholder","Transition")
    })
    
})
