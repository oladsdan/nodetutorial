// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data}
// }

// const fsPromises = require('fs').promises;
// const path = require('path');

const User = require('../model/User');
const bcrypt = require('bcrypt'); // used to hash and salt password

const handleNewUser = async ( req, res ) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user}).exec();
    if (duplicate) return res.sendStatus(409); // meaning conflict
    try{
        //hash the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // then we create a frame to store
        const result = await User.create({
            "username": user,
            "password":hashedPwd
        }) 

        console.log(result)
    //     //store the newuser in the database
    //     usersDB.setUsers([...usersDB.users,  newUser],"\n");
    //     // we write the file
    //    await fsPromises.writeFile(
    //         path.join(__dirname, '..', 'model', 'users.json'),
    //         JSON.stringify(usersDB.users)
    //    ); 

    //    console.log(usersDB.users);
       res.status(201).json({ 'success': `new User ${user} created!`})

    }catch(err){
        res.status(500).json({ 'message': err.message});
    }
} 
module.exports = { handleNewUser };