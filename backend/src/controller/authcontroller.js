const model = require('../model/authmodel')
const j = require('../middleware/jsign')
const jwt = require('jsonwebtoken')

exports.getregister = async (req,res) => {
    try{
        const row = await model.getregister()
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}

exports.register = async (req,res) => {
    const {username,email,password,czid,salary,birthday,department,level,position} = req.body
    try{
        const row = await model.register(username,email,password,czid,salary,birthday,department,level,position)
        if(!row) return res.status(400).json({error:"register error"})
        res.status(201).json({message: "register success"})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error"})
    }
}

exports.login = async (req,res) => {
    const {email,password} = req.body
    try{
        const row = await model.login(email,password)
        if(!row) return res.status(400).json({error: "email or password invalid"})
        const token = await j.sign(row.id,row.username,row.role)
        if(!token) return res.status(400).json({error: "Login failed"})
        // console.log(jwt.decode(token))
        res.status(200).json({message: "login success" , auth: token})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error"})
    }
}