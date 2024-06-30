关于css：
1.对于不确定一行要放置几个元素：可以让先设置子元素的宽高，然后搭配padding、margin 让子元素来撑开父容器
2.作响应式处理：当视口宽度低于某个阈值时，改变子元素的宽高及其文本字号大小

js：
1.对于个数：尽量使用变量赋值
2.学习到的字符串中的新方法：
    1.生成十六进制随机颜色
    Math.floor(Math.random() * oxffffff).toString(16)
    2.填充字符串：
    str.padStart(6,"0")
3.学习到的复制、粘贴
    window.navigator.clipboard：表示一个用于读写剪切板内容的clipboard对象
    查看（读取）剪切板中的内容：
    navigator.clipboard.readText().then(data=>{
        //data表示剪切板中的内容
        doSomeActions...
    },(err)=>{
        //网站未授权    
    })
    写入剪切板中的内容：
    navigator.clipboard.writeText(writeText).then(()=>{
        //执行一些操作
        //例如
        document.querySelector.innnerText = writeText
    },()=>{
        //error
    })