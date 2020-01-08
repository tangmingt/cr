
const express = require('express')
const app = express();
var server = app.listen(8081);
var io = require('socket.io').listen(server);
io.sockets.on('connection', (socket) => {
    console.log('123')
});