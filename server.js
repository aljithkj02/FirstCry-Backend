const express = require('express');
require('dotenv').config();
const connectDatabase = require('./config/db');
const productRouter = require('./routes/product.router');
const authRouter = require('./routes/auth.router'); 
const cors = require('cors')
const passport = require('passport');
require('./controller/google.authenticate');
const session = require('express-session');

const app = express();
app.use(cors());
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());


app.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}));   

app.get('/google/callback', passport.authenticate('google', 
        { successRedirect: 'http://127.0.0.1:5500/login/login.html', failureRedirect: '/failure' }));

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

module.exports = startServer;