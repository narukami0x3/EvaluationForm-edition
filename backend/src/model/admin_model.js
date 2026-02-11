const {pool} = require('./conn')

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
            JOIN indicator i ON i.section_id = s.section_id`
        )
        return [row1,row2]
    } finally{conn.release()}
}

async function getusersign() {
    let conn = await pool.getConnection()
    try {
        const [row1] = await conn.query(
            `
            SELECT * FROM usersign
            `
        )
        return row1
    } finally{conn.release()}
}


async function getboardsign() {
    let conn = await pool.getConnection()
    try {
        const [row1] = await conn.query(
            `
            SELECT * FROM boardsign
            `
        )
        return row1
    } finally{conn.release()}
}

async function insertsection(section,weight) {
    let conn = await pool.getConnection()
    try {
        const [row] = await conn.query(
            `
            INSERT INTO section (section,weight) VALUES (?,?)
            `,
            [section,weight]
        )
        return row
    } finally{conn.release()}
}

async function insertindicator(indicator,section_id,detail,type,freq) {
    let conn = await pool.getConnection()
    try {
        const [row1] = await conn.query(
            `
            INSERT INTO indicator (indicator,section_id,detail,type,freq) VALUES (?,?,?,?,?)
            `,
            [indicator,section_id,detail,type,freq]
        )
        return row1.insertId || null
    } finally{conn.release()}
}

async function deletesection(id) {
    let conn = await pool.getConnection()
    try {
        const [row1] = await conn.query(
            `
            DELETE FROM section WHERE section_id = ?
            `,
            [id]
        )
        return row1.affectedRows || null
    } finally{conn.release()}
}

async function deleteindicator(id) {
    let conn = await pool.getConnection()
    try {
        const [row1] = await conn.query(
            `
            DELETE FROM indicator WHERE indicator_id = ?
            `,
            [id]
        )
        return row1.affectedRows || null
    } finally{conn.release()}
}

async function getuser() {
    let conn = await pool.getConnection()
    try {
        const [row1] = await conn.query(
            `
            SELECT * FROM users
            `
        )
        return row1
    } finally{conn.release()}
}

async function deleteuser(id) {
    let conn = await pool.getConnection()
    try {
        const [row1] = await conn.query(
            `
            DELETE FROM users WHERE id = ?
            `,
            [id]
        )
        return row1.affectedRows || null
    } finally{conn.release()}
}

async function insertusersign(id) {
    let conn = await pool.getConnection()
    try {
        const [row1] = await conn.query(
            `
            INSERT INTO usersign (id) VALUES (?)
            `,
            [id]
        )
        return row1.insertId || null
    } finally{conn.release()}
}

async function deleteusersign(id) {
    let conn = await pool.getConnection()
    try {
        const [row1] = await conn.query(
            `
            DELETE FROM usersign WHERE id = ?
            `,
            [id]
        )
        return row1.affectedRows || null
    } finally{conn.release()}
}

async function deleteboardsign(id) {
    let conn = await pool.getConnection()
    try {
        const [row1] = await conn.query(
            `
            DELETE FROM deleteboardsign WHERE id = ?
            `,
            [id]
        )
        return row1.affectedRows || null
    } finally{conn.release()}
}

async function insertboardsign(id,role) {
    let conn = await pool.getConnection()
    try {
        const [row1] = await conn.query(
            `
            INSERT INTO boardsign (id,role) VALUES (?,?)
            `,
            [id,role]
        )
        return row1.insertId || null
    } finally{conn.release()}
}

async function deletetime(id) {
    let conn = await pool.getConnection()
    try {
        const [row1] = await conn.query(
            `
            DELETE FROM time WHERE time_id = ?
            `,
            [id]
        )
        return row1.affectedRows || null
    } finally{conn.release()}
}

async function gettime() {
    let conn = await pool.getConnection()
    try {
        const [row1] = await conn.query(
            `
            SELECT * FROM time
            `
        )
        return row1
    } finally{conn.release()}
}

async function inserttime(start,expire) {
    let conn = await pool.getConnection()
    const startf = new Date(start).toISOString().replace('T', ' ').substring(0 , 19)
    const expiref = new Date(expire).toISOString().replace('T', ' ').substring(0 , 19)
    try {
        const [row1] = await conn.query(
            `
            INSERT INTO time (start,expire) VALUES (?,?)
            `,
            [startf,expiref]
        )
        return row1.insertId || null
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

module.exports = {getform,insertsection,insertindicator,deletesection,deleteindicator,getuser,deleteuser,insertusersign,insertboardsign,deleteusersign,deleteboardsign,inserttime,gettime,deletetime,getusersign,getboardsign,getresult}