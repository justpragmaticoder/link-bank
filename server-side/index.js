const express = require('express');
const app = express();
const http = require('http').Server(app);
const router = require('./routes/routes.js');

app.use('/', router);

http.listen(3001, function () {
    console.log('listening on *:3001');
});