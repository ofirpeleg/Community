const { Router } = require('express');
const uiRouter = new Router();

const {
    getRequestsList,
    editProfile,
    editRequest,
    addNewRequest,
    myRequestsList,
    getMyVolunteeringList
} = require("../controllers/ui.controller");

uiRouter.get("/edit-profile", editProfile);

uiRouter.get("/edit-request/:id", editRequest);

uiRouter.get("/list", getRequestsList);

uiRouter.get("/request", addNewRequest);

uiRouter.get("/my-requests", myRequestsList);

//home page
uiRouter.get("/" , getMyVolunteeringList);


module.exports =  { uiRouter };
