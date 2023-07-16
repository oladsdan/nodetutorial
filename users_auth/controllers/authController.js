const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data}
}

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
    const { user, pwd} = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password required'});
    const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) return res.sendStatus(401);

    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match) {
        // create JWTS
        const accessToken = jwt.sign(
            { "username": foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s'}
        )
        const refreshToken = jwt.sign(
            { "username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d'}
        );
        // we save the refresh token into the database to enable logout options
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        //adding the refreshtoken to the found user
        const currentUser = {...foundUser, refreshToken}
        // then we store it in the database
        usersDB.setUsers([...otherUsers, currentUser]);

        await fsPromises.writeFile( path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users));

        // res.json({ 'success': `User ${user} is logged in`}); 
        res.cookie('jwt', refreshToken, { httpOnly : true, message: 24 * 60 * 60* 1000} )
        res.json({ accessToken });

    } else {
        res.sendStatus(401);
    }

}
module.exports = {handleLogin}