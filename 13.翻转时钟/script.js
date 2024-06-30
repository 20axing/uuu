class FlipClock{
    constructor(){
        this.main = document.querySelector("main")

        this.resetClock()
        
    }
    getTimes(){
        this.nums = new Date()
            .toLocaleTimeString()
            .replaceAll(":","")
            .split("")
            .map((n)=>+n)

    }
    resetClock(){
        this.getTimes()
        this.createClockSection()
        this.getSections()
        console.log(this.sections,"sections")

        setInterval(()=>{
            this.getTimes()
            this.watchClockSection()
        },100)
        
    }
    getSections(){
        this.sections = Array.from(this.main.querySelectorAll("section")).map(section=>{
            return section.querySelectorAll("div")
        })
    }
    createClockSection(){
        let sectionTag = ""
        this.nums.forEach((num,index)=>{
            sectionTag += `<section>
                <div data-before=${num} data-after=${ +num + 1 > 9 ? 0 :+num + 1}></div>
                <div data-before=${num} data-after=${+num + 1 > 9 ? 0 :+num + 1}></div>
            </section>`
            if(index != this.nums.length-1 && index%2){
                sectionTag += `<p class="colon">:</P>`
            }
        })
        this.main.innerHTML = sectionTag
    }
    watchClockSection(){
        
        // this.main.querySelectorAll("section").forEach((section,index)=>{
        //     const divs  = section.querySelectorAll("div")
        //     divs.forEach(div=>{
        //         if(this.nums[index] != div.dataset.before){
        //             divs[1].classList.add("flip")
        //             divs[1].addEventListener("animationend",()=>{
        //                 div.dataset.before = this.nums[index] 
        //                 switch(index){
        //                     case 0:
        //                         div.dataset.after = this.nums[index] + 1 > 2 ? 0 : this.nums[index] + 1
        //                         break;
        //                     case 2:
        //                         div.dataset.after = this.nums[index] + 1 > 5 ? 0 : this.nums[index] + 1
        //                         break;
        //                     case 4:
        //                         div.dataset.after = this.nums[index] + 1 > 5 ? 0 : this.nums[index] + 1
        //                         break;
        //                     default:
        //                         div.dataset.after = this.nums[index] + 1 > 9 ? 0 : this.nums[index] + 1
        //                         break;

        //                 }
                        
        //                 divs[1].classList.remove("flip")

        //             })
                    
        //         }
        //     })
            
        // })

        // this.nums.forEach((num,index)=>{
        //     this.sections[index].forEach(div=>{
        //             if(num != div.dataset.before){
                        

        //                 div.classList.add("flip")
        //                 div.addEventListener("animationend", (event) => {

        //                     this.sections[1].dataset.before = num;
        //                 this.sections[1].dataset.after = num + 1;
        //                     div.classList.remove("flip")
        //                 });
        //             }
                
                

        //     })

        // })
        this.sections.forEach((divs,index)=>{
            divs.forEach(div=>{
                
                if(div.dataset.before != this.nums[index]){
                    
                    div.classList.add("flip")
                    div.addEventListener("animationend",()=>{
                        divs.forEach(div=>{
                            div.dataset.before = this.nums[index]
                    
                    div.dataset.after = this.nums[index] + 1
                    switch(index){
                        case 0:
                            div.dataset.after = this.nums[index] + 1 > 2 ? 0 : this.nums[index] + 1
                            break;
                        case 2:
                            div.dataset.after = this.nums[index] + 1 > 5 ? 0 : this.nums[index] + 1
                            break;
                        case 4:
                            div.dataset.after = this.nums[index] + 1 > 5 ? 0 : this.nums[index] + 1
                            break;
                        default:
                            div.dataset.after = this.nums[index] + 1 > 9 ? 0 : this.nums[index] + 1
                            break;
                    }
                        })
                        div.classList.remove("flip")
                    })
                }
            })
        })
    }
}


let clockNum = new FlipClock()

console.log(clockNum.nums)