const userModel = require('../models/user.model.js')
const blackListModel = require('../models/blackList.model.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const redis = require('../config/cache.js')

async function registerController(req,res){
    const {username,email,password} = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or :[
            {username},
            {email}
        ]
    })
if(isUserAlreadyExist){
    return res.status(409).json({
        message : isUserAlreadyExist.email === email ? "User already exist with this email" : "User already exist with this username "
    })
}

const hash = await bcrypt.hash(password,10);
// if user do not exist the creating unser
const user = await userModel.create({username,email,password:hash})
//generating token

const token = jwt.sign({
    username : user.username,
    id : user._id
},process.env.SECRET_KEY,
 { expiresIn: '3d' })

 // set token at cookie storage
 res.cookie('token',token)

 return res.status(201).json
 ({
    message:"User registered  successfully" ,
    user : {
        id:user._id,
        username:user.username,
        email : user.email
    }  
 })
}

async function loginController(req,res){
    const {username, email,password} = req.body

    const user = await userModel.findOne({
        $or : [
            {email},
            {username}
        ]
    }).select("+password")

    if(!user){
        return res.status(400).json({
            message:"Invalid Credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
         return res.status(400).json({
            message:"Invalid Credentials"
        })

    }
    const token = jwt.sign(
        {
        username : user.username,
        id : user._id
    }
    ,process.env.SECRET_KEY,
    { expiresIn: '3d' })

 // set token at cookie storage
    res.cookie('token',token)

  return  res.status(200).json({
        message:"User logged in successfully" ,
        user :{
            id:user._id,
            username : user.username,
            email:user.email
        } 
      })

}
async function getMeController(req,res){
    
    const user = await userModel.findById(req.user.id)

    return res.status(200).json({
        message:"User fetched successfully",
        user
    })
    

}

async function logoutController(req,res){
    const token = req.cookies.token ;
    res.clearCookie('token');
// instead of using mongo db fro token blackListing we will use redis for token blacklisting
   // const blackListToken = await blackListModel.create({token})
  await redis.set(token,Date.now().toString(),'EX', 60*60)

    return res.status(200).json({
        message:"User logout successfully"
    })
}


module.exports = {
    loginController,
    registerController,
    getMeController,
    logoutController
}