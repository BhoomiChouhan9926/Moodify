const mongoose = require('mongoose')

 function ConnectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to database")
    }).catch(err =>{
        console.log("err in connecting to DB",srr)
    })
 }
module.exports = ConnectToDb ;