//FILE SYSTEM

const fs = require('fs');
const path = require('path')

fs.readFile('./files/starter.txt', (err, data) => {
    if (err) throw err;
    console.log(data.toString())
})


//This is another aproach in reading files using the patha module
fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data)
})

//exit on uncaught errors
process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err} `);
    process.exit(1);
})