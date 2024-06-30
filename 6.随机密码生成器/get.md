1.对于作用在同一容器，但没有关联的过渡效果，可以通过切换class或id实现：
div#weak::after{},
div#medium::after{},
div#strong::after{}


2.能用css完成的功能尽量使用css（简单化）

3.合理使用html特性：disabled等

4.使用不同的函数来实现不同的功能，函数名要简明易懂

5.思考变量应放置的位置（全局作用域与局部作用域）
