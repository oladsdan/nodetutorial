const http = require('http');
const path = require('path');
const fs = require('fs')
const fsPromises = require('fs').promises


const logEvents = require('./logEvents');

const eventEmitter = require('events');

class Emitter extends eventEmitter {};

// initialize the object to create
const myEmitter = new Emitter();

// //now lets listen for the log events
// myEmitter.on('log', (msg) => logEvents(msg));

// //we set a timout just to see

// setTimeout(() => {
//     //Emit event
//     myEmitter.emit('log', 'Log event emitted!');
// }, 2000);

/** we define the port */
const PORT = process.env.PORT || 3000;
//we create a server
const server = http.createServer((req, res) => {
    console.log(req.url, req.method)
});

server.listen(PORT, () => console.log(`server running on Port ${PORT}`))