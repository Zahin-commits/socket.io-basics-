const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const {Server} = require('socket.io');
const PORT = 3000;

const server = http.createServer(app);
const io = new Server(server);

io.on('connection',(socket)=>{
 console.log('new client entry', socket.id);

 socket.on('user-message',(message)=>{
    io.emit('message',message);
 })
})

app.use(express.static(path.resolve('./public')));

app.get('/',(req,res)=>{
 return res.sendFile('/public/index.html');
})

server.listen(PORT,()=>{
 console.log(`the server is running at port ${PORT}...`);
})