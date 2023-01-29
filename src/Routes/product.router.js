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

router.get( '/cart/:id', authorize, async (req, res)=> {
    let product_id = req.params.id;
    try {
        let user = req.user;
        let flag = await User.findOne({_id: user._id, cart: { $in : [ product_id ]} });
        if(!flag) {        
            user.cart.push(product_id);
            let updatedData = await User.findOneAndUpdate({ _id: user._id}, { cart: user.cart}, { new: true});
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

router.get('/getone/:id', authorize, async (req, res)=> {
    let id = req.params.id;
    try {
        let product = await Product.findOne({ _id: id});
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

router.get('/filter',  async (req, res)=> {
    let price = req.query.price;
    let disc = req.query.disc;
    let color = req.query.color;
    let sort = req.query.sort;

    let filterObj = { $and: [] };
    let sortObj;
    if(price !== 'null'){
        price = price.split('-').map(Number);
        filterObj.$and.push({ price:{ $gte: price[0] } }, {price: { $lt: price[1] }});
    }
    if(disc !== 'null'){
        disc = disc.split('-').map(Number);
        filterObj.$and.push({ off: { $gte: disc[0]} }, { off: { $lt: disc[1]} });
    }
    if(color !== 'null'){
        filterObj.$and.push({ color });
    }
    if(sort === 'disc'){
        sort = { off: -1}
    }else if(sort === 'lth'){
        sort = { price: 1}
    }else if(sort === 'htl'){
        sort = { price: -1}
    }else if(sort === 'atz'){
        sort = { title: 1}
    }else if(sort === 'zta'){
        sort = { title: -1}
    }
    if(price === 'null' && disc === 'null' && color === 'null')  filterObj = {};         

    try {
        let result;
        if(sort !== null){
            result = await Product.find(filterObj).sort(sort);
        }else{
            result = await Product.find(filterObj);
        }
        res.send({data: result})
    } catch (err) {
        res.send({
            success: false,
            error: err.message
        })
    }
})

router.get('/count/:id', async (req, res)=> {
    let id = req.params.id;
    try {
        let data = await User.findOne({ _id: id });
        let length = data.cart.length;
        return res.send({
            success: true,
            size: length
        })
    } catch (err) {
        res.send({
            success: false,
            error: err.message,
            size: 0
        })
    }
})

router.get( '/search/:text', async(req, res)=> {
    let text = req.params.text;
    try {
        let data;
        if(text === 'all'){
            data = await Product.find({});
        }else{
            data = await Product.find({ title: {$regex: text, $options: 'i' }});
        }
        res.send({
            success: true,
            data
        })
    } catch (err) {
        res.send({
            success: false,
            error: err.message,
            size: 0
        })
    }
})

router.get('/clearcart', authorize, async (req, res)=> { 
    let user = req.user;
    try {
        user = await User.findOneAndUpdate({ _id: user._id}, { cart: []});
        res.send({data: user})
    } catch (err) {
        res.send({
            success: false,
            error: err.message
        })
    }
})


module.exports = router;