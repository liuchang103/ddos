const app = require('./app')

app.load({
    // 网址
    url: 'http://',

    // 使用 sheel 目录脚本
    shell: 'socket',

    // 使用 header 目录头信息
    header: 'post',

    // post 数据
    post: 'username=',

    // 进程数量
    thread: 1,

    // 连接超时时间 (秒)
    timeout: 5,

    // 连接发送数据量 (次)
    rate: 1,

    // 创建连接间隔 (毫秒)
    speed:  1000,

    // 随机数据更换间隔 (毫秒)
    random: 100,

    // 执行时间 (秒)
    time: 100,
}).start()