const multer = require('multer')
const path = require('path')
const {randomUUID} = require('crypto')
const valid = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png"
]

const filefilter = (req,file,cb) => {
    if(!valid.includes(file.memetype)) return cb(new Error("invlid file type"),false)
    cb(null,true)
}

const storage = multer.diskStorage({
    filename: (req,file,cb) => {
        const fname = Buffer.from(file.originalname, 'latin1').toString('utf-8')
        cb(null,randomUUID() + Date.now() + '-' + fname)
    },
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname , ".." , "upload"))
    }
})

module.exports = multer({
    filefilter,
    storage,
    limits: {
        fileSize: 30 * 1024 * 1024
    }
})