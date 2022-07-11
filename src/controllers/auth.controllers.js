const jwt = require('jsonwebtoken');

const generateToken = (userName)=>{
    const secretKey = "SwarNit234"

    let data = {
        time : Date(),
        user : userName
    }

    const token = jwt.sign(data, secretKey);
  
    return token;


}

exports.login = (req,res,next)=>{

    //validate for username and password
    
    console.log(res.locals.username);
    const token = generateToken(req.body.username);
    return res.send(`${req.body.username} logged in successfully \n 
                and your toke is  = ${token}`);

    // generateToken(req.body.username);
}