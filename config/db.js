const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

async function connectDatabase(){
    let response = await mongoose.connect(process.env.MONGO_URL);
    return response;
}   

module.exports = connectDatabase;