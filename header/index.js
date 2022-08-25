const fs = require('fs')

// 头信息类
module.exports = {
    data: '',

    // 加载
    load(type) {
        try {
            this.data = fs.readFileSync(__dirname + '/' + type + '.txt', 'UTF-8').toString()
            console.log('Load Header ' + type + ' Ok')
        } catch (e) {
            console.log('Load Header Error:' + e.message)
        }
    },

    // 使用头信息
    make(header) {
        let data = this.data
        for (const key in header) {
            data = data.replace('[' + key + ']', header[key]);
        }
        
        return data
    }
}