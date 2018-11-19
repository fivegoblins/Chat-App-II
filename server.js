const express = require('express');
const server = express();
const http = require('http').Server(server);
const io = require('socket.io')(http);
const port = 8000;

const db = require('./data/dbConfig.js');

server.use(express.static(__dirname));
server.use(express.json());

io.on('connection', ()=> {
    console.log('user connected');
});

server.get('/messages', (req, res)=> {
    Message.find({}, (err, messages)=> {
        res.send(messages);
    });
});

server.post('/messages', (req, res)=> {
    const message = new Message(req.body);
    message.save((err)=> {
        if(err) {
            res.send(500);
        } else {
            io.emit('message', req.body);
            res.send(200);
        }
    });
});


server.listen(port, ()=> {
    console.log(`server is listening on port ${port}`);
});