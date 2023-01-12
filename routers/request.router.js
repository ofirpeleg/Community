const { Router } = require('express');
const requestRouter = new Router();
const {
    addRequest,
    getRequestById,
    getRequestsList,
    removeRequest,
    changeRequest
} = require("../controllers/request.controller");

//get all requests
requestRouter.get("/", getRequestsList);

//get request by id
requestRouter.get("/:id", getRequestById);

//delete request
requestRouter.delete("/:id", removeRequest);

//post request
requestRouter.post("/", addRequest);

//change request
requestRouter.put("/:id", changeRequest)

module.exports = { requestRouter };
