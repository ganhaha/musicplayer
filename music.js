var playedflag = 0 //全局变量判断音乐是否在播放
var dotmoved //全局变量判断进度条是否移动，返回值为setInterval的ID值，可用于取消定时器



function musicListColorChange() {
    var str = decodeURIComponent(document.getElementById('audio').currentSrc) //decodeURIComponent()用来解码中文字
    // console.log('changec:',str)
    var reg = /music\/(.*).mp3/

    musicname = str.match(reg)[1]
    var list = document.getElementsByClassName('listol')[0].children
    for (var i = 0; i < list.length; i++) {
        if (musicname === list[i].innerHTML) {
            list[i].style.color = 'red'

        } else {
            list[i].style.color = 'black'
        }

    }
}//用来改变字体颜色的函数

function musicPlaySrcChanged() {


    document.getElementById('audio').load()
    document.getElementById('audio').play()

    document.getElementById('audio').addEventListener('timeupdate', move)
    document.getElementById('audio').addEventListener('durationchange', function () {
        document.getElementsByClassName('time')[1].innerHTML = convertMsicTime(document.getElementById('audio').duration) //durationchange事件，监听时长改变然后获取整段时间

        var str = decodeURIComponent(document.getElementById('audio').currentSrc) //decodeURIComponent()用来解码中文字
        musicListColorChange()
        // console.log(str)
    }) //为什么一定要放到这个时间改变的监听函数才能改变到正确的音乐播放src？？？？

}

function musicSrc() {
    var list = document.getElementsByClassName('listol')[0].children
    // console.log(list)
    for (let i = 0; i < list.length; i++) {

        list[i].onclick = function changeSrc() {

            document.getElementById('audio').src = 'music/' + list[i].innerHTML + '.mp3' //拼接播放连接

            musicPlaySrcChanged() //播放地址更改后的操作

        }

    }

}

function convertMsicTime(converttime) {
    var sec, min, showtime
    sec = parseInt(converttime % 60)
    min = parseInt(converttime / 60)

    if (min === 0) {
        if (sec < 10) {
            showtime = '00' + ':' + '0' + sec
        } else {
            showtime = '00' + ':' + sec
        }
    } else if (min > 0 && min < 10) {
        if (sec < 10) {
            showtime = '0' + min + ':' + '0' + sec
        } else {
            showtime = '0' + min + ':' + sec
        }
    } else {
        if (sec < 10) {
            showtime = min + ':' + '0' + sec
        } else {
            showtime = min + ':' + sec
        }
    }
    return showtime //按照分秒格式化时间
}

function sliderPositon(e) {
    var mouseposition = e.offsetX

    var sliderwidth = document.getElementById('sliderwidth').offsetWidth


    document.getElementById('iconfont-slider').style.left = 99 * mouseposition / sliderwidth + '%'

    document.getElementById('audio').currentTime = (mouseposition / sliderwidth) * document.getElementById('audio').duration

    document.getElementsByClassName('time')[0].innerHTML = convertMsicTime(mouseposition / sliderwidth * document.getElementById('audio').duration)
    // document.getElementById('audio').play()


} //移动滑块之后播放音乐

function move() {
    var sliderdot = document.getElementById('iconfont-slider')
    var movetime = document.getElementById('audio').duration //按照秒为单位的总时间
    var movecurrenttime = document.getElementById('audio').currentTime //按照秒为单位的正在播放的时间

    var musiccurrenttime = convertMsicTime(document.getElementById('audio').currentTime) //按照分秒格式化后的正在播放的时间，用于显示在网页上


    document.getElementsByClassName('time')[0].innerHTML = musiccurrenttime //显示整段音乐正在播放的时间
    sliderdot.style.left = 99 * movecurrenttime / movetime + '%' //iconfont-slider用了1%的大小所以整段长度不是100%用99%就够了，否则会超出整长

}

function musicPlay() {
    if (playedflag > 0) {
        return //如果已经播放再按播放按键无效
    } else {
        document.getElementById('audio').play()
        document.getElementById('audio').addEventListener('timeupdate', move)
        document.getElementsByClassName('time')[1].innerHTML = convertMsicTime(document.getElementById('audio').duration) //显示整段音乐的时间,按照分秒格式化后的时间，用于显示在网页上
        musicListColorChange()
        playedflag = 1

    }

}

function musicPause() {
    document.getElementById('audio').pause()
    clearInterval(dotmoved)
    playedflag = 0
}

function musicPre() {

    var str = decodeURIComponent(document.getElementById('audio').currentSrc) //decodeURIComponent()用来解码中文字

    var reg = /music\/(.*).mp3/

    musicname = str.match(reg)[1]
    var list = document.getElementsByClassName('listol')[0].children
    for (var i = 0; i < list.length; i++) {
        if (musicname === list[i].innerHTML) {

            if (i > 0) {
                document.getElementById('audio').src = 'music/' + list[i - 1].innerHTML + '.mp3' //拼接播放连接    

            } else {
                document.getElementById('audio').src = 'music/' + list[list.length - 1].innerHTML + '.mp3' //拼接播放连接  ，如果是第一首那就从最后一首开始

            }

        }

    }

    musicPlaySrcChanged() //播放地址更改后的操作

}

function musicNext() {
    var str = decodeURIComponent(document.getElementById('audio').currentSrc) //decodeURIComponent()用来解码中文字

    var reg = /music\/(.*).mp3/

    musicname = str.match(reg)[1]
    var list = document.getElementsByClassName('listol')[0].children
    for (var i = 0; i < list.length; i++) {
        // list[i].style.color='black'
        if (musicname === list[i].innerHTML) {

            if (i < list.length - 1) {
                document.getElementById('audio').src = 'music/' + list[i + 1].innerHTML + '.mp3' //拼接播放连接  

            } else {
                document.getElementById('audio').src = 'music/' + list[0].innerHTML + '.mp3' //拼接播放连接  ，如果是最后一首那就从头开始

            }

        }

    }

    musicPlaySrcChanged() //播放地址更改后的操作

}