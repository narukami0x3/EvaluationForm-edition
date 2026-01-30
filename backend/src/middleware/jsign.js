const jwt = require('jsonwebtoken')
require('dotenv').config()


exports.sign = async function (id,username,role) {
    const token = await jwt.sign(
        {id: id, username: username, role: role},
        process.env.JWT_SECRET,
        {expiresIn: "2h"}
    )
    return token
}

