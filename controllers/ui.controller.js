const {
    getRequests,
    getRequestByUserId,
    getRequest,
    getVolunteering,
} = require("../DAL/request.DAL");

const {
    getUserById
} = require("./../DAL/user.DAL");

const { httpError } = require('../classes/httpError.class');

exports.editProfile = async (req, res, next) => {
    try {
        const user = await getUserById(req, res);
        if (user) {
            res.render('editProfileTemplate.ejs', { user: user })
        }
    } catch (error) {
        next(error)
    }
};


exports.editRequest = async (req, res, next) => {
    try {
        const id = req.params.id;
        const request = await getRequest(req, res , id);
        const user = await getUserById(req, res);
        if (request && user) {
            res.render('editRequestTemplate.ejs', { request: request , user: user })
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
        if (requests) {
            //show only pending request --> waiting for connection
            const filteredRequests = requests.filter(request => request.status ==='pending'
                && request.requester_id !== req.userid._id
            );
            res.render('listTemplate-cards.ejs', { requests: filteredRequests , user: user});
        }
    } catch (error) {
        next(error)
    }
};

exports.addNewRequest = async (req, res, next) => {
    try {
        const user = await getUserById(req, res);
        if (user) {
            res.render('newRequestTemplate.ejs', { user: user })
        }
    } catch (error) {
        next(error)
    }
};

exports.myRequestsList = async (req, res, next) => {
    try {
        const userId = req.userid._id;
        const requests = await getRequests(req, res);
        const user = await getUserById(req, res);
        if (requests && user) {
            const filteredRequests = requests.filter(request => request.requester_id === userId &&
            request.status !== 'closed');
            console.log(filteredRequests);

            res.render('myRequestsTemplate.ejs', {requests: filteredRequests , user: user})
        }
    } catch (error) {
        next(error);
    }
};

exports.myRequestsList = async (req, res, next) => {
    try {
        const userId = req.userid._id;
        const requests = await getRequests(req, res);
        const user = await getUserById(req, res);
        if (requests && user) {
            const filteredRequests = requests.filter(request => request.requester_id === userId &&
                request.status !== 'closed');
            res.render('myRequestsTemplate.ejs', {requests: filteredRequests , user: user})
        }
    } catch (error) {
        next(error);
    }
};

exports.getMyVolunteeringList = async (req, res, next) => {
    try {
        const userId = req.userid._id;
        const requests = await getVolunteering(req, res);
        const user = await getUserById(req, res);
        if (requests && user) {
            res.render('homePageTemplate.ejs', {requests: requests , user: user})
        }
    } catch (error) {
        next(error);
    }
};







