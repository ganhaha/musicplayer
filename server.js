var express = require('express')
var path = require('path')

var app = express()
app.use(express.static(path.join(__dirname, 'files'))) //用来访问静态资源,show是虚拟路径，可以用任何名字

app.get('/', function (req, res) {
   
    res.sendFile(__dirname + '/music.html') //用来直接显示网页
})


// app.listen(4000,'192.168.191.1')//需要监听地址就这么些，不写就是localhost
app.listen(4000)