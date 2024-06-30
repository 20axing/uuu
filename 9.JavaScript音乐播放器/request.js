const url = "https:\/\/api.uomg.com\/api\/rand.music"
let urls = [];
let allMusic = []
for(let i=0;i<3;i++){
    urls.push(url)
}

let requests = urls.map(async url=>{
    let response = await fetch(url,{
        method:"post",
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body:"sort=热歌榜&format=json"
    })
    return await response.json()
}) 

console.log(requests)
async function promiseAll(){
    let responses = await Promise.all(requests)
    for(let response of responses){
        if(response.code == 1) allMusic.push(response.data)
    }
console.log(allMusic)
}
promiseAll()


// export {allMusic}




