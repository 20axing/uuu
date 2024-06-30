// To add more song, just copy the following code and paste inside the array

//   {
//     name: "Here is the music name",
//     artist: "Here is the artist name",
//     img: "image name here - remember img must be in .jpg formate and it's inside the images folder of this project folder",
//     src: "music name here - remember img must be in .mp3 formate and it's inside the songs folder of this project folder"
//   }

//paste it inside the array as more as you want music then you don't need to do any other thing

/* async function loadMusic(asy){
  // fetch("https://api.uomg.com/api/rand.music",{
  //   method:"post",
  //   headers: {
  //     "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  //   },
  //   body:"sort=热歌榜&format=json"
  // }).then(response=>{
  //   return response.json()
  // }).then(data=>{
  //   if(data.code === 1){
  //     console.log(data.data)
  //     return data.data
  //   }
  // })

  alert(asy)
  const url = "https://api.uomg.com/api/rand.music"
  try{
    let response = await fetch(url,{
      method:"post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body:"sort=热歌榜&format=json"
    })
    console.log(url,"1")
    await response.json()
    return response.data
  }catch(err){
    console.log("Request Failed",err)
  }
  console.log(url,"2")

} */


let urls = []
let allMusic = []
for(let i = 0;i<6;i++){
  urls.push("https://api.uomg.com/api/rand.music")
}

let requests = urls.map(url=>fetch(url,{
  method:"post",
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  body:"sort=热歌榜&format=json"
}).then(async response=> await response.json()))

console.log(requests,"reqs")

async function promiseMusic(){
  await Promise.all(requests).then(responses=>{
    console.log(responses,"responses")
    responses.forEach(response=>{
      if(response.code == 1) {
        response.data.url = response.data.url.replaceAll("/","\\/")
        allMusic.push(response.data)
      }
    })
  }).catch(err=>{
    console.log(err,"err")
  })

}

export {allMusic,promiseMusic}

// const requests = arr.map(()=> fetch("https://api.uomg.com/api/rand.music",{
//   method:"post",
//   headers: {
//     "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//   },
//   body:"sort=热歌榜&format=json"
// }))
// console.log(arr,"Arr")
// console.log(requests,"requests")



/* export let allMusic = [
  {
      "name": "爱人错过",
      "url": "http://music.163.com/song/media/outer/url?id=1368754688",
      "picurl": "http://p1.music.126.net/5JLQMl8xASllDubCWb9WHw==/109951164111703663.jpg",
      "artistsname": "告五人"
  },
  {
      "name": "像我这样的人",
      "url": "http://music.163.com/song/media/outer/url?id=569213220",
      "picurl": "http://p1.music.126.net/vmCcDvD1H04e9gm97xsCqg==/109951163350929740.jpg",
      "artistsname": "毛不易"
  },
  {
      "name": "罗生门（Follow）",
      "url": "http://music.163.com/song/media/outer/url?id=1456890009",
      "picurl": "http://p2.music.126.net/yN1ke1xYMJ718FiHaDWtYQ==/109951165076380471.jpg",
      "artistsname": "梨冻紧"
  },
  {
      "name": "苦茶子",
      "url": "http://music.163.com/song/media/outer/url?id=1922888354",
      "picurl": "http://p2.music.126.net/VjXYNoGC3lXajZDs0r35XQ==/109951167852652412.jpg",
      "artistsname": "Starling8"
  },
  {
      "name": "晚安",
      "url": "http://music.163.com/song/media/outer/url?id=1359356908",
      "picurl": "http://p1.music.126.net/8N1fsMRm2L5HyZccc6I3ew==/109951164007377169.jpg",
      "artistsname": "颜人中"
  },
  {
      "name": "我只能离开",
      "url": "http://music.163.com/song/media/outer/url?id=1398283847",
      "picurl": "http://p1.music.126.net/5GPFbTQU-kW57PGv_7LeBw==/109951164440649436.jpg",
      "artistsname": "颜人中"
  }
] */