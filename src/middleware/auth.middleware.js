const { validationResult } = require('express-validator');
const createError = require('http-errors');
const {userSchema} = require("../model/user.model");

exports.validation = (req,res,next)=>{


    const error = validationResult(req);

    if(!error.isEmpty()){
        const validationErr = createError(400,{errName:"validation error",msg:error.array()})
        next(validationErr);
    }
    next();
}

exports.isUserExist =async (req,res,next)=>{
    //find the user and check the password
    const userName = req.body.username;
    const password = req.body.password;
    const user = await userSchema.findOne({"username":userName,"password":password});
    if(!user){
        next("Invalid username or password");
    }
    next();
}