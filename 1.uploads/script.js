const fileList = document.querySelector(".file-list"),
    fileBrowseInput = document.querySelector(".file-browse-input"),
    fileCompletedStatus = document.querySelector(".file-completed-status"),
    fileBrowseBtn = document.querySelector(".file-browse-button"),
    fileUploadBox = document.querySelector(".file-upload-box");

//总文件数量
let totalFiles = 0;
//已完成文件的数量
let completedFiles = 0;




/* fileBrowseInput.addEventListener("change",(event)=>{
    console.log(event.target.files)
    let files = event.target.files
    for(let file of files){
        createFileItem(fileList,file)
    }
    
})

function createFileItem(elem,file){
    const p = document.createElement("p")
    p.innerText = `${file.nam}--${file.size}`

    elem.appendChild(p)
}

fileBrowseBtn.addEventListener("click",()=>{
    fileBrowseInput.click()
})
 */

// fileUploadBox.addEventListener("dragenter",(event)=>{
//     event.target.classList.add("active")
// })

// 为每一个 fileItem 创建HTML元素
function createFileItemHTML(file,uniqueIdentifier){
    // console.log(file)
    // 获取文件信息
    const {name,size} = file;
    const extension = name.split(".").pop();
    const formattedFileSize = size >= 1024 * 1024 ? `${ (size / (1024 * 1024)).toFixed(2)}MB`
    : `${ (size / 1024).toFixed(2)}KB`

    return `<li class="file-item" id="file-item-${uniqueIdentifier}">
                <div class='file-extension'>${extension}</div>
                <div class="file-content-wrapper">
                    <div class="file-content">
                        <div class="file-details">
                            <h5 class="file-name">${name}</h5>
                            <div class="file-info">
                                <small class="file-size">0MB / ${formattedFileSize}</small>
                                <small class="file-divider">·</small>
                                <small class="file-status">Uploading...</small>
                            </div>
                        </div>
                        <div class="cancel-button">
                            <i class="fa-solid fa-x"></i>
                        </div>
                    </div>
                    <div class="file-progress-bar">
                        <div class="file-progress"></div>
                    </div>
                </div>
            </li>`;
}

// 处理文件上传的函数
function handleFileUploading(file,uniqueIdentifier){
    const formData = new FormData()
    formData.append("file",file);
    

    // 创建xhr对象
    const xhr = new XMLHttpRequest()

    //xhr.upload 一个包含数据上传进度的对象
    //绑定progrss事件来实现对上传进度的追踪
    xhr.upload.addEventListener("progress",(event)=>{
        console.log(event,"event")
        const fileSize = document.querySelector(`#file-item-${uniqueIdentifier} .file-size`)
        const fileProgress = document.querySelector(`#file-item-${uniqueIdentifier} .file-progress`)
        
        const formattedFileSize = file.size > 1024 * 1024 ? `${(event.loaded / (1024 * 1024)).toFixed(2)}MB / ${(event.total / (1024 * 1024)).toFixed(2)}MB`
        : `${(event.loaded / 1024 ).toFixed(2)}KB / ${(event.total / 1024).toFixed(2)}KB`
        fileSize.innerText = formattedFileSize

        fileProgress.style.width = `${(event.loaded / event.total).toFixed(2) * 100}%`
    })

    // 设置请求（异步执行）
    xhr.open("post","api.php",true)
    //发送请求并携带响应体数据
    xhr.send(formData)

    return xhr
}

//对选取的文件作处理：
// 1.页面的动态渲染
// 2.文件的上传
function handleSelectedFiles([...files]){
    // console.log(files,"files")
    if(files.length === 0) return;
    totalFiles += files.length
    files.forEach((file,index)=>{
        //渲染html标签，并使每个html具有唯一的id
        const uniqueIdentifier = Date.now()+index;
        const fileItem = createFileItemHTML(file,uniqueIdentifier)
        fileList.insertAdjacentHTML("afterbegin",fileItem)
        
        const currentFileItem = document.getElementById(`file-item-${uniqueIdentifier}`);
        const cancelFileUploadBtn = currentFileItem.querySelector(".cancel-button")

        const xhr = handleFileUploading(file,uniqueIdentifier)

        const updateFileStatus = function(color,statusText){
            currentFileItem.querySelector(".file-status").style.color = color
            currentFileItem.querySelector(".file-status").innerText = statusText
        }

        // 文件上传成功
        xhr.addEventListener("readystatechange",()=>{
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200){
                completedFiles++;
                cancelFileUploadBtn.remove()
                updateFileStatus("#00b125","Completed")
                fileCompletedStatus.innerText = `${completedFiles} / ${totalFiles} files Completed`
            }

        })

        //手动取消文件上传
        cancelFileUploadBtn.addEventListener("click",()=>{
            xhr.abort() //取消文件上传
            updateFileStatus("#e3413f","Cancelled")
            cancelFileUploadBtn.remove()

        })

        //文件上传失败（网络问题或请求网址不存在）
        xhr.addEventListener("error",()=>{
            updateFileStatus("#e3413f","Error")
            alert("An error occurred during the file upload!");
        })

    })
}


// 处理文件的dragover事件的函数
fileUploadBox.addEventListener("dragover",(e)=>{
    // 阻止默认行为以允许放置
    e.preventDefault()
    fileUploadBox.classList.add("active")

    fileUploadBox.querySelector(".file-instruction").innerText = "Release to upload or";
})
// 处理文件的dragleave事件的函数
fileUploadBox.addEventListener("dragleave",(event)=>{
    event.preventDefault()
    event.target.classList.remove("active")
    fileUploadBox.querySelector(".file-instruction").innerText = "Drag files here or";

})
//处理文件的ddrop事件的函数
fileUploadBox.addEventListener("drop",(event)=>{
    // 阻止默认行为（例如某些元素的链接会被打开）
    event.preventDefault()

    event.target.classList.remove("active")
    console.log(event.dataTransfer.files)
    handleSelectedFiles(event.dataTransfer.files)
    fileUploadBox.querySelector(".file-instruction").innerText = "Drag files here or";
})

fileBrowseBtn.addEventListener("click",()=>fileBrowseInput.click())
fileBrowseInput.addEventListener("change",(e)=>handleSelectedFiles(e.target.files))