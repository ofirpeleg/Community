const Request = require("../models/request.model");
const User = require("../models/user.model");
const { httpError } = require('../classes/httpError.class');

//add new request
const postRequest = async (req,res) => {
    const requesterId = req.userid._id;
    const user = User.findOne({_id: requesterId});
    const userName = user.full_name;
    //add details from cookie to req.body
    req.body.name = userName;
    req.body.requester_id = requesterId;
    console.log(req.body);
    const request = new Request(req.body);
        const newRequest = await request.save();
        if (!newRequest) throw new httpError("Unable to add new Request" , 400);
        return res.status(200).json({
            request: newRequest
        });
};

//get all requests
const getRequests = async (req, res) => {
    const requests = Request.find({});
    if (!requests || requests.length < 0) throw new httpError("Unable to find requests" , 404);
    return requests;
};

//get request by id
const getRequest = async (req,res,id) => {
    const foundRequest = await Request.findOne({ _id: id});
    if (!foundRequest) throw new httpError("Not exists" , 404);
    return foundRequest;
};

//delete request
const deleteRequest = async (req,res) => {
    const deleteRequest = Request.findByIdAndRemove(req.params.id);
    console.log(deleteRequest);
    if (!deleteRequest) throw new httpError("not Deleted" , 400);
    return deleteRequest;
};

const updateRequest = async (req,res) => {
    const id = req.params.id;
    //if apply for request ->
    if(JSON.stringify(req.body) === '{}') {
        const details = {
            assignTo: req.userid._id,
            status: 'active',
            notify: 'yes'
        };
        const updatedRequest = Request.findByIdAndUpdate({_id: id}, details);
        if (!updatedRequest) throw new httpError("not Updated" , 400);
        return updatedRequest;
    }
    // else - regular edit
    else {
        const updatedRequest = Request.findByIdAndUpdate({_id: id}, req.body);
        if (!updatedRequest) throw new httpError("not Updated" , 400);
        return updatedRequest;
    }
};

const getRequestByUserId = async (req,res) => {
    const request = Request.findOne({ requester_id: req.userid._id});
    if (!request) throw new httpError("not Found" , 400);
    return request;
};

const getRequestsToNotify = async (req,res) => {
    const requests = Request.find({ requester_id: req.userid._id , notify: 'yes'});
    if (!requests) throw new httpError("no requests to notify" , 400);
    return requests;
};

const updateNotified = async (req,res) => {
    const details = {
        notify: 'no',
    }
    const requests = Request.updateMany({notify: 'yes'} , details);
    if (!requests) throw new httpError("not updated" , 400);
    return requests;
};

module.exports = {
    getRequests,
    getRequest,
    postRequest,
    deleteRequest,
    updateRequest,
    getRequestByUserId,
    getRequestsToNotify,
    updateNotified
};
