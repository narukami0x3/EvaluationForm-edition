const multer = require('multer')
const path = require('path')
const {randomUUID} = require('crypto')

const storage = multer.diskStorage({
    destination: path.join(__dirname,"..","upload"),
    filename: (req,file,cb) => {
        
    }
})