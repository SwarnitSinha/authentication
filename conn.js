const mongoose = require('mongoose')

const url = "mongodb+srv://swarnit_sinha:E0C17g5jgy8eZWwT@samrat.y89bh.mongodb.net/?retryWrites=true&w=majority/auth";


exports.conn =  mongoose.connect(url).then((result)=>{
   console.log("connection established")
}).catch((err)=>{
    console.log("err",err);
})


