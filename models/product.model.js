const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        id: Number,
        url1: {
            type: String,
            required: true
        },
        url2: {
            type: String,
            required: true
        },
        url3: {
            type: String,
            required: true
        },
        img1: {
            type: String,
            required: true
        },
        img2: {
            type: String,
            required: true
        },
        img3: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        strikePrice: {
            type:Number,
            required: true
        },
        off: {
            type: Number,
            required: true
        },
        delivery: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('product', productSchema);

module.exports = Product;