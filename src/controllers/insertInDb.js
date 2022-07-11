const {userSchema} = require("../model/user.model");
// const mongoose = require('mongoose');


exports.register = async (req,res)=> {
    try {
        
        // Construct a document       
        const userName = req.body.username;
        const password = req.body.password;

        const result= await userSchema.findOne({username:userName});
            
        if (result) {
            return res.status(400).json({
            error: true,
            errorMsg: "That username is already registered!",
            });
        }
        else{
            
            var user = new userSchema({
                "username":userName,
                "password":password                
            })
            var error=0;
            user.save((err,result)=>{
                if(err){
                    error = 1;
                    console.log("there's an error");
                }
                else{
                    error = 0;
                    console.log("everything's working fine");
                }
            })
            if(error==1){
                return res.status(400).json({
                    error: true,
                    errorMsg: "Internal error!",
                })
            }
            else{
                return res.status(201).json({error:false, msg: "Signup Successful!"});
            }
        }
        
    
    } catch (error){
        console.error(error);
      return res
        .status(500)
        .json({ error: true, errorMsg: "Internal Server Error!" });
    }
}