const cluster = require('./cluster')
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
        this.config.urls = new url.URL(this.config.url)
        return this
    },

    // 启动
    async start() {
        // 执行主进程
        await cluster.master(async() => await this.master())
        
        // 创建子进程
        cluster.create(this.config.thread)

        // 执行子进程
        await cluster.child(async () => await this.child())
    },

    // 主进程执行
    async master() {
        console.log('Start Master')

        // 更新代理
        await proxy.update()
    },

    // 子进程执行
    async child() {
        // 计时
        setTimeout(() => {
            console.log('Start Child Over: ' + this.config.time)
            process.exit(0)
        }, this.config.time)

        // 加载数据
        header.load(this.config.header)
        proxy.load()
        ua.load()

        // 脚本
        const shell = require('./shell/' + this.config.shell)

        // 执行脚本
        shell.exec(this.config)
        console.log('Start Shell ' + this.config.shell)
    }
}