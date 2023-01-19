const {
    getRequests,
    getRequest,
    deleteRequest,
    postRequest,
    updateRequest,
} = require("../DAL/request.DAL");

const {
    getUserById
} = require("./../DAL/user.DAL");

const { httpError } = require('../classes/httpError.class');

exports.editProfile = async (req, res, next) => {
    try {
        const user = await getUserById(req, res);
        if (user) {
            res.render('editUserTemplate.ejs', { user: user })
        }
    } catch (error) {
        next(error)
    }
};

exports.getRequestsList = async (req, res, next) => {
    try {
        const user = await getUserById(req, res);
        if(!user) {
            throw httpError(400,'not found');
        }
        const requests = await getRequests(req, res);
        //show only pending request --> waiting for connection
        const filteredRequests = requests.filter(request => request.status ==='pending');
        if (requests) {
            res.render('listTemplate-cards.ejs', { requests: filteredRequests , user: user});
        }
    } catch (error) {
        next(error)
    }
};



