const app = require('./app')

app.load({
    url: 'http://',
    shell: 'http',
    header: 'post',
    post: 'username=liuchangliuchang1111',
    thread: 1,
    time: 100,
    timeout: 5,
    rate: 1,
    speed:  1000
}).start()