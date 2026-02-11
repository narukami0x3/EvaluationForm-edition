const {pool} = require('./conn')

async function register(username,email,password,czid,phone,department,position,level) {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `INSERT INTO users (username,email,password,czid,phone,department,position,level) VALUES (?,?,?,?,?,?,?,?)`,
            [username,email,password,czid,phone,department,position,level]
        )
        return row.insertId || null
    } finally{conn.release()}
}


async function login(email,password) {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `SELECT * FROM users WHERE email = ? AND password = ?`,
            [email,password]
        )
        return row[0] || null
    } finally{conn.release()}
}

module.exports = {register,login}