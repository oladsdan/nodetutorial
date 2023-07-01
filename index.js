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


fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to see you...', (err) => {
    if (err) throw err;
    console.log("write completed")
})
fs.appendFile(path.join(__dirname, 'files', 'starter.txt'), '\nhow are you doing..',(err) => {
    if(err) throw(err)
    console.log("append completer")
})

//also we can use the callback technique // which seems like a callback hell
fs.writeFile(path.join(__dirname, 'files', 'now.txt'), 'this is good', (err) => {
    if (err) throw err;
    console.log("file writed proceeding to the append callback")

    fs.appendFile(path.join(__dirname, 'files', 'now.txt'), '\ni am good', (err) => {
        if (err) throw err;
        console.log("this append complete proceedint to reading");

        fs.readFile(path.join(__dirname, 'files', 'now.txt'), 'utf-8', (err, data) =>{
            if(err) throw err;
            console.log(data);
            console.log("this is done")
        })
    
    })
})

//exit on uncaught errors
process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err} `);
    process.exit(1);
})