const { Router } = require('express');
const requestRouter = new Router();
const {
    addRequest,
    getRequestById,
    getRequests,
    removeRequest,
    changeRequest,
    toNotify,
    updateMany
} = require("../controllers/request.controller");

requestRouter.get("/notify", toNotify);

//get all requests
requestRouter.get("/", getRequests);

//get request by id
requestRouter.get("/:id", getRequestById);

//delete request
requestRouter.delete("/:id", removeRequest);

//post request
requestRouter.post("/", addRequest);

//change request
requestRouter.put("/update-many", updateMany);

//change request
requestRouter.put("/:id", changeRequest);

module.exports = { requestRouter };
