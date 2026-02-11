const {pool} = require('./conn')


async function getuser(id,time) {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `
            SELECT 
            us.id,
            u.username
            FROM usersign us
            JOIN users u ON u.id = us.id
             WHERE ? NOT IN (SELECT id FROM boardresult WHERE time_id = ?)`,
            [id,time]
        )
        return row
    } finally{conn.release()}
}

async function getform(id,time) {
    let conn = await pool.getConnection()
    try {
        const [row1] = await conn.query(
            `
            SELECT * FROM section
            `
        )
        const [row2] = await conn.query(
            `SELECT 
            s.section_id,
            s.section,
            i.indicator_id,
            i.indicator,
            i.detail,
            i.type,
            i.freq
            FROM section s
            JOIN indicator i ON i.section_id = s.section_id
            `
        )
        const [row3] = await conn.query(
            `
            SELECT * FROM userresult WHERE id = ? AND time = ?
            `,
            [id,time]
        )
        return [row1,row2]
    } finally{conn.release()}
}

async function insertresult(board_id,indicator_id,score,user_id,time_id) {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `INSERT INTO boardresult (board_id,indicator_id,score,user_id,time_id) VALUES (?,?,?,?,?)`,
            [board_id,indicator_id,score,user_id,time_id]
        )
        return row.insertId || null
    } finally{conn.release()}
}

async function insertattachment(board_id,indicator_id,user_id,time_id,comment,file) {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `INSERT INTO boardattachment (board_id,indicator_id,user_id,time_id,comment,signature) VALUES (?,?,?,?,?,?)`,
            [board_id,indicator_id,user_id,time_id,comment,file]
        )
        return row.insertId || null
    } finally{conn.release()}
}

module.exports = {getform,getuser,insertresult,insertattachment}