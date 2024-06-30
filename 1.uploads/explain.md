作用：文件上传（可观察到文件上传的进度）

功能：
1.拖拽上传：通过监听 input:file 容器 的 drop事件,获取event.dataTransfer.files（包含被拖拽文件的信息），然后对这些文件作处理（handleSelectedFiles(files)）
2.点击指定元素上传： 在该元素的click程序中实现对 input:file 的点击用于获取文件，然后再结合 input:file 的change事件将这些文件回传到handleSelectedFiles(files)中作处理

主要的函数：
handleSelected：
1.遍历参数files，将每一个file回传到 createFileItemHTML 以创建HTML，使file信息（上传进度、文件名称、文件类型、文件大小）能够在页面上渲染（注意：在创建时应当赋予不同的id，才能作不同的渲染处理），返回为该file创建的html

2.父容器增添创建的html

3.在遍历flies的同时，为每一个文件都创建了Ajax请求，并使用了FormData（带有表单数据的对象）来存储并提交该文件（append）
4.创建了请求后，我们就可以追踪文件上传的状态（ 根据 xhr.upload.onprogress的两个参数event.loaded、event.total 来改变文本内容以及进度条宽度），返回xhr对象
（---以上两步在handleFileUploading上完成）

5.接收到xhr对象后，我们可以对不同的状况作不同的渲染处理:
    1.xhr.status === 200 && xhr.DONE :请求完成并响应成功
    2.xhr.abort() 用户手动取消
    3.xhr.onerror 请求错误
