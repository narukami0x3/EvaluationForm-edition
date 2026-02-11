const jwt = require('jsonwebtoken')
require('dotenv').config()

async function sign(id,username,role) {
    try {
        const token = await jwt.sign(
            {id:id,username: username,role:role},
            process.env.JWT_SECRET,
            {expiresIn: '6h'}
        )
        return token
    } catch (e) {
        console.log(e)
    }
}

async function admin(req,res,next) {
    try {
        const token = req.headers.token
        if(!token) res.status(401).json({error: "no token providerd"})
        const decoded = await jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.role != 1) res.status(403).json({error: "access denied"})
            next()
    } catch (e) {
        res.status(401).json({error: "invalid or expired token"})
    }
}

async function user(req,res,next) {
    try {
        const token = req.headers.token
        if(!token) res.status(401).json({error: "no token providerd"})
        const decoded = await jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.role != 2) res.status(403).json({error: "access denied"})
            next()
    } catch (e) {
        res.status(401).json({error: "invalid or expired token"})
    }
}

module.exports = {sign,admin,user}