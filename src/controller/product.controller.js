const { Router } = require('express');
const Product = require('../models/product.model');
const crudController = require('./crud.controller');

const router =  Router();

router.get( '/', async ( req, res ) => {
    crudController( Product ).get( req, res );
})

router.post( '/', async ( req, res ) => {
    crudController( Product ).post( req, res );
})


module.exports = router;