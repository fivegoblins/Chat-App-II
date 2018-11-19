const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const Message = mongoose.model('Message', {
    name: String,
    message: String
});

const dbUrl = 'mongodb://alexswartz:sunnyday4!@ds247688.mlab.com:47688/chat-messages';

app.get('/messages', (req, res)=> {
    Message.find({}, (err, messages)=> {
        res.send(messages);
    });
});

app.post('/messages', (req, res)=> {
    const message = new Message(req.body);
    message.save((err)=> {
        if(err) {
            res.sendStatus(500);
        } else {
            io.emit('message', req.body);
            res.sendStatus(200);
        }
    });
});

io.on('connection', ()=> {
    console.log('user connected');
});

mongoose.connect(dbUrl, (err)=> {
    console.log('mongodb connected', err);
});

const server = http.listen(8000, ()=> {
    console.log('server is running on port 8000', server.address().port);
})