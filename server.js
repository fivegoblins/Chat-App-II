const express = require('express');
const server = express();
const port = 8000;

const db = require('./data/dbConfig.js');

server.use(express.static(__dirname));






server.listen(port, ()=> {
    console.log(`server is listening on port ${port}`);
});