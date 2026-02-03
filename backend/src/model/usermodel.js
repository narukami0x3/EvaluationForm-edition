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

async function insertresult(result) {
    let conn = await pool.getConnection()
    const user_id = result[0].user_id
    const time_id = result[0].time_id
    try{
        let row1
        for (item of result) {
            row1 = await conn.query(
                `INSERT INTO result (section_id,time_id,user_id,selfscore) VALUES (?,?,?,?)`,
            [item.section_id,item.time_id,item.user_id,item.selfscore]
            )
        }
        return row1
    }finally{conn.release()}
}



module.exports = {getform,gettime,insertresult}