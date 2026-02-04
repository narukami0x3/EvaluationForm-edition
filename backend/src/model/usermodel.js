const { time } = require('./adminmodel')
const {pool} = require('./conn')

async function getform(id,time) {
    let conn = await pool.getConnection()
    try{
        // const [row1] = await conn.query(
        //     `
        //     SELECT 
        //     i.indicator_id,
        //     i.indicator,
        //     s.section_id,
        //     s.section,
        //     s.detail,
        //     s.file,
        //     s.type
        //     FROM indicator i
        //     JOIN section s on s.indicator_id = i.indicator_id
        //     WHERE s.section_id NOT IN (SELECT section_id FROM result WHERE user_id = ? AND time_id = ?)
        //     `,
        //     [id,time]
        // )
        let row1
        [row1] = await conn.query(
            `
            SELECT 
            i.indicator_id,
            s.section_id,
            s.section,
            s.detail,
            s.file,
            s.type
            FROM indicator i
            JOIN section s on s.indicator_id = i.indicator_id
            WHERE s.section_id NOT IN (SELECT section_id FROM result WHERE user_id = ? AND time_id = ?)
            `,
            [id,time]
        )
        const [row2] = await conn.query(
            `
            SELECT 
            i.indicator_id,
            i.indicator
            FROM indicator i
            JOIN section s on s.indicator_id = i.indicator_id
            WHERE s.section_id NOT IN (SELECT section_id FROM result WHERE user_id = ? AND time_id = ?)
            `,
            [id,time]
        )
        return [row1,row2]
    }finally{conn.release()}
}

async function gettime() {
    let conn = await pool.getConnection()
    const time = new Date()
    try{
        const [row1] = await conn.query(
            `
            SELECT * FROM time WHERE ? > start AND ? < expire
            `,
            [time,time]
        )
        return row1
    }finally{conn.release()}
}

async function insertresult(section_id,time_id,user_id,selfscore,filename) {
    let conn = await pool.getConnection()
    try{
        row1 = await conn.query(
            `INSERT INTO result (section_id,time_id,user_id,selfscore,filename) VALUES (?,?,?,?,?)`,
        [section_id,time_id,user_id,selfscore,filename]
        )
        return row1
    }finally{conn.release()}
}

async function insertattachment(time_id,user_id) {
    let conn = await pool.getConnection()
    try{
        row1 = await conn.query(
            `INSERT INTO attachment (time_id,user_id) VALUES (?,?)`,
        [time_id,user_id]
        )
        return row1
    }finally{conn.release()}
}




module.exports = {getform,gettime,insertresult,insertattachment}