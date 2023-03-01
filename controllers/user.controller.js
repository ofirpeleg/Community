const {
    getUserByEmail,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
} = require("./../DAL/user.DAL");

const { httpError } = require('../classes/httpError.class');
const { editProfileValidation } = require("../validations/auth.validation");


exports.getUserWithEmail = async (req, res, next) => {
    try {
        const user = await getUserByEmail(req, res);
        if (user) {
            res.status(200).json({ user });
        }
    } catch (error) {
        next(error)
    }
};

exports.getUserWithId = async (req, res, next) => {
    try {
        const user = await getUserById(req, res);
        if (user) {
            res.render('editProfileTemplate.ejs', { user: user })
            //res.status(200).json({ user });
        }
    } catch (error) {
        next(error)
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await getUsers(req, res);
        if (users) {
            res.status(200).json({ users });
        }
    } catch (error) {
        next(error)
    }
};

exports.changeUser = async (req, res, next) => {
    try {
        if(!req.body || !req.params.id) throw new httpError("Bad Request" , 400);
        const validationCheck  = await editProfileValidation(req.body);
        if (validationCheck.error) {
            throw new httpError('Must be valid Email and Phone number' , 400);
        }
        else {
            const user = await updateUser(req, res);
            if (!user) {
                throw new httpError("not Found", 404);
            }
            res.status(200).json({
                user: user
            });
        }
    } catch (error) {
        next(error)
    }
};

exports.removeUser = async (req, res, next) => {
    try {
        const user = await deleteUser(req, res);
        if (!user) {
            throw new httpError("not Found" , 404);
        }
        res.status(200).json({ user });
    } catch (error) {
        next(error)
    }
};


