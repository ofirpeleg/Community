const {
    getRequests,
    getRequest,
    deleteRequest,
    postRequest,
    updateRequest
} = require("../DAL/request.DAL");

const { httpError } = require('../classes/httpError.class');

exports.addRequest = async (req, res, next) => {
    try {
        const newRequest= await postRequest(req, res);
        res.status(200).json({ newRequest });
    } catch (error) {
        next(error)
    }
};

exports.getRequestById = async (req, res, next) => {
    try {
        if(!req.params.id) throw new httpError("Bad Request" , 400)
        const request = await getRequest(req, res);
        if (request) {
            res.status(200).json({ request });
        }
    } catch (error) {
        next(error)
    }
};


exports.getRequestsList = async (req, res, next) => {
    try {
        const requests = await getRequests(req, res);
        if (requests) {
            res.render('listTemplate.ejs', { requests: requests })
        }
    } catch (error) {
        next(error)
    }
};


exports.removeRequest = async (req, res, next) => {
    try {
        if(!req.params.id) throw new httpError('Bad Request' , 400);
        const request = await deleteRequest(req, res);
        if (!request) {
            throw new httpError("Request not found" , 404);
        }
        res.status(200).json({
            message: "success",
            deletedRequest: request
        });
    } catch (error) {
        next(error)
    }
};

exports.changeRequest = async (req, res, next) => {
    try {
        if(!req.body || !req.params.id) throw new httpError("Bad Request" , 400)
        const request = await updateRequest(req, res);
        if (!request) {
            throw new httpError("not Found" , 404);
        }
        res.status(201).json({ request });
    } catch (error) {
        next(error)
    }
};

