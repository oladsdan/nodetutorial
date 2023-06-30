// using Streams

const fs = require('fs');

const rs = fs.createReadStream('./files/starter.txt', {encoding: 'utf-8'});

const ws = fs.createWriteStream('./files/new-lorems.txt');

// then we listen to the data coming from the stream

// rs.on('data',(dataChunk) => {
//     ws.write(dataChunk)
// })

// more efficient way
rs.pipe(ws)