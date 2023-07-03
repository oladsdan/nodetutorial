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
    //serving the files
    // let paths;
    // if (req.url ==='/' || req.url === 'index.html'){
    //     res.statusCode = 200; // which means successful
    //     res.setHeader('Content-Type', 'text/html');
    //     paths = path.join(__dirname, 'views', 'index.html')
    //     fs.readFile(paths, 'utf8', (err, data) => {
    //         res.end(data)
    //     })

    // }


    // we check the extension name
    const extension = path.extname(req.url);

    //using switch statement to determine the content type to serve

    let contentType;

    switch (extension){
        case '.css':
            contentType ='text/css';
            break;
        case '.js':
            contentType ='text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';

    }
        //defined a chain ternary statements
    let filePath =
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);
    
    // makes .html extension not required in the browser
    if(!extension && req.url.slice(-1) !== '/') filePath += '.html';

    //serving the files

    const fileExists = fs.existsSync(filePath);
    
    if(fileExists){
        res.writeHead(200, {'Location': `${filePath}`});
        res.end();
        console.log(filePath)

    } else {
        //404
        // redirect
        console.log(path.parse(filePath))
        //using the switch statements
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'Location': '/new-page.html'});
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, { 'Location': '/'});
                res.end();
                break;
            default:
            //serve a 404 response
        }

    }

});

server.listen(PORT, () => console.log(`server running on Port ${PORT}`))