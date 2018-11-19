const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = 'mongodb://alexswartz:sunnyday4!@ds247688.mlab.com:47688/chat-messages';
const http = require('http').Server(server);
const io = require('socket.io')(http);
const port = 8000;

mongoose.connect(db, (err)=> {
    console.log('mongodb connected', err);
});

const Message = mongoose.model('Message', {
    name: String,
    message: String
});

server.use(express.static(__dirname));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

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