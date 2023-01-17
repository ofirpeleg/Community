//for web tokens
const jwt = require('jsonwebtoken');
//environment variables
require('dotenv').config();
//for password decrypt
const bcrypt = require('bcrypt');
//login validation util
const { loginValidation , registerValidation } = require("../validations/auth.validation");
//http error class
const { httpError } = require('../classes/httpError.class');

const {
    postUser,
    getUserByEmail
} = require("../DAL/user.DAL");


const handleLogin = async (req, res, next) => {

    //request-->logged in-->set Token-->system remember you logged in
    try {

    const validationCheck  = await loginValidation(req.body);
    if (validationCheck.error) {
        console.log(validationCheck.error)
        throw new httpError('Must be valid Email' , 400);
    }

            //no email or password
            const {email, password} = req.body;
            if (!email || !password) throw new httpError('Bad request - Email and Password are required!' , 400);

            //find user by email
            const foundUser = await getUserByEmail(req, res);
            if (!foundUser) throw new httpError("Email doesn't exist" , 404);

            //compare passwords
            const match = await bcrypt.compare(req.body.password, foundUser.password);

            //create and assign token
            const token = jwt.sign({_id: foundUser._id}, process.env.ACCESS_TOKEN_SECRET , { expiresIn: '30m'});
            if (match) {
                res.status(200).cookie("token", token, {
                    httpOnly: true,

                }).json({
                    message: 'success',
                    user: {
                        foundUser
                    },
                    "jwtToken": token
                })
            } else {
                throw new httpError('Wrong password' , 400);
            }
        } catch (error) {
            next(error)
        }
};

const handleRegister = async (req, res, next) => {

    try {
    const validationCheck = registerValidation(req.body);
    if (validationCheck.error) throw new httpError('Must be valid Email' , 404);

        //hash Password
        const hashPassword = await bcrypt.hash(req.body.password, 12);

        const user = { ...req.body , password:hashPassword };
        const addedUser = await postUser(user);
        if (addedUser) {
            const token = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET);
            res.cookie('token', token, {httponly: true});
            res.status(200).header('auth-token', token).json({
                message: 'success',
                user: {
                    addedUser
                },
                cookie: token
            });
        }
        }  catch(error) {
            next(error)
        }
};


exports.getInfoFromToken = async (req,res,next) => {
    const token = req.cookies.token;
    try {
        const  userId  = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json(userId);
    } catch (error) {
        next(error);
    }
}

module.exports = { handleLogin , handleRegister };
