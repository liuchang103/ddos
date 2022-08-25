const cluster = require('cluster')

module.exports = {
    
    // 创建子进程
    create(count) {
        this.master(() => {
            // 创建子进程
            for (let i = 0; i < count; i++){
                cluster.fork()
            }
        })
    },

    // 主进程执行
    async master (func) {
        if(!cluster.isMaster) return

        return await func()
    }, 

    // 子进程执行
    async child(func) {
        if(cluster.isMaster) return

        return await func()
    }, 
}