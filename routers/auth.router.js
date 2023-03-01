const { Router } = require('express');
const authRouter = new Router();
const { handleLogin , handleRegister , handleLogout} = require("../controllers/auth.controller");
const path = require("path");

//get all requests
authRouter.post("/login", handleLogin);

authRouter.post("/register" , handleRegister);

authRouter.get("/logout" , handleLogout);

authRouter.get("/new-account", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html'));
});

module.exports = { authRouter };
