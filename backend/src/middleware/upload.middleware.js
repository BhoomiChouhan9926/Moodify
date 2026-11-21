const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({
    storage : storage,
    limits :{
     fileSize :1024 * 1024 *10 // you can upload a file upto 5mb
    }
})

module.exports = upload