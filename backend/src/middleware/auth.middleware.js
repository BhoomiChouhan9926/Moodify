const jwt = require('jsonwebtoken')
const blackListModel = require ('../models/blackList.model')
const redis = require('../config/cache')

async function identifyUser(req,res,next){
    const token = req.cookies.token ;

    if(!token){
        return res.status(401).json({
            message :"Token not provided"
        })
    }
    const isTokenBlackListed = await redis.get(token)
    if(isTokenBlackListed) {
        return res.status(401).json
        ({
            message : "Invalid token" 
         })
    }
    // if token is present then we will get the user data from token
    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        req.user = decoded
        next();
    }catch(err){
         return res.status(401).json({
            message :"Invalid token"
        })
        
    }
}


module.exports = {
    identifyUser

}