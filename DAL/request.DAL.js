const Request = require("../models/request.models");
const { httpError } = require('../classes/httpError.class');

//add new request
const postRequest = async (req,res) => {
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
const getRequest = async (req,res) => {
    const id = req.params.id;
    const foundRequest = await Request.findOne({ _id: id})
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
            status: 'active'
        };
        const updatedRequest = await Request.findByIdAndUpdate({_id: id}, details);
        if (!updatedRequest) throw new httpError("not Updated" , 400);
        return updatedRequest;
    }
    else {
        const updatedRequest = await Request.findByIdAndUpdate({_id: id}, req.body);
        if (!updatedRequest) throw new httpError("not Updated" , 400);
        return updatedRequest;
    }
};

/*
const assignRequest = async (req,res) => {
    const id = req.params.id;
    const details = {
        assignTo: req.userid._id,
        status: 'active'
    }
    const updatedRequest = await Request.findByIdAndUpdate({_id: id}, { assignTo: req.userid._id,
        status: 'active'});
    if (!updatedRequest) throw new httpError("not Updated" , 400);
    return updatedRequest;
};
*/

module.exports = {
    getRequests,
    getRequest,
    postRequest,
    deleteRequest,
    updateRequest,
};
