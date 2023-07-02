const { format } = require('date-fns')
const { v4: uuid} = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// we define a log event function that we can export
const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {
        //since we cant find the directory we check for it
        if(!fs.existsSync(path.join(__dirname, 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem)
        
    } catch (err) {
        console.error(err)
    }
}

module.exports = logEvents