const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;


//Built in middleware to enable urlencoded data
//in other words, form data
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

//serve static files
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

app.listen(PORT, () => console.log(`server running on Port ${PORT}`))