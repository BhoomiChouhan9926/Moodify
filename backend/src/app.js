const express  = require('express')
const cookieParser = require('cookie-parser')
const authRouter = require('../src/routes/auth.route.js')

const app = express();
app.use(express.json())
app.use(cookieParser())

// here we ahve all the Router
//@route : http://localhost:3000/api/auth
// description : to perform authentication realated task
app.use('/api/auth',authRouter)

module.exports = app;