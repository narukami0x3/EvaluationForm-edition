const model = require('../model/auth_model')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')

exports.register = async (req,res) => {
    const {username,email,password,czid,phone,department,position,level} = req.body
    try {
        const row = await model.register(username,email,password,czid,phone,department,position,level)
        if(!row) return res.status(400).json({error: "register failed"})
        res.status(200).json({message: "success"})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.login = async (req,res) => {
    const {email,password} = req.body
    try {
        const row = await model.login(email,password)
        if(!row) return res.status(401).json({error: "invalid email or password"})
        const token = await auth.sign(row.id,row.username,row.role)
        if(!token) return res.status(401).json({error: "login failed"})
        console.log(jwt.decode(token))
        res.status(200).json({auth: token})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}