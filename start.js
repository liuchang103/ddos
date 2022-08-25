const app = require('./app')

app.load({
    url: 'http://85.10.195.175',
    shell: 'socket',
    header: 'get',
    thread: 100,
    time: 60,
    timeout: 5,
    launch: 90,
    speed: 3
}).start()