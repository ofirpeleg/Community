//users scheme from DB
const User = require("../models/user.models");
//bcrypt for password
const bcrypt = require('bcrypt');
//http error class
const { httpError } = require('../classes/httpError.class');

//get user by id
const getUserById= async (req, res) => {
    //const id = req.params.id;
    const userId = req.userid._id;
    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) throw new httpError("Not exist" , 404);
    return foundUser;
};

//get user by Email
const getUserByEmail= async (req, res) => {
    let email;
    if (req.params.email) {
        email = req.params.email;
    }
    else  {
        email = req.body.email;
        console.log(email);
    }
    const foundUser = await User.findOne({ 'email': email });
    if (!foundUser) throw new httpError("Not exist" , 404);
    return foundUser;
};

//get all users
const getUsers = async (req, res) => {
    const users = await User.find({ });
    if (!users && users.length < 0) throw new httpError("Unable to find users" , 400);
    return users;
};

//edit user info
const updateUser = async (req, res) => {
    const id = req.params.id;
    if(req.body.password) {
        const hashPassword = await bcrypt.hash(req.body.password, 12);
        const user = { ...req.body , password:hashPassword };
        const updatedUser = await User.findByIdAndUpdate({ _id: id }, user);
        if (!updatedUser) throw new httpError("not Updated" , 404);
        return updatedUser;
    }
    else {
        const updatedUser = await User.findByIdAndUpdate({_id: id}, req.body);
        if (!updatedUser) throw new httpError("not Updated" , 404);
        return updatedUser;
    }
};

//remove user
const deleteUser = async (req, res) => {
    if (!req.params.id) throw new httpError("Bad Request" , 400);
    const deletedUser = User.findByIdAndRemove(req.params.id);
    if (!deletedUser) throw new httpError("Not Deleted" , 400);
    return deletedUser;
};

const postUser = async (user) => {
    const userObj = new User({ ...user });
    console.log(userObj.email);
    const foundUser = await User.findOne({'email': userObj.email});
    if(foundUser) throw new httpError("Email already exists" , 404);
    else {
        const newUser = await userObj.save();
        if (!newUser) throw new httpError("not Registered" , 404);
        return newUser;
    }
};


module.exports = {
    getUserByEmail,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    postUser,
};
