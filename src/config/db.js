const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

async function connectDatabase(){
    let response = await mongoose.connect('mongodb://localhost:27017/firstCry');
    return response;
}

module.exports = connectDatabase;