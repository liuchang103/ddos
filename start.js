const app = require('./app')

app.load({
    url: 'http://',
    shell: 'socket',
    header: 'get',
    post: '',
    thread: 1,
    time: 100,
    timeout: 5,
    launch: 1,
    speed:  500
}).start()