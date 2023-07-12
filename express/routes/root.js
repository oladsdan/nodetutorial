const express = require('express');
const router = express.Router();
const path = require('path')



router.get('^/$|/index(.html)?', (req, res) => {
    // res.send('Hello World!')
    // res.sendFile('./views/index.html', {root: __dirname})
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
})

// // also we can call another route by using
// router.get('/new-page', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
// })
// //getting a redirect
// router.get('/old-page', (req, res) => {
//     res.redirect(301, '/new-page'); //by default passes a 302 status code so we specify 301
// })

module.exports = router; 