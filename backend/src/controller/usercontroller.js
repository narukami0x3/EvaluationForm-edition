const model = require('../model/user_model')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')

exports.getusersign = async (req,res) => {
    const {id,time} = req.headers
    try {
        const row = await model.getusersign(id,time)
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({data: row})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.getform = async (req,res) => {
    try {
        const row = await model.getform()
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({data: row})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.gettime = async (req,res) => {
    try {
        const row = await model.gettime()
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({data: row})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.getprofile = async (req,res) => {
    const {id} = req.params
    try {
        const row = await model.getprofile(id)
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({data: row})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.editprofile = async (req,res) => {
    const {username,email,password,czid,phone,department,position,level,id} = req.body
    try {
        const row = await model.getprofile(username,email,password,czid,phone,department,position,level,id)
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({message: 'success'})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.insertresult = async (req,res) => {
    const {score,user_id,time_id,file_id} = req.body
    const fscore = typeof score === 'string' ? JSON.parse(score) : score
    let ffile = []
    if(file_id){
        ffile = typeof file_id === 'string' ? JSON.parse(file_id) : file_id
    }
    try {
        let row
        let i = 0
        for (item of fscore){
            let filename = null
            if(!ffile.includes(item.indicator_id)) filename = req.files[0].filename
            console.log(filename)
            row = await model.insertresult(item.indicator_id,item.score,user_id,time_id,filename)
            if(filename != null) i++
        }
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({message: 'success'})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}