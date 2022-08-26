const cluster = require('cluster')
const url = require('url')
const proxy = require('./proxy')
const header = require('./header')
const ua = require('./ua')

module.exports = {
    config: {},

    // 加载配置
    load(config) {
        this.config = config
        this.config.time *= 1000
        this.config.timeout *= 1000
        this.config.proxy *= 1000
        this.config.urls = new url.URL(this.config.url)
        return this
    },

    // 启动
    async start() {
        // 执行主进程
        await this.master()

        // 执行子进程
        this.child()
    },

    // 主进程执行
    async master() {
        if(!cluster.isMaster) return
        console.log('Start Master')

        // 更新代理
        await proxy.update()
        
        // 创建子进程
        for (let i = 0; i < this.config.thread; i++){
            cluster.fork()
        }

        // 定时更新代理
        if(this.config.proxy > 0) {
            setInterval(() => {
                proxy.update()
            }, this.config.proxy)
        }
    },

    // 子进程执行
    async child() {
        if(cluster.isMaster) return
        // 计时
        if(this.config.time > 0) {
            setTimeout(() => {
                console.log('Start Child Over: ' + this.config.time)
                process.exit(0)
            }, this.config.time)
        }
        

        // 加载数据
        header.load(this.config.header)
        proxy.load()
        ua.load()

        // 脚本
        const shell = require('./shell/' + this.config.shell)

        // 执行脚本
        shell(this.config)
        console.log('Start Shell ' + this.config.shell)

        // 定时更新代理
        if(this.config.proxy > 0) {
            setInterval(() => {
                proxy.load()
            }, this.config.proxy + 5000)
        }
    }
}