const express = require('express');
require('dotenv').config();
const connectDatabase = require('./config/db');
const productRouter = require('./routes/product.router');
const authRouter = require('./routes/auth.router');
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

app.use('/products', productRouter);
app.use('/auth', authRouter);

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