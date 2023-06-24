//to use web token must require it and bring in secret_key variable from .env file
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

module.exports = {
    authenticate: (req, res, next) => { //method named authenticate w/parameter taking in: request, response and next
        jwt.verify(req.cookies.usertoken, secret, (err, payload) => { //jwt built in method verify(), verifies the request cookie token and the secret, if they aren't verified, give the error, if they are verified move to next code block
            if (err) {
                res.status(401).json({ verified: false });
            } else {
                next();
            }
        });
    }
}