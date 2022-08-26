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
                data = data.split('[' + key + ']').join(header[key])
            }
        }
        return data
    },

    // 随机信息
    random(header, length = 6) {
        if(header.includes('[rand]')) {
            header = header.replace('[rand]', this.rand(length))
        } else if (header.includes('[random]')) {
            header = header.replace('[random]', this.rand(length, 1))
        } else {
            return header
        }

        return this.random(header, length)
    },
    
    // 生成随机数
    rand(length, type = 0) {
        const data = [
            ['0','1','2','3','4','5','6','7','8','9'],
            ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
        ]
        let res = "";
        for(let i = 0; i < length ; i ++) {
            res += data[type][Math.floor(Math.random() * data[type].length)];
        }
        return res;
    }
}