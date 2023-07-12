const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data}
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt') // used to hash and salt password

const handleNewUser = async ( req, res ) => {
    const {user, pwd} = req.body;
    //if no users or password
    if(!user || !pwd) return res.status(400).json({ 'message': "Username and password are requierd"})

    // check for duplicate usernames
    const duplicate = usersDb.users.find(person => person.username === users);
    if (duplicate) return res.sendStatus(409); // meaning conflict
    try{
        //hash the password
        const hashedpwd = await bcrypt.hash(pwd, 10);
        // then we create a frame to store
        const newUser = {"username": user, "password":hashedpwd};
        //store the newuser in the database
        usersDB.setUsers([...usersDB.users, newUser]);
        // we write the file
       await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            json.stringify(usersDB.users)
       );

       console.log(usersDB.users);
       res.status(201).json({ 'success': `new User ${user} created!`})

    }catch(err){
        res.sendStatus(500).json({ err : message})
    }
} 
module.exports = { handleNewUser};