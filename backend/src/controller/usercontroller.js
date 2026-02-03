const model = require('../model/usermodel')
const j = require('../middleware/jsign')
const jwt = require('jsonwebtoken')

exports.getform = async (req,res) => {
    const {token,time} = req.headers
    try{
        const row = await model.getform(jwt.decode(token).id,time)
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}
exports.gettime = async (req,res) => {
    try{
        const row = await model.gettime()
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}

exports.insertresult = async (req,res) => {
    const {result} = req.body
    try{
        const row = await model.insertresult(result)
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}
