const { Router } = require('express');
const userRouter = new Router();
//const verify = require("../validations/token.validation");

const {
    getAllUsers,
    getUserWithId,
    getUserWithEmail,
    removeUser,
    changeUser,

} = require("../controllers/user.controller");

//get all requests
userRouter.get("/", getAllUsers);

//get request by id
userRouter.get("/id/:id", getUserWithId);

//get request by email
userRouter.get("/email/:email", getUserWithEmail);

//delete request
userRouter.delete("/:id", removeUser);

//post request
userRouter.put("/:id", changeUser);


module.exports = { userRouter };
