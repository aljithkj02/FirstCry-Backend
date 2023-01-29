const { Router }  = require('express');
const crudController = require('../controller/crud.controller');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const router = Router();

function generateToken (data){
    let token = jwt.sign(data, process.env.JWT_CLIENT_SECRET);
    return token;
}

router.post('/register', async (req, res)=> {
    try {
        let existingUser = await User.findOne({ email: req.body.email, mobile: req.body.mobile});
        if(existingUser) {
            return res.send({
                success: false,
                message: 'User with this email or number already exist'
            })
        }
        let result = await crudController(User).post(req, res);
    } catch (err) {
        res.send({
            success: false,
            error: err.message
        })
    }
})

router.post('/login', async(req, res)=> {
    try {
        let existingUser = await User.findOne({ email: req.body.email});
        if(!existingUser){
            return res.send({
                status: false,
                message: "User with this email doesn't exist"
            })
        }
        existingUser = await User.findOne({ password: req.body.password});
        if(!existingUser){
            return res.send({
                status: false,
                message: "Incorrect password"
            })
        }
        let { name, email, _id, mobile } = existingUser;
        let userObj = {
            name, email, _id
        }
        let token = generateToken(userObj);
        res.send({
            success: true,
            user: {
                name,
                _id
            },
            token
        })

    } catch (err) {
        res.send({
            success: false,
            error: err.message
        })
    }
})

module.exports = router;