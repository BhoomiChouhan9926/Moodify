const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique : [true,"Usename must be usnique"]
    },
    email :{
        type:String,
        required:[true,"Email is required"],
        unique : [true,"Email must be usnique"]

    },
    password:{
        type:String,
        required:[true,"Password is required"]

    }
})

const userModel = mongoose.model("users",userSchema);

module.exports = userModel;