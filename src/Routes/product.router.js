const { Router } = require('express');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const crudController = require('../controller/crud.controller');
const authorize = require('../middleware/authorization');

const router =  Router();

router.get( '/', authorize,  async ( req, res ) => {
    crudController( Product ).get( req, res );
})

router.post( '/', async ( req, res ) => {
    crudController( Product ).post( req, res );
})

router.get( '/cart', authorize, async (req, res)=> {
    try {
        const { cart } = req.user;
        let products = await Product.find({ _id: { $in: cart }});
        res.send({
            success: true,
            data: products
        })
    } catch (err) {
        res.send({
            success: false,
            error: err.message
        })
    }
})

router.patch( '/cart', authorize, async (req, res)=> {
    let { data } = req.body;
    const { _id } = req.user;
    try {
        let user = await User.findOne({ _id });
        if(!user) {
            return res.send({
                success: false,
                message: 'Please do login first!'
            })
        }      
        let updatedData = await User.findOneAndUpdate({ _id }, { cart: data }, { new: true});
        return res.send({
            success: true,
            message: 'Product successfully added to the cart',
            data: updatedData
        })    
    } catch (err) {
        res.send({
            success: false,
            error: err.message
        })
    }
})

router.post( '/cart', authorize, async (req, res)=> {
    let { user_id, product_id } = req.body;
    try {
        let user = await User.findOne({ _id: user_id });
        if(!user) {
            return res.send({
                success: false,
                message: 'Please do login first!'
            })
        }
        let flag = await User.findOne({_id: user_id, cart: { $in : [ product_id ]} });
        if(!flag) {        
            user.cart.push(product_id);
            let updatedData = await User.findOneAndUpdate({ _id: user_id}, { cart: user.cart}, { new: true});
            return res.send({
                success: true,
                message: 'Product successfully added to the cart'
            }) 
        }
        res.send({
            success: false,
            message: 'Product already exist in the cart'
        })      
    } catch (err) {
        res.send({
            success: false,
            error: err.message
        })
    }
})

router.post('/getone', async (req, res)=> {
    let _id = req.body._id;
    try {
        let product = await Product.findOne({ _id });
        if(product.length == 0) {
            return {
                success: false,
                message: 'Product not found'
            }
        }
        return res.send({
            success: true,
            data: product
        });
    } catch (err) {
        res.send({
            success: false,
            error: err.message
        })
    }
})


module.exports = router;