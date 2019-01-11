const http = require('http');
const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('This is the middleware!');
    next();
});

app.use((req, res, next) => {
    console.log('This is the seond middleware');
    // Enter text for respomse page. 
})

const server = http.createServer(app);

server.listen(3000);