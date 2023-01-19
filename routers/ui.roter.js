const { Router } = require('express');
const uiRouter = new Router();
const path = require("path");

const {
    getRequestsList,
    editProfile
} = require("../controllers/ui.controller");

uiRouter.get("/edit", editProfile);

uiRouter.get("/list", getRequestsList);

module.exports =  { uiRouter };
