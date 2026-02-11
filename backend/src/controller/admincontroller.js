const model = require('../model/admin_model')
const auth = require('../middleware/auth')

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

exports.getusersign = async (req,res) => {
    try {
        const row = await model.getusersign()
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({data: row})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.getboardsign = async (req,res) => {
    try {
        const row = await model.getboardsign()
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({data: row})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.time = async (req,res) => {
    try {
        const row = await model.gettime()
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({data: row})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.getuser = async (req,res) => {
    try {
        const row = await model.getuser()
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({data: row})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.insertsection = async (req,res) => {
    const {section,weight} = req.body
    try {
        const row = await model.insertsection(section,weight)
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({message: "success"})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.insertindicator = async (req,res) => {
    const {indicator,section_id,detail,type,freq} = req.body
    try {
        const row = await model.insertindicator(indicator,section_id,detail,type,freq)
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({message: "success"})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.deletesection = async (req,res) => {
    const {id} = req.params
    try {
        const row = await model.deletesection(id)
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({message: "success"})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.deleteindicator = async (req,res) => {
    const {id} = req.params
    try {
        const row = await model.deleteindicator(id)
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({message: "success"})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.deleteuser = async (req,res) => {
    const {id} = req.params
    try {
        const row = await model.deleteuser(id)
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({message: "success"})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.deletetime = async (req,res) => {
    const {id} = req.params
    try {
        const row = await model.deletetime(id)
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({message: "success"})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.deleteusersign = async (req,res) => {
    const {id} = req.params
    try {
        const row = await model.deleteusersign(id)
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({message: "success"})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.deleteboardsign = async (req,res) => {
    const {id} = req.params
    try {
        const row = await model.deleteboardsign(id)
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({message: "success"})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.inserttime = async (req,res) => {
    const {start,expire} = req.body
    try {
        const row = await model.inserttime(start,expire)
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({message: "success"})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.insertusersign = async (req,res) => {
    const {id} = req.body
    try {
        const row = await model.insertusersign(id)
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({message: "success"})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.insertboardsign = async (req,res) => {
    const {id,role} = req.body
    try {
        const row = await model.insertboardsign(id,role)
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({message: "success"})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}

exports.getresult = async (req,res) => {
    try {
        const row = await model.getresult()
        if(!row) return res.status(400).json({error: "failed"})
        res.status(200).json({data: row})
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Database Failed"})
    }
}