const jwt = require('jsonwebtoken');
const { httpError } = require('../classes/httpError.class');


const tokenVerify = async (req, res, next) => {

        const token = req.cookies.token;
        if (!token) { return res.redirect('/'); }

        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userid = verified;
        next();

};

module.exports = {
    tokenVerify
}


