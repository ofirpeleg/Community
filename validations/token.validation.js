const jwt = require('jsonwebtoken');
const { httpError } = require('../classes/httpError.class');

//assign token when logged in
module.exports = function (req,res,next) {

    const token = req.header('auth-token');
    if(!token) throw new httpError('Access Denied' , 403);

    try {
        //token is the user id only
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userid = verified._id;
        console.log({verified});
        next();
    }
    catch (error) {
        next(error)
    }
}

