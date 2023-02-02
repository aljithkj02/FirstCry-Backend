const mongoose = require('mongoose');

const googleSchema = mongoose.Schema({
    name: String,
    email: String,
    login_type: String
})

const GoogleUser = mongoose.model('googleUser', googleSchema);

module.exports = GoogleUser;