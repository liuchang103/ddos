const app = require('./app')

app.load({
    url: 'http://',
    shell: 'socket',
    header: 'get',
    thread: 100,
    time: 60,
    timeout: 5,
    launch: 100,
    speed: 3
}).start()