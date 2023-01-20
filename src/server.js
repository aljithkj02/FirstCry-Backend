const express = require('express');
require('dotenv').config();
const connectDatabase = require('./config/db');
const productController = require('./controller/product.controller');

const app = express();

app.use(express.json());

app.use('/products', productController);

app.get('/', (req, res)=>{
    res.send(process.env.PORT)
})



function startServer(){
    connectDatabase().then((res)=> {
        app.listen(process.env.PORT, ()=> {
            console.log('Server started, Listening to localhost: ', process.env.PORT);
        })
    }).catch((err)=> {
        console.log(err);
    })
    
}

module.exports = startServer;