const express = require('express');
const server = express();
const port = 8000;








server.listen(port, ()=> {
    console.log(`server is listening on port ${port}`);
});