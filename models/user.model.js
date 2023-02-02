const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        mobile: {
            type: String
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String
        },
        cart: [String],
        login_type: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User;