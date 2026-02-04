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
exports.editprofile = async (req,res) => {
    const {username,email,password,czid,salary,birthday,department,level,position} = req.body
     try{
        const row = await model.editprofile(username,email,password,czid,salary,birthday,department,level,position)
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}
exports.insertresult = async (req,res) => {
    const {score,time_id,user_id,file_id} = req.body
    const formatresult = JSON.parse(score)
    const formatfileid =
    typeof file_id === 'string' ? JSON.parse(file_id) : file_id

    const file = req.files
    console.log(file)
    try{
        let row
        let i = 0
        for (let item of formatresult){
            let filename = null
            if(formatfileid.includes(item.section_id)) filename = req.files[i].filename
            row = await model.insertresult(item.section_id,time_id,user_id,item.score,filename)
            if (filename != null) i++
        }
        const row2 = await model.insertattachment(time_id,user_id)
        res.status(200).json({message: "กรอกฟอร์มสำเร็จ"})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}
