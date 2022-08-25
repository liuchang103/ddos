const fs = require('fs')
const url = require('url')
const https = require('https')
const http = require('http')

const URL_PATH = __dirname + '/url.txt'
const PROXY_PATH = __dirname + '/proxy.txt'

// 代理类
module.exports = {
    data: '',

    // 更新代理
    async update() {
        console.log('Update Proxy Loading...')
        try {
            // 加载代理网址
            const target = fs.readFileSync(URL_PATH, 'UTF-8').toString().replace(/\r/g, '').split('\n')

            // 代理数据
            let data = ''
            for (let i = 0; i < target.length; i++) {
                data += await this.request(target[i])
            }

            // 写出代理文件
            fs.writeFileSync(PROXY_PATH, data)

            console.log('Update Proxy OK')
        } catch (e) {
            console.log('Update Proxy Error:' + e.message)
        }
    },

    // 加载
    load() {
        try {
            this.data = fs.readFileSync(PROXY_PATH, 'UTF-8').toString().replace(/\r/g, '').split('\n')
            console.log('Load Proxy: ' + this.data.length)
        } catch (e) {
            console.log('Load Proxy Error:' + e.message)
        }
    },

    // 使用代理
    make() {
        return this.data[Math.floor(Math.random() * this.data.length)].split(':')
    },

    // 请求
    request(target) {
        return new Promise(function(resolve, reject) {
            // 解析 url
            const urls = new url.URL(target)
            // http https 
            const protocol = urls.protocol == 'https:' ? https : http
            protocol.get(target, res => {
                const list = []
                res.on('data', (data) => {
                    list.push(data)
                })
                res.on('end', () => {
                    resolve(Buffer.concat(list).toString())
                })
            }).on('error', (err) => {
                reject(err)
            })
        })
    }
}