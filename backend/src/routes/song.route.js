const express = require('express')

const songRouter = express.Router()
const songController = require('../controller/song.controller')
const upload = require('../middleware/upload.middleware')

//@route :http://localhost:3000/api/song/
songRouter.post('/',upload.single("song"),songController.uploadSongController)


//@route : http://localhost:3000/api/song/ 
//desc : get songs on the basis of mood
songRouter.get('/',songController.getSongsByMoodController)
module.exports = songRouter;