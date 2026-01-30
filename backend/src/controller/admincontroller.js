const model = require('../model/adminmodel')

exports.gettime = async (req,res) => {
    try{
        const row = await model.gettime()
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}

exports.getuser = async (req,res) => {
    try{
        const row = await model.getuser()
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
exports.insertgroup = async (req,res) => {
    const {member} = req.body
    try{
        const row = await model.insertgroup(member)
        if(!row) return res.status(400).json({error: "group failed"})
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}

exports.edituser = async (req,res) => {
    const {username,password,email,czid,salary,birthday,department,level,position,id} = req.body
    try{
        const row = await model.edituser(username,password,email,czid,salary,birthday,department,level,position,id)
        if(!row) return res.status(400).json({error: "edit failed"})
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}

exports.insertmember = async (req,res) => {
    const {member} = req.body
    try{
        const row = await model.insertmember(member)
        if(!row) return res.status(400).json({error: "member failed"})
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}

exports.insertindicator = async (req,res) => {
    const {indicator,weight} = req.body
    try{
        const row = await model.insertindicator(indicator,weight)
        if(!row) return res.status(400).json({error: "indicator failed"})
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}

exports.insertsection = async (req,res) => {
    const {section,detail,type} = req.body
    try{
        const row = await model.insertsection(section,detail,type)
        if(!row) return res.status(400).json({error: "section failed"})
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}
exports.deletegroup = async (req,res) => {
    const {group_id} = req.body
    try{
        const row = await model.deletegroup(group_id)
        if(!row) return res.status(400).json({error: "group failed"})
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}
exports.deletemember = async (req,res) => {
    const {user_id,group_id} = req.body
    try{
        const row = await model.deletememeber(user_id,group_id)
        if(!row) return res.status(400).json({error: "member failed"})
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({error: "database error", data: null})
    }
}



