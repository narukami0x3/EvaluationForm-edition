const model = require('../model/board_model')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')

exports.getuser = async (req,res) => {
    const {id,time} = req.headers
    try {
        const row = await model.getuser(id,time)
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({data: row})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.getform = async (req,res) => {
    try {
        const row = await model.getform(id,time)
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({data: row})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.insertresult = async (req,res) => {
    const {score,board_id,user_id,time_id,comment,file} = req.body
    const fscore = typeof score === 'string' ? JSON.parse(score) : score
    try {
        let row
        for (item of fscore){
            row = await model.insertresult(board_id,item.indicator_id,item.score,user_id,time_id,filename)
        }
        if(!row) return res.status(400).json({error: "failed"})
        const row2 = await model.insertattachment(board_id,indicator_id,user_id,time_id,comment,file)
        if(!row2) return res.status(400).json({error: "failed"})
        res.status(200).json({message: 'success'})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}