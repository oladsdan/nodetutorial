const logEvents = require('./logEvents');

const eventEmitter = require('events');

class MyEmitter extends eventEmitter {};

// initialize the object to create

const myEmitter = new MyEmitter();

//now lets listen for the log events
myEmitter.on('log', (msg) => logEvents(msg));