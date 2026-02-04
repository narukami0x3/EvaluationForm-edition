const model = require('../model/adminmodel')
const jwt = require('jsonwebtoken')

exports.gettime = async (req,res) => {
    try{
        const row = await model.gettime()
        res.status(200).json({test: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}

exports.getgroup = async (req,res) => {
    try{
        const row = await model.getgroup()
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}

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

exports.getindicator = async (req,res) => {
    try{
        const row = await model.getindicator()
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}

exports.getsection = async (req,res) => {
    try{
        const row = await model.getsection()
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}

exports.getresult = async (req,res) => {
    try{
        const row = await model.getresult()
        let sum = 0
        let score = 0
        for (item of row){
            if (item.selfscore == "yes" || item.selfscore == "no") {score = 4}
            else{score = item.selfscore}
            sum = sum + (score * item.weight)
            console.log(sum)
        }
        res.status(200).json({data: row , sum: sum})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}

exports.insertgroup = async (req,res) => {
    const {member,token} = req.body
    try{
        if(jwt.decode(token).role != 1) return res.status(401).json({error: "access denied"})
        const row = await model.insertgroup(member)
        if(!row) return res.status(400).json({error: "group failed"})
        res.status(200).json({data: "สร้างกรุ่มกรรมการสำเร็จ"})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}

exports.edituser = async (req,res) => {
    const {username,password,email,czid,salary,birthday,department,level,position,id,token} = req.body
    try{
        if(jwt.decode(token).role != 1) return res.status(401).json({error: "access denied"})
        const row = await model.edituser(username,password,email,czid,salary,birthday,department,level,position,id)
        if(!row) return res.status(400).json({error: "edit failed"})
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}

exports.insertmember = async (req,res) => {
    const {member,token} = req.body
    try{
        if(jwt.decode(token).role != 1) return res.status(401).json({error: "access denied"})
        const row = await model.insertmember(member)
        if(!row) return res.status(400).json({error: "member failed"})
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}

exports.insertindicator = async (req,res) => {
    const {indicator,weight,token} = req.body
    try{
        if(jwt.decode(token).role != 1) return res.status(401).json({error: "access denied"})
        const row = await model.insertindicator(indicator,weight)
        if(!row) return res.status(400).json({error: "indicator failed"})
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}

exports.insertsection = async (req,res) => {
    const {section,indicator_id,detail,type,file,token} = req.body
    try{
        if(jwt.decode(token).role != 1) return res.status(401).json({error: "access denied"})
        const row = await model.insertsection(section,indicator_id,detail,file,type)
        if(!row) return res.status(400).json({error: "section failed"})
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}
exports.deletegroup = async (req,res) => {
    const {group_id} = req.params
    const {token} = req.body
    try{
        if(jwt.decode(token).role != 1) return res.status(401).json({error: "access denied"})
        const row = await model.deletegroup(group_id)
        if(!row) return res.status(400).json({error: "group failed"})
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}
exports.deletemember = async (req,res) => {
    const {user_id,group_id} = req.params
    const {token} = req.body
    try{
        if(jwt.decode(token).role != 1) return res.status(401).json({error: "access denied"})
        const row = await model.deletememeber(user_id,group_id)
        if(!row) return res.status(400).json({error: "member failed"})
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}



