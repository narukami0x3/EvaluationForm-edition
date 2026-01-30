const {pool} = require('./conn')

async function getregister() {
    let conn = await pool.getConnection()
    try{
        const [row1] = await conn.query(
            `
            SELECT * FROM department
            `
        )
        const [row2] = await conn.query(
            `
            SELECT * FROM level
            `
        )
        return [row1,row2]
    }finally{conn.release()}
}

async function register(username,email,password,czid,salary,birthday,department,level,position) {
    let conn = await pool.getConnection()
    try{
        const [row1] = await conn.query(
            `
            INSERT INTO users (username,password,czid,salary,birthday,department,level,position,role) VALUES (?,?,?,?,?,?,?,?,?,2)
            `,
            [username,email,password,czid,salary,birthday,department,level,position]
        )
        return row1.insertId
    }finally{conn.release()}
}

async function login(email,login) {
    let conn = await pool.getConnection()
    try{
        const [row1] = await conn.query(
            `
            SELECT * FROM users WHERE email = ? AND password = ?
            `,
            [email,login]
        )
        return row1[0] || null
    }finally{conn.release()}
}

module.exports = {getregister,register,login}