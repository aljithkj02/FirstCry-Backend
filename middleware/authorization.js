const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authorize = async (req, res, next)=> {
    let token = req.headers.authorization;
    token = token && token.split(' ').pop();
    try {
        if(!token){
            return res.send({
                status: false,
                message: "Please Login First"
            })
        }

        jwt.verify(token, process.env.JWT_CLIENT_SECRET, async (err, user)=> {
            if(err) {
                return res.send({
                    status: false,
                    error: "Invalid Token! Login again",
                    message: "Please Login First"
                })
            }
            const { email, _id } = user;
            let userExist = await User.findOne({ _id, email });
            if(!userExist) {
                return res.send({
                    status: false,
                    message: "User not found! Login again"
                })
            }
            req.user = userExist;
            next();
        }); 
    } catch (err) {
        return res.send({
            status: false,
            error: err.message
        })
    }
}

module.exports = authorize;