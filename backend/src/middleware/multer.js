const multer = require('multer')

const valid = ["application/pdf","image/png","image/jpg","image/jpeg"]
const path = require('path')
const {randomUUID} = require('crypto')

const filefilter = (req,file,cb)=>{
    if(!valid.includes(file.mimetype)) cb(new Error("invalid file type"),false)
    cb(null,true)
}

const storage = multer.diskStorage({
    filename: (req,file,cb)=>{
        const filename = Buffer.from(file.originalname , 'latin1').toString('utf-8')
        cb(null,randomUUID() + "-" + Date.now() + "-" + filename)
    },
    destination: (req,file,cb)=>{
        cb(null,path.join(__dirname,"..","upload"))
    }
})

module.exports = multer({
    filefilter,
    storage,
    limits: 30 * 1024 *1024
})