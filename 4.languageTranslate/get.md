对于使用了flex布局的子元素该如何布局，才能在页面上保持美观？
//通过设置子元素的宽高占比来重新分配由各自内容撑开的宽高：

--假设现在有div.bigBox>div.item*2，div.item上有各自的内容
此时，先设置 div.item内的子元素的宽高（撑开div.bigBox的宽高）
然后：div.bigBox div.item:first-child {width:38%;}
