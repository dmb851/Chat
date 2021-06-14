const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.use(express.static(__dirname + "/"));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('a user disconnected');

    });

    socket.on('chat message', (data) => {
        console.log('message: ' + data.name +" "+ data.msg);
        socket.broadcast.emit('chat message', {name: data.name, msg: data.msg});

    });

});


server.listen(3000, () => {
    console.log('listening on port 3000');
})
