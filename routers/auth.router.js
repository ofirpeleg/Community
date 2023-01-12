const { Router } = require('express');
const authRouter = new Router();
const { handleLogin , handleRegister } = require("../controllers/auth.controller");

//get all requests
authRouter.post("/login", handleLogin );
authRouter.post("/register" , handleRegister)


module.exports = { authRouter };
