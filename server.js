const http = require('http');
const fs = require('fs');
const services = require('./services.js');

const port = 5000;

const server = http.createServer((req, res) => {
   res.statusCode = 200;
});

server.listen(port, function() {
    console.log(`Server running at http://localhost:${port}/`);
});
