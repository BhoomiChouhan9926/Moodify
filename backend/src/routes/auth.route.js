const express = require('express')

const authRouter = express.Router();
const authController = require('../controller/auth.controller.js')
const authMiddleware = require('../middleware/auth.middleware.js')

// @ route : http://localhost:3000/api/auth/login
authRouter.post('/login',authController.loginController)

//@route :http://localhost:3000/api/auth/register
authRouter.post('/register',authController.registerController)

//@route :http://localhost:3000/api/auth/get-me
authRouter.get('/get-me',authMiddleware.identifyUser,authController.getMeController)

//@route : http://localhost:3000/api/auth/logout
authRouter.post('/logout',authController.logoutController)

module.exports = authRouter ;