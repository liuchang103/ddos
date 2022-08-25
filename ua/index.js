const fs = require('fs')

const UA_PATH = __dirname + '/ua.txt'

// UA类
module.exports = {
    data: [],

    // 加载
    load() {
        try {
            this.data = fs.readFileSync(UA_PATH, 'UTF-8').toString().replace(/\r/g, '').split('\n')
            console.log('Load UA: ' + this.data.length)
        } catch (e) {
            console.log('Load UA Error:' + e.message)
        }
    },

    // 使用UA
    make() {
        return this.data[Math.floor(Math.random() * this.data.length)]
    }
}