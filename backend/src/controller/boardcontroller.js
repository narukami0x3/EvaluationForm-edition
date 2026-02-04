const model = require('../model/boardmodel')
const j = require('../middleware/jsign')
const jwt = require('jsonwebtoken')
const { time } = require('../model/adminmodel')


exports.getuser = async (req,res) => {
    const {id} = req.params
    try{
        const row = await model.getuser(id)
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}

exports.getform = async (req,res) => {
    const {token,user_id,time_id} = req.headers
    try{
        const row = await model.getform(user_id,time_id)
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
    const {score,time_id,user_id,board_id,comment} = req.body
    const formatresult = JSON.parse(score)
    try{
        let row
        for (let item of formatresult){
            row = await model.insertresult(board_id,item.score,item.section_id,user_id,time_id) 
        }
        let filename = null
        if(req.file){
            filename = req.file.filename
        }
        const row2 = await model.insertattachment(board_id,comment,filename,user_id,time_id)
        res.status(200).json({message: "กรอกฟอร์มสำเร็จ"})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}