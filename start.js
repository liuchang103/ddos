const app = require('./app')

app.load({
    // 网址 可使用 [*] [**] 随机字符
    url: 'http://',

    // 使用 sheel 目录脚本
    shell: 'http',

    // 使用 header 目录头信息
    header: 'get',

    // post 数据 可使用 [*] [**] 随机字符
    post: '',

    // 进程数量
    thread: 2,

    // 连接超时时间 (秒)
    timeout: 15,

    // 连接发送数据量 (次)
    rate: 1,

    // 创建连接间隔 (毫秒)
    speed:  500,

    // 随机数据更换间隔 (毫秒)
    random: 50,

    // 代理更新时间 (秒)，为 0 将不自动更新代理
    proxy: 10,

    // 执行时间 (秒)，为 0 将永久执行
    time: 0,
}).start()