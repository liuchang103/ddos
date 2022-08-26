const fs = require('fs')

// 头信息类
module.exports = {
    data: '',

    // 加载
    load(type) {
        try {
            this.data = fs.readFileSync(__dirname + '/' + type + '.txt', 'UTF-8').toString()
        } catch (e) {
            console.log('Load Header Error:' + e.message)
        }
    },

    // 使用头信息
    make(header) {
        let data = this.data
        for (const key in header) {
            if(data.includes('[' + key + ']')) {
                data = data.replaceAll('[' + key + ']', header[key])
            }
        }
        return data
    }
}