
require('dotenv').config();
const express = require('express');
const connectDatabase = require('./config/db');
const productRouter = require('./Routes/product.router');
const authRouter = require('./Routes/auth.router'); 
const cors = require('cors')
const passport = require('passport');
require('./controller/google.authenticate');
const session = require('express-session');

const app = express();
app.use(cors());
app.use(session({ 
    secret: process.env.SESSION_SECRET ,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());


app.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}));   

app.get('/google/callback', passport.authenticate('google', 
        { successRedirect: process.env.GOOGLE_SUCCESS_REDIRECT, failureRedirect: process.env.GOOGLE_FAILURE_REDIRECT }));

app.use('/products', productRouter); 
app.use('/auth', authRouter);


app.get('/success', (req, res)=>{
    console.log(req.user);
    res.send({
        message: 'success',
        user: req.user
    });   
})   
app.get('/failure', (req, res)=>{
    res.send({message: 'failed'}); 
})

app.get('/', (req, res)=>{
    res.send(process.env.PORT); 
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
startServer();