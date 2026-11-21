const express  = require('express')
const cookieParser = require('cookie-parser')
const authRouter = require('../src/routes/auth.route.js')
const songRouter = require('../src/routes/song.route.js')
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173', // Your React/Vite frontend URL
  credentials: true
}));

// here we ahve all the Router
//@route : http://localhost:3000/api/auth
// description : to perform authentication realated task
app.use('/api/auth',authRouter)

//@route : http://localhost:3000/api/song
// description this is the route to upload the songs on the server 
// this is not a protected route
app.use('/api/song',songRouter)

module.exports = app;