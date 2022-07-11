const mongoose = require('mongoose');

const schema = mongoose.Schema({
    "username": {
        type:String,
        unique:true,
        required:true
    },
    "password":{
        type:String,
        required:true
    }
})

exports.userSchema = mongoose.model('users',schema);