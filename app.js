const {register} = require('./src/controllers/insertInDb');
const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

// const {validate} = require('./src/middleware/auth.middleware');
const loginController = require('./src/controllers/auth.controllers').login;
require('./conn');
// const users = require('./src/utils/data.utils').users;
const {body, validationResult} = require('express-validator');

app.use(express.json());
const {validation,isUserExist} = require('./src/middleware/auth.middleware');
const { userSchema } = require('./src/model/user.model');


const portNo = 8181;

// app.use('/',route);

app.get('/',(req,res)=>{
    res.send("Welcome to the website");
})

app.get('/api/friends',(req,res)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.send("Login First");
    }

    //how to verify token
    const verified = jwt.verify(token,"SwarNit234");
    if(verified){
        return res.send("Secret Product");
    }
    else{
        return res.send("Don't be oversmart");
    }
})

app.post('/api/login',
    body('username','Valid Username is Required').isString().not().isEmpty(),
    validation,
    isUserExist,
    loginController)

app.post('/api/register',
    body('username','Valid Username is Required').isString().not().isEmpty(),
    body('password',"length must be greater than 5").isString().isLength({min:5}),
    validation,
    register);

app.get("/userlist", async (req,res)=>{
    const users = await userSchema.find({},{password:0,_id:0});
    res.send(users);
})


app.use((err,req,res,next)=>{
    var status = err.status;
    if(!status){
        status = 500
    }

    return res.status(status).send(err);
})



app.listen(portNo,()=>{
    console.log(`Server is running at ${portNo}`);
})