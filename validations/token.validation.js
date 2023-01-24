const jwt = require('jsonwebtoken');
const { httpError } = require('../classes/httpError.class');


const tokenVerify = async (req, res, next) => {

        const token = req.cookies.token;
        if(token) {
                const decode = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
                const {exp} = decode;

                if (exp > (new Date().getTime() + 1) / 1000) {
                        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                        req.userid = verified;
                        next();
                } else {
                        res.redirect('/');
                        res.end();
                }
        } else {
                res.redirect('/');
                res.end();
        }
};

module.exports = {
    tokenVerify
}


