var express = require('express');
var router = express.Router();
const path = require('path');
const usersFile = path.join(__dirname, './users.json');
const fs = require('fs')

 function createUser(user) {
    console.log("user", user);
    //get the existing user data
    const existUsers = getUserData()

    //get the new user data from post request
    const userData = user

    //check if the userData fields are missing
    if (userData.firstName == null || userData.password == null || userData.email == null) {
        return ({ error: true, msg: 'User data missing' })
    }

    //check if the username exist already
    const findExist = existUsers.find(user => user.email === userData.email)
    if (findExist) {
        return ({ error: true, msg: 'user already exist' })
    }

    //append the user data
    existUsers.push(userData)

    //save the new user data
    saveUserData(existUsers);
    return ({ success: true, msg: 'User data added successfully' })

}


 function getUsers(req, res) {
    try {
        const users = getUserData()
        if (users)
            res.status(200).send(users);
        else
            res.status(200).send({ "message": "No users" });
    }
    catch (error) {
        res.status(500).send({ "message": "No users" });
    }

};


function getUserById(id){
    const existUsers = getUserData()

    const fetchedUser = existUsers.find(user => user.id === id)
    if (!fetchedUser) {
        return null
    }

    return fetchedUser
}

 function editUser(id,body) {
    //get the userId from url
    const userId = id

    //get the update data
    const userData = body

    //get the existing user data
    const existUsers = getUserData()

    //filter the userdata
    const updateUser = existUsers.filter(user => user.id !== userId)

    //push the updated data
    updateUser.push(userData)

    //finally save it
    saveUserData(updateUser)

  return userData
}


function findUser(email){
    const existUsers = getUserData()

    const fetchedUser = existUsers.find(user => user.email === email)
    if (!fetchedUser) {
        return null
    }

    return fetchedUser
}

const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync( usersFile, stringifyData)
}

const getUserData = () => {
    const jsonData = fs.readFileSync(usersFile, 'utf8')
    return JSON.parse(jsonData)
}
module.exports = { createUser, getUsers, editUser, findUser, getUserById };
