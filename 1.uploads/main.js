const fileCompletedStatus = document.querySelector(".file-completed-status"),
    fileList = document.querySelector(".file-list"),
    fileBrowseBtn = document.querySelector(".file-browse-button"),
    fileBrowseInput = document.querySelector(".file-browse-input"),
    fileUploadBox = document.querySelector(".file-upload-box");

let loadedFiles = 0
let totalFiles = 0

//为每一个上传的文件创建html
function createFileItem(file,uniqueIdentifier){
    const {size,name} = file;
    const extension = name.split(".").pop()
    const formattedFileSize = size >= 1024 * 1024 ? `${(size / (1024 * 1024)).toFixed(2)}MB`
    : `${(size / 1024).toFixed(2)}KB`

    return `<li class="file-item" id="file-item-${uniqueIdentifier}">
            <div class="extension">${extension}</div>
            <div class="file-content-wrapper">
                <div class="file-content">
                    <div class="file-details">
                        <h5>${name}</h5>
                        <div class="file-info">
                            <small class="file-size">0MB / ${formattedFileSize}</small>
                            <small>·</small>
                            <small class="file-status">uploading...</small>
                        </div>
                    </div>
                    
                    <button class="cancel-button">
                        <i class="fa-solid fa-x"></i>
                    </button>
                </div>
                <div class="file-progress-bar">
                    <div class="file-progress"></div>
                </div>
            </div>
        </li>`

}

//为每个文件发起不同的AJAX请求
function fileRequest(file,uniqueIdentifier){
    const formData = new FormData()
    formData.append("file",file)

    const fileSize = document.querySelector(`#file-item-${uniqueIdentifier}`).querySelector(".file-size")

    const xhr = new XMLHttpRequest()

    //监听上传进度
    //在请求阶段（xhr.send()之后，xhr.readyState == 2之前）触发
    xhr.upload.addEventListener("progress",(e)=>{
        console.log("hh")
        const formattedFileSize = file.size >= 1024 * 1024 ? `${(e.loaded / (1024 * 1024)).toFixed(2)}MB / ${(e.total / (1024 * 1024)).toFixed(2)}MB`
        : `${(e.loaded / 1024).toFixed(2)}KB / ${(e.total / 1024).toFixed(2)}KB`
        fileSize.innerText = formattedFileSize
    })

    //设置http请求
    xhr.open("post","api.php",true)

    xhr.send(formData)
    // try{
    //     //发送请求并携带响应体
    //     xhr.send(formData)
    // }catch(e){//捕捉错误

    //     alert(e)
    // }

    

    return xhr

}



function handleSelectedFiles([...files]){
    if(files.length === 0) return
    totalFiles += files.length
    files.forEach((file,index)=>{
        const uniqueIdentifier = Date.now() + index

        const fileItem = createFileItem(file,uniqueIdentifier)

        fileList.insertAdjacentHTML("afterbegin",fileItem)

        const fileStatus = document.querySelector(`#file-item-${uniqueIdentifier} .file-status`)

        const xhr = fileRequest(file,uniqueIdentifier)

        function changeExternal(text,color){
            fileStatus.innerText = text;
            fileStatus.style.color = color
            
        }

        //数据传输完成并且请求成功
        xhr.addEventListener("readystatechange",()=>{
            console.log("readystate")
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200){
                loadedFiles++;
                changeExternal("completed","green")
                fileCompletedStatus.innerText = `${loadedFilesFiles} / ${totalFiles} files Completed`
            }
        })

        //取消请求
        document.querySelector(".cancel-button").addEventListener("click",()=>{
            xhr.abort()//中断请求
            changeExternal("cancelled","red")
        })

        xhr.addEventListener("error",()=>{
            changeExternal("cancelled","red")

        })

    })

}

//点击fileBrowseBtn实现文件的选取
fileBrowseBtn.addEventListener("click",()=>fileBrowseInput.click())



/* 拖放文件实现文件的选取 */
fileBrowseInput.addEventListener("change",(event)=>{
    handleSelectedFiles(event.target.files)
})
fileUploadBox.addEventListener("dragover",(event)=>{
    event.preventDefault();

    fileUploadBox.classList.add("active")
    fileUploadBox.querySelector(".file-instruction").innerText = "Release to upload or"

})


fileUploadBox.addEventListener("drop",(event)=>{
    // 阻止默认行为
    event.preventDefault()
    handleSelectedFiles(event.dataTransfer.files)


    // console.log("hh drop")
    fileUploadBox.classList.remove("active")
    fileUploadBox.querySelector(".file-instruction").innerText = "Drag files here or"
    



})

fileUploadBox.addEventListener("dragleave", (e) => {
    e.preventDefault();
    fileUploadBox.classList.remove("active");
    fileUploadBox.querySelector(".file-instruction").innerText = "Drag files here or";
});






