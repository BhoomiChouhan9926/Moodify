const express = require('express')

const authRouter = express.Router();
const authController = require('../controller/auth.controller.js')

// @ route : http://localhost:3000/api/auth/login
authRouter.post('/login',authController.loginController)

//@route :http://localhost:3000/api/auth/register
authRouter.post('/register',authController.registerController)



module.exports = authRouter ;