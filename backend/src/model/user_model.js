const {pool} = require('./conn')

async function gettime() {
    let conn = await pool.getConnection()
    try {
        const [row1] = await conn.query(
            `
            SELECT * FROM time WHERE NOW() BETWEEN start AND expire
            `
        )
        return row1
    } finally{conn.release()}
}

async function getprofile(id) {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `SELECT * FROM users WHERE id = ?`,
            [id]
        )
        return row
    } finally{conn.release()}
}

async function getprofile() {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `SELECT * FROM time WHERE NOW() BETWEEN start AND expire`
        )
        return row
    } finally{conn.release()}
}

async function editprofile(username,email,password,czid,phone,department,position,level,id) {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `UPDATE users SET username = ?,email = ? ,password = ? ,czid = ? ,phone = ?,department =? ,position = ?,level = ? WHERE id = ?`,
            [username,email,password,czid,phone,department,position,level,id]
        )
        return row.affectedRows || null
    } finally{conn.release()}
}

async function getusersign(id,time) {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `SELECT * FROM usersign WHERE id = ? AND id NOT IN (SELECT id FROM userresult WHERE time_id = ?)`,
            [id,time]
        )
        return row
    } finally{conn.release()}
}

async function getform() {
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
        return [row1,row2]
    } finally{conn.release()}
}

async function insertresult(indicator_id,score,user_id,time_id,file) {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `INSERT INTO userresult (indicator_id,score,id,time_id,file) VALUES (?,?,?,?,?)`,
            [indicator_id,score,user_id,time_id,file]
        )
        return row.insertId || null
    } finally{conn.release()}
}

async function getresult() {
    let conn = await pool.getConnection()
    try {
        const [row1] = await conn.query(
            `
            SELECT
            ur.id,
            u.username,
            SUM(
                CASE
                    WHEN ur.score IN ('1','2','3','4')
                        THEN (ur.score) * s.weight
                    WHEN ur.score = 'yes'
                        THEN 4 * s.weight
                    ELSE 0
                END
            ) AS user_sum
            FROM userresult ur
            JOIN indicator i ON i.indicator_id = ur.indicator_id
            JOIN section s ON s.section_id = i.indicator_id
            JOIN users u ON u.id = ur.id
            WHERE ur.id = ?
            GROUP BY ur.id,u.username,ur.time_id
            `
        )
        const [row2] = await conn.query(
            `
            SELECT
            ur.id,
            u.username,
            SUM(
                CASE
                    WHEN ur.score IN ('1','2','3','4')
                        THEN (ur.score) * s.weight
                    WHEN ur.score = 'yes'
                        THEN 4 * s.weight
                    ELSE 0
                END
            ) AS user_sum
            FROM boardresult ur
            JOIN indicator i ON i.indicator_id = ur.indicator_id
            JOIN section s ON s.section_id = i.indicator_id
            JOIN users u ON u.id = ur.id
            WHERE ur.id = ?
            GROUP BY ur.id,u.username,ur.time_id
            `
        )
        // const [row3] = await conn.query(
        //     `
        //     SELECT
        //     us.id,
        //     u.username,
        //     p.position
        //     FROM usersign us 
        //     JOIN users u ON u.id = us.id
        //     JOIN position p ON p.position_id = u.position
        //     WHERE us.id NOT IN (SELECT id DISTNCT time_id FROM userresult)
        //     `
        // )
        // const [row4] = await conn.query(
        //     `
        //     SELECT
        //     us.id,
        //     u.username,
        //     p.role
        //     FROM boardrole us 
        //     JOIN users u ON u.id = us.id
        //     JOIN boardrole p ON p.role_id = us.role
        //     WHERE us.id NOT IN (SELECT board_id DISTNCT time_id FROM boardresult)
        //     `
        // )
        return [row1,row2]
    } finally{conn.release()}
}

module.exports = {getprofile,editprofile,getform,getusersign,insertresult,getresult,gettime}