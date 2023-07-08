const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3000;

//custom middleware
// app.use((req, res, next) => {
//     logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt')
//     console.log(`${req.method} ${req.path}`)
//     next();
// })
app.use(logger);
// we apply cors
const whiteList = ['https://www.twitter.com', 'http://127.0.0.1:5500', 'http://localhost:3500']
// we create a functions
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by Cors'))
        }
    },
    optionsSuccessStatus:200
}

app.use(cors(corsOptions));

//Built in middleware to enable urlencoded data
//in other words, form data
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

//serve static files eg css, images, txt
app.use(express.static(path.join(__dirname, '/public')));


//defining the route in express
// app.get('/', (req, res) => {
//the expresion below uses regex meaning 
app.get('^/$|/index(.html)?', (req, res) => {
    // res.send('Hello World!')
    // res.sendFile('./views/index.html', {root: __dirname})
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

// also we can call another route by using
app.get('/new-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
})
//getting a redirect
app.get('/old-page', (req, res) => {
    res.redirect(301, '/new-page'); //by default passes a 302 status code so we specify 301
})

//we can do a default route to supply a custom 404
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

//serving our 404 since app.get does not use regex but app.all uses
app.all('*', (req, res)=> {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')){
        res.json({error : "404 not found"});
    } else {
        res.type('txt').send("404 not found")
    }
})
// using a custom error
app.use(errorHandler)

app.listen(PORT, () => console.log(`server running on Port ${PORT}`)) 