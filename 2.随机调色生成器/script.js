const container = document.querySelector(".container")
const refreshBtn = document.querySelector(".refresh-btn")

const maxPaletteBoxes = 32;

function generatePalette(){
    container.innerHTML = ""//清空容器
    for(let i = 0; i < maxPaletteBoxes;i++){
        let randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
        randomHex = `#${randomHex.padStart(6,"0")}`
        const li = document.createElement("li");
        li.classList.add("color")
        li.innerHTML = `<div class="rect-box" style="background:${randomHex}"></div>
            <span class="hex-value">${randomHex}</span>`

        li.addEventListener("click",()=>{
            copyColor(li,randomHex)
        })
        
        container.append(li)
    }

}


generatePalette()


function copyColor(elem,colorText){
    const colorElem = elem.querySelector(".hex-value")
    navigator.clipboard.writeText(colorText).then(
        ()=>{
            colorElem.innerText = "Copied";
            setTimeout(()=>{
                colorElem.innerText = colorText
            },1000)
        },
        ()=>{
            alert("Failed to copy the color code!")
        }
    )
}

refreshBtn.addEventListener("click",generatePalette)