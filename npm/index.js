const logEvents = require('./logEvents');

const eventEmitter = require('events');

class MyEmitter extends eventEmitter {};

// initialize the object to create

const myEmitter = new MyEmitter();

//now lets listen for the log events
myEmitter.on('log', (msg) => logEvents(msg));

//we set a timout just to see

setTimeout(() => {
    //Emit event
    myEmitter.emit('log', 'Log event emitted!');
}, 2000);
