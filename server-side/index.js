const express = require('express');
const app = express();
const http = require('http').Server(app);
const router = require('./routes/routes.js');

app.use('/', router);

http.listen(3000, function () {
    console.log('listening on *:3000');
});